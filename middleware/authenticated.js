//This middleware restricts users to go some routes if you are authenticated
//Example: If user authenticated he does not need to re-enter the login or register route and so on
export default ({ store, redirect }) => {
  if (store.getters["isAuthenticated"]) {
    if (store.getters["user"].role_name === "Пользователь") {
      redirect("student/courses");
    } else if (store.getters["user"].role_name === "Преподаватель") {
      redirect("teacher/groups");
    }
  }
};
