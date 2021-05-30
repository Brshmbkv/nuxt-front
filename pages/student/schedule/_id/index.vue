<template>
  <div>
    <p>Breadcrums: /Index/Schedule/{{ $route.params.id }}</p>
    <h1 class="text-3xl">{{ schedule.chapter.name }}</h1>
    <Tabs class="text-xl">
      <Tab name="Practice" selected="true">
        <div class="text-base">
          <div class="flex space-x-2">
            <a
              v-for="exercise in exercises"
              :key="exercise.id"
              @click.prevent="changeExercise(exercise.id); loadScript()"
              >{{ exercise.name }}</a
            >
          </div>
          <div id="gameContainer" style="width: 960px; height: 540px"></div>
          <pre>{{exercises}}</pre>
        </div>
      </Tab>
      <Tab name="Lecture">
        <div v-if="schedule.chapter.lectures.length">
          <div
            v-for="(lecture, index) in schedule.chapter.lectures"
            :key="index"
          >
            <p class="font-semibold text-2lg">{{ lecture.title }}</p>
            <div v-html="lecture.content"></div>
          </div>
        </div>
        <div v-else>
          No Lectures here
        </div>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import Tab from "@/components/UI/tabs/Tab.vue";
import Tabs from "@/components/UI/tabs/Tabs.vue";
import { mapGetters } from "vuex";

function loadScripts(scripts, appendTo) {
  appendTo = appendTo || "body";
  return new Promise(done => {
    (function recurse(i) {
      if (undefined === scripts[i]) return done();
      let src = scripts[i];
      let script = document.createElement("script");
      script.type = "text/javascript";
      if (script.readyState) {
        //IE
        script.onreadystatechange = () => {
          if (
            script.readyState == "loaded" ||
            script.readyState == "complete"
          ) {
            script.onreadystatechange = null;
            setTimeout(() => {
              recurse(++i);
            }, 1);
          }
        };
      } else {
        //Others
        script.onload = () => {
          setTimeout(() => {
            recurse(++i);
          }, 1);
        };
      }
      script.src = src;
      document.getElementsByTagName(appendTo)[0].appendChild(script);
    })(0);
  });
}

export default {
  head() {
    return {
      script: [
        {
          src: "https://know.iitu.edu.kz/TemplateData/UnityProgress.js",
          body: true,
          defer: true
        }
      ],
      link: [
        {
          rel: "shortcut icon",
          href: "https://know.iitu.edu.kz/TemplateData/favicon.ico"
        },
        {
          rel: "stylesheet",
          href: "https://know.iitu.edu.kz/TemplateData/style.css"
        }
      ]
    };
  },
  components: {
    Tab,
    Tabs
  },
  data() {
    return {
      schedule: {},
      exercises: [],
      exercise: {}
    };
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(`/schedules/${params.id}`);
    return {
      schedule: res,
      exercises: res.chapter.exercises,
      exercise: res.chapter.exercises[1]
    };
  },
  computed: {
    ...mapGetters("lab", ["path"]),
    ...mapGetters(["user"])
  },
  methods: {
    loadScript() {
      loadScripts([
        `https://know.iitu.edu.kz/Build/${this.exercise.path}/UnityLoader.js`
      ]).then(() => {
        var gameInstance = UnityLoader.instantiate(
          "gameContainer",
          `https://know.iitu.edu.kz/Build/${this.exercise.path}/${this.exercise.attachments[0].name}`,
          { onProgress: UnityProgress }
        );
      });
    },
    changeExercise(id) {
      this.exercises.forEach(e => {
        if(e.id === id){ 
          this.exercise = e
        }
      })
    },
    async submitFile(id) {
      const input = this.$refs[`fileInput${id}`][0].files;
      const res = await this.$nuxt.$axios.$post("/exercises/results", {
        user_id: this.user.id,
        exercise_id: id
      });
      const formData = new FormData();
      formData.append("model_id", res.id);
      formData.append("model_type", "result");
      formData.append("file", input[0]);
      const response = await this.$nuxt.$axios.post("/attachments", formData);
      console.log(response);
    }
  },
  mounted() {
    loadScripts([
      `https://know.iitu.edu.kz/Build/${this.exercise.path}/UnityLoader.js`
    ]).then(() => {
      var gameInstance = UnityLoader.instantiate(
        "gameContainer",
        `https://know.iitu.edu.kz/Build/${this.exercise.path}/${this.exercise.attachments[0].name}`,
        { onProgress: UnityProgress }
      );
    });
  }
};
</script>
