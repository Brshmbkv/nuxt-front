<template>
  <div class="space-y-2">
    <p>Breadcrumbs</p>
    <h1 class="text-2xl font-semibold">{{ data.chapter.name }}</h1>
    <div class="space-y-4">
      <div class="space-x-4">
        <a
          class="font-medium border px-4 py-0.5 rounded-md cursor-pointer"
          @click="toggleTabs('attendance')"
          >Attendance</a
        >
        <a
          class="font-medium border px-4 py-0.5 rounded-md cursor-pointer"
          @click="
            getPracticeData($route.params.id);
            toggleTabs('practice');
          "
        >
          Practice
        </a>
      </div>
      <div class="overflow-x-auto shadow-md">
        <table class="min-w-full divide-y" v-if="currentTab === 'attendance'">
          <thead class="text-left bg-gray-300">
            <tr>
              <th class="px-6 py-3 font-semibold">Full name</th>
              <th class="px-6 py-3 font-semibold">Email</th>
              <th class="px-6 py-3 font-semibold">Score</th>
              <th class="px-6 py-3 font-semibold">Check</th>
              <th class="px-6 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="attendance in data.attendances" :key="attendance.id">
              <td class="px-6 py-3">
                {{
                  attendance.user.first_name + " " + attendance.user.last_name
                }}
              </td>
              <td class="px-6 py-3">{{ attendance.user.email }}</td>
              <td class="px-6 py-3">{{ attendance.score }}%</td>
              <td class="px-6 py-3">
                <input
                  type="checkbox"
                  class="focus:outline-none"
                  :checked="attendance.value"
                  @change="
                    changeAttendance(attendance.id, $event.target.checked)
                  "
                />
              </td>
              <td class="px-6 py-3">
                <button @click="goToUserResults(attendance.user.id)" class="btn-primary">
                  Answers
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="min-w-full divide-y" v-if="currentTab === 'practice'">
          <thead class="text-left bg-gray-300">
            <tr>
              <th class="px-6 py-3 font-semibold">Id</th>
              <th class="px-6 py-3 font-semibold">Name</th>
              <th class="px-6 py-3 font-semibold">Passed Count</th>
              <th class="px-6 py-3 font-semibold">Unchecked works</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="exercise in practice.exercises"
              :key="exercise.id"
              class="cursor-pointer hover:bg-gray-200"
              @click="goToExercisesById($route.params.id, exercise.id)"
            >
              <td class="px-6 py-3">{{ exercise.id }}</td>
              <td class="px-6 py-3">{{ exercise.name }}</td>
              <td class="px-6 py-3">
                {{
                  "results_count" in exercise ? exercise.results_count : 0
                }}/{{ practice.students_count }}
              </td>
              <td class="px-6 py-3">
                {{ "not_checked" in exercise ? exercise.not_checked : 0 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
      `/teacher/schedules/${params.schedule}/attendances`
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
      this.$router.push({
        name: "teacher-groups-id-schedules-course-schedule-users-user-results",
        params: { user: userId }
      });
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
