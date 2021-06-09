<template>
  <div>
    <p>Breadcrumbs</p>
    <div class="flex justify-between">
      <p>{{ results.user.full_name }}</p>
      <div>
        <p>{{ results.schedule.chapter.name }}</p>
        <p>{{ results.schedule.starts_at }}</p>
      </div>
    </div>
    <table>
      <thead>
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
          @click="showModal(exercise.id)"
        >
          <td>{{ exercise.exercise.name }}</td>
          <td>{{ exercise.updated_at }}</td>
          <td>{{ exercise.score }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="isModalHidden">
      <div
        class="fixed inset-0 overflow-x-hidden overflow-y-auto z-50 flex justify-between items-center"
      >
        <div
          class="flex flex-col mx-auto space-y-4 max-w-2xl px-10 py-4 bg-white"
        >
          <p class="text-2xl">{{ exercise.exercise.name }}</p>
          <p class="px-4 py-2">{{ exercise.exercise.content }}</p>
          <hr />
          <p
            class="px-4 py-2 border"
            :class="{
              'h-40 flex justify-center items-center': !exercise.value
            }"
          >
            {{
              !exercise.value
                ? "There is no user's text answer!"
                : exercise.value
            }}
          </p>
          <div class="flex justify-between mx-8">
            <div class="flex flex-col divide-y">
              <a
                v-for="file in exercise.attachments"
                :key="file.id"
                @click="download(file)"
                class="cursor-pointer"
              >
                {{ file.name }}
              </a>
            </div>
            <div class="flex items-center">
              <input
                class="border-l-0 border-r-0 border-t-0 text-2xl px-0 py-0"
                type="number"
                min="0"
                max="100"
                :value="exercise.score"
                ref="score"
              />
            </div>
          </div>
          <div class="flex justify-end space-x-4 text-lg">
            <button class="px-6 py-2 border font-medium bg-blue-600" @click="saveResult(exercise.id)">Save</button>
            <button class="px-6 py-2 border font-medium bg-red-600" @click="hideModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isModalHidden"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: [],
      exercise: {},
      isModalHidden: false
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
    async showModal(id) {
      this.isModalHidden = true;
      this.results.exercise_results.forEach(i => {
        if (i.id === id) {
          this.exercise = i;
        }
      });
    },
    hideModal() {
      this.isModalHidden = false;
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
    async saveResult(id){
      let formData = new FormData()
      formData.append('id', id)
      formData.append('score', this.$refs.score.value)
      formData.append('schedule_id', this.$route.params.id)
      await this.$nuxt.$axios.$post('teacher/results', formData)
      this.$nuxt.refresh();
    }
  }
};
</script>
