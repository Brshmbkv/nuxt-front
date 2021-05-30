<template>
  <div>
    <p>Breadcrums</p>
    <div class="flex justify-between">
      <h1 class="text-3xl">{{group.name}}</h1>
      <a @click="openSchedule(course.id, group.id)" class="text-2xl mr-4 cursor-pointer border px-6 py-2">Schedule</a>
    </div>
    <div class="flex space-x-2">
      <button @click="changeCourse(course.id)" class="font-medium px-2" v-for="(course,index) in group.courses" :key="index">{{course.name}}</button>
    </div>
    <p>{{course.description}}</p>
    <table>
      <thead>
        <tr>
          <td>Full name</td>
          <td>Attendance</td>
          <td>Score</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in tableData" :key="data.id">
          <td>{{data.first_name + ' ' + data.last_name}}</td>
          <td>{{data.passed_count}}/{{data.attendances_count}}</td>
          <td>{{data.pivot.score === 0 ? data.pivot.score : data.pivot.score.toFixed(1)}}</td>
        </tr>
      </tbody>
    </table>
    <!-- <pre>{{tableData}}</pre> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      group: [],
      course: {},
      tableData: ''
    }
  },
  async asyncData({$axios, params}){
    const res = await $axios.$get(`/teacher/groups/${params.id}`)
    return {
      group: res,
      course: res.courses[0],
      tableData: await $axios.$get(`/teacher/groups/${params.id}/courses/${res.courses[0].id}/students`)
    }
  },
  methods: {
    async changeCourse(id) {
      const res = await this.$nuxt.$axios.$get(`/teacher/groups/${this.$route.params.id}/courses/${id}/students`)
      this.group.courses.forEach(course => {
        if(course.id === id) {
          this.course = course
        }
      });
      this.tableData = res
    },
    openSchedule(courseId, groupId){
      this.$router.push({name: 'teacher-schedules', query: {
        courseId,
        groupId
      }})
    }
  }
}
</script>