<template>
  <div>
    <Breadcrumbs class="mb-2" />
    <div class="flex items-center justify-between mb-4">
      <p class="text-xl font-semibold">{{ results.user.full_name }}</p>
      <div>
        <p class="text-lg font-medium">{{ results.schedule.chapter.name }}</p>
        <div class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm">{{ results.schedule.starts_at }}</p>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto shadow-md">
      <table>
        <thead class="bg-gray-300">
          <tr>
            <td>Exercise</td>
            <td>Submitted</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="exercise in results.exercise_results"
            :key="exercise.id"
            @click="toggleModal"
            class="hover:bg-gray-200 cursor-pointer"
          >
            <td>{{ exercise.exercise.name }}</td>
            <td>{{ exercise.updated_at }}</td>
            <td>{{ exercise.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal :showModal="modalStatus" @toggleModal="changeModalStatus"> </Modal>
  </div>
</template>

<script>
import Modal from "@/components/UI/Modal";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
export default {
  components: {
    Modal,
    Breadcrumbs
  },
  data() {
    return {
      results: [],
      exercise: {},
      modalStatus: false
    };
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(
      `/teacher/schedules/${params.schedule}/users/${params.id}/results`
    );
    return {
      results: res
    };
  },
  methods: {
    toggleModal() {
      this.modalStatus = !this.modalStatus;
    },
    changeModalStatus(e){
      this.modalStatus = e
    },
    async download(file) {
      await this.$nuxt
        .$axios({
          url: `/download/${file.id}`,
          method: "GET",
          responseType: "blob"
        })
        .then(response => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", file.name);
          fileLink.click();
        });
    },
    async saveResult(id) {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("score", this.$refs.score.value);
      formData.append("schedule_id", this.$route.params.id);
      await this.$nuxt.$axios.$post("teacher/results", formData);
      this.$nuxt.refresh();
    }
  }
};
</script>
