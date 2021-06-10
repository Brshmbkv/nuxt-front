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
            class="cursor-pointer hover:bg-gray-200"
          >
            <td>{{ result.user.full_name }}</td>
            <td>{{ result.updated_at }}</td>
            <td>{{ result.score }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal :showModal="modalStatus" @toggleModal="changeModalStatus">
      <template v-slot:heading>
        <h2 class="text-lg font-semibold">Username goes here</h2>
      </template>
      <template v-slot:content>
        <div class="space-y-3">
          <p class="text-gray-500">
            Exercise description Exercise descriptionExercise
            descriptionExercise descriptionExercise descriptionExercise
            descriptionExercise descriptionExercise descriptionExercise
            descriptionExercise descriptionExercise description Exercise
            description Exercise descriptionExercise descriptionExercise
            descriptionExercise descriptionExercise descriptionExercise
            descriptionExercise descriptionExercise descriptionExercise
            descriptionExercise description
          </p>
          <div class="flex justify-center border rounded-md">
            Exercise value
            {{ exercise.value }}
          </div>
          <div>
            files here
          </div>
        </div>
      </template>
      <template v-slot:buttons="scope">
        <button class="btn-success" @click.prevent="scope.close()">Save</button>
        <button class="btn-danger" @click.prevent="scope.close">Close</button>
      </template>
    </Modal>
    <pre>{{ data }}</pre>
    <pre>{{ exercise }}</pre>
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
      data: [],
      exercise: {},
      modalStatus: true
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
    }
  }
};
</script>
