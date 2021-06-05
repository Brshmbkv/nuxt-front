<template>
  <div class="space-y-2">
    <p>Breadcrums</p>
    <h1 class="text-2xl font-semibold">Schedule page</h1>
    <div class="overflow-x-auto shadow-md">
      <table class="min-w-full divide-y">
        <thead class="text-left bg-gray-300">
          <tr>
            <th class="px-6 py-3 font-semibold">Id</th>
            <th class="px-6 py-3 font-semibold">Time</th>
            <th class="px-6 py-3 font-semibold">Chapter name</th>
            <th class="px-6 py-3 font-semibold">Attendance</th>
            <th class="px-6 py-3 font-semibold">General performance</th>
            <th class="px-6 py-3 font-semibold">Unchecked works</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr
            v-for="(item, index) in data.schedules"
            :key="item.id"
            @click="goToSchedule(item.id)"
            class="cursor-pointer hover:bg-gray-200"
          >
            <td class="px-6 py-3">{{ index + 1 }}</td>
            <td class="px-6 py-3">{{ item.starts_at }}</td>
            <td class="px-6 py-3">{{ item.title }}</td>
            <td class="px-6 py-3">
              {{ item.attended }}/{{ data.students_count }}
            </td>
            <td class="px-6 py-3">{{ item.average_score }}</td>
            <td class="px-6 py-3">{{ item.not_checked }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: ""
    };
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(
      `/teacher/groups/${params.id}/courses/${params.course}/schedules`
    );
    return {
      data: res
    };
  },
  methods: {
    goToSchedule(id) {
      this.$router.push({ name: "teacher-groups-id-schedules-course-schedule", params: { schedule: id } });
    }
  }
};
</script>
