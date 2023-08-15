<script setup>
import TeamMember from './TeamMember.vue'
defineProps({
  team: Object
})
</script>

<template>
  <table class="table-fixed border-spacing-2 border-separate">
    <thead>
      <th class="text-left px-6 py-2">Name</th>
      <th class="text-left px-6 py-2">Email</th>
      <th class="text-left px-6 py-2">Status</th>
      <th class="text-left px-6 py-2">Actions</th>
    </thead>

    <tbody>
      <TeamMember
        v-for="(member, i) in team.members"
        :key="i"
        :idx="i"
        :name="member.name"
        :email="member.email"
        :status="member.status"
      />
    </tbody>
  </table>
</template>
