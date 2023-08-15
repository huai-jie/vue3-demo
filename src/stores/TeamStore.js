import { defineStore } from "pinia";
import { useFlash } from "../composables/useFlash";

const { flash } = useFlash();

export const useTeamStore = defineStore("team", {
  //data
  state: () => ({
    team: {
      members: [],
      slots: 0,
      name: "",
    },
    showTeamModal: false,
  }),

  // computed
  getters: {
    slotsRemaining: (state) => state.team.slots - state.team.members.length,
  },

  //methods
  actions: {
    async fill() {
      const res = await import("../team.json");
      this.team = res.default;
    },
    async getTeamMembers() {
      if (!this.team.members.length) await this.fill();
      return this.team.members;
    },
    addTeamMember(member) {
      if (this.team.members.length < this.team.slots) {
        this.team.members.push({
          status: "active",
          id: crypto.randomUUID(),
          ...member,
        });
        flash("Add Member Succesfully!");
      } else {
        alert("Your member slot is full!");
      }
    },
    openTeamModal() {
      this.showTeamModal = true;
    },
    closeTeamModal() {
      this.showTeamModal = false;
    },
    editTeamMember(idx, member) {
      this.team.members[idx] = { ...member };
      this.team.members = [...this.team.members];
      flash("Edit Member Succesfully!");
    },
    deleteTeamMember(idx) {
      this.team.members = [...this.team.members.filter((e, i) => i !== idx)];
      flash("Delete Member Succesfully!");
    },
  },
});
