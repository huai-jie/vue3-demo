import { defineStore } from "pinia";
import { useFlash } from "../composables/useFlash";

const { flash } = useFlash();

export const useTaskStore = defineStore("task", {
  //data
  state: () => ({
    taskList: [],
  }),

  // computed
  getters: {},

  //methods
  actions: {
    addTask(task) {
      this.taskList.push(task);
      flash("Add Task Successfully!");
    },
    removeTask(idx) {
      this.taskList = [...this.taskList.filter((e, i) => i !== idx)];
      flash("Delete Task Successfully!");
    },
    setTaskAssignee(idx, assignee) {
      this.taskList[idx].assignee = assignee;
      this.taskList = [...this.taskList];
      flash("Assignn Member Successfully");
    },
    removeTaskAssignee(assignee) {
      if (this.taskList.length) {
        this.taskList = [...this.taskList.map((
          task,
        ) => (task.assignee === assignee
          ? { ...task, assignee: undefined }
          : task)
        )];
      }
    },
  },
});
