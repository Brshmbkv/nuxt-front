<template>
  <div>
    <p>Breadcrumbs</p>
    <h1 class="text-3xl mt-2 mb-4">{{ course.name }}</h1>
    <p class="text-lg text-gray-500">{{ course.description }}</p>
    <div class="flex flex-col my-2 overflow-x-auto">
      <div class="overflow-hidden border-b border-gray-200">
        <table class="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                #
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Start time
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Chapter name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="schedule in schedules"
              :key="schedule.id"
              @click="goToSchedule(schedule.id)"
              style="cursor: pointer;"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ schedule.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ schedule.starts_at }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ schedule.chapter.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  {{ schedule.attendance.status.text }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="text-sm text-gray-900">
                  {{ schedule.attendance.score }}%
                </div>
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
      course: {},
      schedules: []
    };
  },
  async asyncData({ $axios, params, error }) {
    try {
      const { course, schedules } = await $axios.$get(`/courses/${params.id}`);
      return {
        course,
        schedules
      };
    } catch (e) {
      error({ message: e.response.statusText, statusCode: e.response.status });
    }
  },
  methods: {
    goToSchedule(id) {
      this.$router.push({ name: "student-schedule-id", params: { id } });
    }
  }
};
</script>
