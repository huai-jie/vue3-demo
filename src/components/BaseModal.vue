<script setup>
defineProps({
  show: Boolean
})
defineEmits(['submit', 'close'])
</script>

<template>
  <div v-if="show" class="modal-mask">
    <form class="modal-container" @submit.prevent="$emit('submit')">
      <div>
        <slot>default body</slot>
      </div>

      <footer class="modal-footer flex gap-x-1">
        <slot name="submit">
          <button
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            type="submit"
          >
            Save
          </button>
        </slot>
        <slot name="footer">
          <button class="close-modal-btn" @click="$emit('close')">Close</button>
        </slot>
      </footer>
    </form>
  </div>
</template>

<style>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
}

.modal-container {
  background: white;
  padding: 1rem;
  width: 80vw;
  max-width: 500px;
  border-radius: 7px;
}

.modal-footer {
  border-top: 1px solid #ddd;
  margin-top: 1rem;
  padding-top: 0.5rem;
  font-size: 0.8rem;
}

.modal-footer .close-modal-btn {
  background: #ddd;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
}

.modal-footer .close-modal-btn:hover {
  background: #c8c8c8;
}
</style>
