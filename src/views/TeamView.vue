<script setup>
import TeamHeader from '../components/Teams/TeamHeader.vue'
import TeamMembers from '../components/Teams/TeamMembers.vue'
import TeamFooter from '../components/Teams/TeamFooter.vue'
import DeleteModal from '../components/DeleteModal.vue'
import BaseModal from '../components/BaseModal.vue'
import { useTeamStore } from '../stores/TeamStore'
import { useTaskStore } from '../stores/TaskStore'
import { ref, computed, provide } from 'vue'

const t = useTeamStore()
const taskStore = useTaskStore();

t.fill()

const team = computed(() => t.team)
const showModal = computed(() => t.showTeamModal)

// const showModal = ref(false);
const idx = ref(undefined)
const member = ref({ name: undefined, email: undefined })
const editing = ref(false)
const showDeleteModal = ref(false)

function saveMember() {
  if (!editing.value) {
    t.addTeamMember(member.value)
    // showModal.value = false;
    t.closeTeamModal()
    member.value = ref({ name: undefined, email: undefined })
  }
}

function addMember() {
  member.value = ref({ name: undefined, email: undefined })
  // showModal.value = true;
  t.openTeamModal()
}

function closeModal() {
  editing.value = false
  t.closeTeamModal()
}

function editTeamMember(i) {
  idx.value = i
  editing.value = true
  member.value = { ...t.team.members.find((e, index) => index === i) }
  t.openTeamModal()
}

function saveEditMember() {
  t.editTeamMember(idx.value, member.value)
  closeModal()
}

function deleteTeamMember(i) {
  idx.value = i
  showDeleteModal.value = true
}

function confirmDeleteMember() {
  const assignee = t.team.members[idx.value].email;
  t.deleteTeamMember(idx.value)
  taskStore.removeTaskAssignee(assignee);
  showDeleteModal.value = false
}

provide('editTeamMember', editTeamMember)
provide('deleteTeamMember', deleteTeamMember)
</script>

<template>
  <div class="w-100">
    <TeamHeader :team="team" @add="() => addMember()" />

    <div class="place-self-center flex flex-col gap-y-3" style="width: 725px">
      <TeamMembers :team="team" />
    </div>

    <TeamFooter :team="team" />
  </div>

  <BaseModal id="team-member-form-modal" :show="showModal" @close="() => closeModal()"
    @submit="() => (!editing ? saveMember() : saveEditMember())">
    <template #default>
      <p>{{ editing ? 'Edit this team member' : 'Need to add a new member to your team?' }}</p>

      <div class="mt-6">
        <div class="flex flex-col gap-2">
          <input type="name" v-model="member.name" placeholder="First Name" required class="flex-1 border-1 p-2" />
          <input type="email" v-model="member.email" placeholder="Email Address" required class="flex-1 border-1 p-2" />
        </div>
      </div>
    </template>
  </BaseModal>

  <DeleteModal :showDeleteModal="showDeleteModal" @close="showDeleteModal = false"
    @delete="() => confirmDeleteMember()" />
</template>
