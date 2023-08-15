<script setup>
import BaseModal from '../components/BaseModal.vue'
defineProps({
  id: {
    type: String,
    default: 'delete-modal'
  },
  showDeleteModal: {
    type: Boolean,
    default: false
  }
})
defineEmits(['delete', 'close'])
</script>

<template>
  <BaseModal :id="id" :show="showDeleteModal" @close="$emit('close')" @submit="$emit('delete')">
    <template #default>
      <p>Delete this item</p>

      <div class="mt-6">
        <div class="flex flex-col gap-2">
          <p>Please type "DELETE" to continue</p>
          <input pattern="DELETE" placeholder="DELETE" required class="flex-1 border-1 p-2" />
        </div>
      </div>
    </template>
    <template #submit>
      <button
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        type="submit"
      >
        DELETE
      </button>
    </template>
  </BaseModal>
</template>
