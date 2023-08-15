<script setup>
import TaskItem from './TaskItem.vue'
import TaskTags from './TaskTags.vue'
import BasePanel from '../BasePanel.vue'
import { ref, computed } from 'vue'

const props = defineProps({
  tasks: Array,
  title: String,
  canToggle: { type: Boolean, default: false }
})

const currentTag = ref('all')

const filteredTasks = computed(() => {
  return props.tasks.filter((task) => task.tag === currentTag.value)
})
</script>
<template>
  <BasePanel v-show="tasks.length" class="w-60">
    <div class="flex justify-between items-start">
      <h2 class="font-bold mb-2">
        {{ title }}
        <span>({{ tasks.length }})</span>
      </h2>

      <button v-show="canToggle" @click="$emit('toggle')">&times;</button>
    </div>

    <assignment-tags
      v-model:currentTag="currentTag"
      :initial-tags="tasks.map((a) => a.tag)"
    ></assignment-tags>
    <ul class="border border-gray-600 divide-y divide-gray-600 mt-6">
      <assignment v-for="task in filteredTasks" :key="task.id" :task="task"> </assignment>
    </ul>

    <slot></slot>
  </BasePanel>
</template>
