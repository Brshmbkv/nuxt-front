<template>
  <div>
    <p>All Groups / Group 1 / Schedules / Chapter 1</p>
    <div class="flex justify-between">
      <div>
        <button @click="toggleTabs('attendance')">Attendance</button>
        <button
          @click="
            getPracticeData($route.params.id);
            toggleTabs('practice');
          "
        >
          Practice
        </button>
      </div>
      <p>{{ data.chapter.name }}</p>
    </div>
    <table v-if="currentTab === 'attendance'">
      <thead>
        <tr>
          <td>Full name</td>
          <td>Email</td>
          <td>Score</td>
          <td>Check</td>
          <td>Answers</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendance in data.attendances" :key="attendance.id">
          <td>
            {{ attendance.user.first_name + " " + attendance.user.last_name }}
          </td>
          <td>{{ attendance.user.email }}</td>
          <td>{{ attendance.score }}</td>
          <td>
            <input
              type="checkbox"
              :checked="attendance.value"
              @change="changeAttendance(attendance.id, $event.target.checked)"
            />
          </td>
          <td>
            <button
              @click="goToUserResults(attendance.user.id)"
            >
              Answers
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-if="currentTab === 'practice'">
      <thead>
        <tr>
          <td>Id</td>
          <td>Passed Count</td>
          <td>Unchecked works</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="exercise in practice.exercises"
          :key="exercise.id"
          class="cursor-pointer"
          @click="goToExercisesById($route.params.id, exercise.id)"
        >
          <td>{{ exercise.id }}</td>
          <td>
            {{ "results_count" in exercise ? exercise.results_count : 0 }}/{{
              practice.students_count
            }}
          </td>
          <td>{{ "not_checked" in exercise ? exercise.not_checked : 0 }}</td>
        </tr>
      </tbody>
    </table>
    <pre>{{data}}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
      practice: [],
      toggle: true,
      currentTab: "attendance"
    };
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(
      `/teacher/schedules/${params.id}/attendances`
    );
    return {
      data: res
    };
  },
  methods: {
    toggleTabs(name) {
      this.currentTab = name;
    },
    changeAttendance(id, value) {
      this.$nuxt.$axios.$post("/teacher/changeAttendance", {
        id,
        value
      });
    },
    async getPracticeData(id) {
      this.practice = await this.$nuxt.$axios.$get(
        `/teacher/schedules/${id}/exercises`
      );
    },
    async goToUserResults(userId) {
      this.$router.push({name: 'teacher-schedules-id-users-user-results', params: {user: userId}})
    },
    async goToExercisesById(scheduleId, exerciseId) {
      const res = await this.$nuxt.$axios.$get(
        `/teacher/schedules/${scheduleId}/exercises/${exerciseId}`
      );
      console.log(res);
    }
  }
};
</script>
