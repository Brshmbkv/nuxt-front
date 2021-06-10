<template>
  <div>
    <Breadcrumbs />
    <h1 class="text-2xl font-semibold mt-2">{{ data.exercise.name }}</h1>
    <div class="overflow-x-auto shadow-md mt-2">
      <table>
        <thead class="bg-gray-300">
          <tr>
            <th>Full name</th>
            <th>Submit time</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(result, index) in data.exercise_results"
            :key="index"
            @click="toggleModal(result.id)"
            class="cursor-pointer transition hover:bg-gray-200"
          >
            <td>{{ result.user.full_name }}</td>
            <td>{{ result.submited_at }}</td>
            <td>{{ result.score }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form @submit.prevent="handleSubmit(saveResult(exercise.id)); modalStatus = false ">
        <Modal
          :showModal="modalStatus"
          @toggleModal="changeModalStatus"
        >
          <template v-slot:heading>
            <h2 class="text-lg font-semibold">{{exercise.user.full_name}}</h2>
          </template>
          <template v-slot:content>
            <div class="space-y-3">
              <p class="text-gray-500">
                {{exercise.exercise.content}}
              </p>
              <div v-if="exercise.value" class="flex border rounded-md p-4">
                {{ exercise.value }}
              </div>
              <div
                v-else
                class="flex justify-center items-center border rounded-md h-56"
              >
                <span>There is no user's text answer</span>
              </div>
              <div class="flex flex-col md:flex-row space-y-2 md:space-y-0">
                <div class="md:w-1/2">
                  <div
                    v-for="(file, index) in exercise.attachments"
                    :key="index"
                    @click="download(file)"
                    class="flex items-center space-x-2"
                  >
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
                        stroke-width="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>{{ file.name }}</span>
                  </div>
                </div>
                <div class="md:w-1/2">
                  <ValidationProvider
                    name="Grade"
                    tag="div"
                    rules="required|min_value:0|max_value:100"
                    v-slot="{ errors }"
                    class="flex flex-col"
                  >
                    <label>
                      <span>Grade: </span>
                      <input
                        ref="score"
                        class="p-1 rounded-sm"
                        type="number"
                        step="0.1"
                        :class="{ 'border-red-600 ring ring-red-200': errors.length > 0 }"
                        v-model="exercise.score"
                      />
                    </label>
                    <span v-show="errors.length > 0" class="text-red-600">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <textarea ref="textarea" class="min-w-full rounded-md" placeholder="Add comments"></textarea>
              <button @click.prevent="addCommentary(exercise.id)" class="btn-primary">Save comment</button>
              <p>Your comment for this exercise: <span class="font-semibold">{{exercise.comment}}</span></p>
            </div>
          </template>
          <template v-slot:buttons="scope">
            <button class="btn-success disabled:opacity-50" :disabled="invalid">Save</button>
            <button class="btn-danger" @click.prevent="scope.close">
              Close
            </button>
          </template>
        </Modal>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Modal from "@/components/UI/Modal";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
export default {
  components: {
    Modal,
    Breadcrumbs,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      data: [],
      exercise: {},
      modalStatus: false
    };
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(
      `/teacher/schedules/${params.schedule}/exercises/${params.id}`
    );
    return { data: res };
  },
  methods: {
    async loadExerciseData(id) {
      this.exercise = await this.$nuxt.$axios.$get(
        `/teacher/results/${id}/edit`
      );
    },
    async toggleModal(id) {
      this.$nuxt.$loading.start();
      await this.loadExerciseData(id);
      this.$nuxt.$loading.finish();
      this.modalStatus = !this.modalStatus;
    },
    changeModalStatus(e) {
      this.modalStatus = e;
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
      formData.append("schedule_id", this.$route.params.schedule);
      await this.$nuxt.$axios.$post("teacher/results", formData);
      this.$nuxt.refresh();
    },
    async addCommentary(id){
      let formData = new FormData();
      formData.append("id", id);
      formData.append("score", this.$refs.score.value);
      formData.append('comment', this.$refs.textarea.value)
      formData.append("schedule_id", this.$route.params.schedule);
      await this.$nuxt.$axios.$post("teacher/results", formData);
      await this.loadExerciseData(id);
    }
  }
};
</script>
