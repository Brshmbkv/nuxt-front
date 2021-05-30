<template>
  <div>
    <p>Breadcrums</p>
    <h1>{{data.name}}</h1>
    <table>
      <thead>
        <tr>
          <td>Id</td>
          <td>Time</td>
          <td>Chapter name</td>
          <td>Attendance</td>
          <td>General performance</td>
          <td>Unchecked works</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in data.schedules" :key="item.id" @click="goToSchedule(item.id)" class="cursor-pointer">
          <td>{{index + 1}}</td>
          <td>{{item.starts_at}}</td>
          <td>{{item.title}}</td>
          <td>{{item.attended}}/{{data.students_count}}</td>
          <td>{{item.average_score}}</td>
          <td>{{item.not_checked}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      data: ''
    }
  },
  async asyncData({$axios, query, error}){
    try{
      const res = await $axios.$get(`/teacher/groups/${query.groupId}/courses/${query.courseId}/schedules`)
      return {
        data : res
      }
    }catch(e) {
      error({
        message: e.response.data.error,
        statusCode: e.response.status
      })
    }
  },
  methods: {
    goToSchedule(id) {
      this.$router.push({name: 'teacher-schedules-id', params: {id}})
    }
  }
}
</script>