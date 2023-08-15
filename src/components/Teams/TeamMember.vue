<script setup>
import { inject, computed } from 'vue'
// import { useTaskStore } from '.../stores/TaskStore'
// import { useTaskStore } from '@stores/TaskStore'
import { useTaskStore } from '../../stores/TaskStore';

const props = defineProps({
  idx: Number,
  name: String,
  email: String,
  status: String
})

const t = useTaskStore();
const count = computed(() => t.taskList ? t.taskList?.filter(e => e.assignee === props.email)?.length : 0)
const editTeamMember = inject('editTeamMember')
const deleteTeamMember = inject('deleteTeamMember')
</script>

<template>
  <tr class="bg-gray-100 px-12">
    <td class="text-xl font-medium flex items-center gap-x-4 px-6 py-4">
      <img :src="`https://i.pravatar.cc/50?u=${email}`" alt="" class="rounded-xl" />
      {{ name }}
    </td>

    <td class="text-gray-500 px-6 py-4">{{ email }}</td>

    <td class="px-6 py-4">
      <span class="text-green-400 capitalize">{{ count }} task(s)</span>
    </td>
    <td class="px-2 text-center">
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400 mr-2"
        @click="() => editTeamMember(idx)">
        Edit
      </button>
      <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        @click="() => deleteTeamMember(idx)">
        Delete
      </button>
    </td>
  </tr>
</template>
