<script setup>
import DeleteModal from '../components/DeleteModal.vue'
import BaseModal from '../components/BaseModal.vue'
import { useTeamStore } from '../stores/TeamStore'
import { useTaskStore } from '../stores/TaskStore'
import { useFlash } from '../composables/useFlash'
import { ref } from 'vue'

const { flash } = useFlash()
const teamStore = useTeamStore()
const taskStore = useTaskStore()

const members = ref([])
teamStore
  .getTeamMembers()
  .then()
  .then((res) => (members.value = [...res]))

const selectedMember = ref(undefined)
const showDeleteModal = ref(false)
const showMemberModal = ref(false)
const idx = ref(undefined)
const task = ref({ name: undefined, completed: false, assignee: undefined })

function addTask() {
  if (task.value.name) {
    taskStore.addTask(task.value)
    task.value = { name: undefined, completed: false, assignee: undefined }
  }
}

function removeTask(i) {
  idx.value = i
  showDeleteModal.value = true
}

function confirmDeleteTask() {
  taskStore.removeTask(idx.value)
  showDeleteModal.value = false
  flash('Delete Task Successfully!')
}

function openMemberModal(i) {
  idx.value = i;
  selectedMember.value = taskStore.taskList[i].assignee;
  showMemberModal.value = true;
}

function selectAsignee() {
  taskStore.setTaskAssignee(idx.value, selectedMember.value);
  showMemberModal.value = false;
}

</script>

<template>
  <div class="w-100">
    <div>
      <form @submit.prevent="addTask" class="flex gap-4 p-2">
        <input class="border-2 border-sky-500 rounded p-2" required v-model="task.name" />
        <button class="bg-blue-500 hover:bg-blue-400 rounded p-2 text-white" type="submit">
          Add
        </button>
      </form>
    </div>
    <div>
      <ul v-for="(task, i) in taskStore.taskList" :key="i">
        <li class="p-2 flex justify-between">
          <input type="checkbox" v-model="task.completed" />
          <span class="">
            {{ task.name }}
          </span>
          <button @click="() => removeTask(i)">
            <span class="text-xs hover:bg-gray-200 rounded p-1"> ❌ </span>
          </button>
          <button class="rounded-full bg-gray-300 hover:bg-gray-200 pb-1 px-2 hover:text-white bg-contain bg-no-repeat"
            :style="task.assignee ? { 'background-image': 'url(' + `https://i.pravatar.cc/50?u=${task.assignee}` + ')' } : ''"
            @click="() => openMemberModal(i)">
            <span> + </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
  <BaseModal id="select-member-modal" :show="showMemberModal" @close="() => (showMemberModal = fasle)"
    @submit="() => selectAsignee()">
    <template #default>
      <p>Select assignee for this task?</p>

      <div class="mt-6">
        <div class="flex flex-col gap-2">
          <ul v-for="({ name, email }, i) in members" :key="i">
            <li class="p-2 flex flex-row gap-4 bg-gray-300 rounded  hover:bg-gray-200">
              <input type="radio" :value="email" :id="email" v-model="selectedMember" />
              <label :for="email" class="hover:cursor-pointer">
                <div class="flex">
                  <div class="flex-none pr-8">
                    <div class="flex items-center justify-center">
                      <img :src="`https://i.pravatar.cc/50?u=${email}`" alt="" class="rounded-full" />
                    </div>
                  </div>
                  <div class="flex-auto pr-8">
                    <div class="items-center justify-center">
                      {{ name }}
                    </div>
                  </div>
                  <div class="flex-auto pl-8 justify-end">
                    <div class="items-center justify-center">
                      {{ email }}
                    </div>
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </BaseModal>
  <DeleteModal :showDeleteModal="showDeleteModal" @close="showDeleteModal = false" @delete="() => confirmDeleteTask()" />
</template>
