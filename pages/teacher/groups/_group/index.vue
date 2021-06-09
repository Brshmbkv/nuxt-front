<template>
  <div class="space-y-2">
    <p>Breadcrums</p>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">{{ group.name }}</h1>
      <a @click="openSchedule(course.id)" class="btn-primary-outline"
        >Schedule</a
      >
    </div>
    <div class="mx-4 space-y-2">
      <div class="flex gap-x-2">
        <a
          @click.prevent="changeCourse(course.id)"
          class="font-medium px-4 cursor-pointer border rounded-md transition hover:bg-gray-200"
          v-for="(course, index) in group.courses"
          :key="index"
          >{{ course.name }}</a
        >
      </div>
      <p class="text-gray-500">{{ course.description }}</p>
      <div class="overflow-x-auto shadow-md">
        <table class="min-w-full divide-y">
          <thead class="text-left bg-gray-300">
            <tr>
              <th class="px-6 py-3 font-semibold">Full name</th>
              <th class="px-6 py-3 font-semibold">Attendance</th>
              <th class="px-6 py-3 font-semibold">Score</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="data in tableData" :key="data.id">
              <td class="px-6 py-3">{{ data.first_name + " " + data.last_name }}</td>
              <td class="px-6 py-3">{{ data.passed_count }}/{{ data.attendances_count }}</td>
              <td class="px-6 py-3">
                {{
                  data.pivot.score === 0
                    ? data.pivot.score
                    : data.pivot.score.toFixed(1)
                }}%
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
      group: [],
      course: {},
      tableData: ""
    };
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(`/teacher/groups/${params.group}`);
    return {
      group: res,
      course: res.courses[0],
      tableData: await $axios.$get(
        `/teacher/groups/${params.group}/courses/${res.courses[0].id}/students`
      )
    };
  },
  methods: {
    async changeCourse(id) {
      const res = await this.$nuxt.$axios.$get(
        `/teacher/groups/${this.$route.params.group}/courses/${id}/students`
      );
      this.group.courses.forEach(course => {
        if (course.id === id) {
          this.course = course;
        }
      });
      this.tableData = res;
    },
    openSchedule(courseId) {
      this.$router.push({
        name: "teacher-groups-group-courses-course",
        params: {
          course: courseId
        }
      });
    }
  }
};
</script>
