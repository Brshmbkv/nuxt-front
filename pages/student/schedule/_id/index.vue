<template>
  <div>
    <Breadcrumbs />
    <h1 class="text-2xl font-medium my-1">{{ exercise.name }}</h1>
    <div
      v-if="exercise.attachment"
      id="gameContainer"
      class="border mt-4"
      style="width: 960px; height: 540px"
    ></div>
    <div class="mx-8 my-4 flex flex-col space-y-4">
      <div class="border-2 px-10 py-4 rounded-md">
        <p class="flex justify-center text-lg font-medium">
          Exercise description
        </p>
        <span>{{ exercise.content }}</span>
      </div>
      <div class="flex">
        <div class="w-1/2">
        <input
          type="file"
          ref="fileInput"
          @change="submitFile(exercise.id)"
          :disabled="fileUploading"
        />
        <div v-if="exercise.result" class="flex flex-col space-y-1 py-4">
          <div
            v-for="(file, index) in exercise.result.attachments"
            :key="index"
            class="group flex items-center space-x-16"
          >
            <div
              @click.prevent="downloadAttachment(file)"
              class="flex items-center space-x-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <a class="font-medium cursor-pointer transition hover:text-gray-500">{{
                file.name
              }}</a>
            </div>
            <a class="cursor-pointer" @click="deleteAttachment(file.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </a>
          </div>
        </div>
        </div>
        <div class="w-1/2">
          <textarea class="w-full h-40 mb-2" placeholder="Text answer" ref="textInput"></textarea>
          <a @click.prevent="submitTextAnswer(exercise.id)" class="btn-primary">Save</a>
        </div>
      </div>
      <div v-if="exercise.result" class="border px-8 py-4">
        <h3 class="flex text-2xl justify-center font-light">Feedback</h3>
        <p>Status: {{exercise.result.status.text}}</p>
        <p v-if="exercise.result.status.code === 1">Grade: {{exercise.result.score}}%</p>
        <p>Teacher commentary: <span class="font-semibold">{{exercise.result.comment}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from "@/components/UI/tabs/Tab.vue";
import Tabs from "@/components/UI/tabs/Tabs.vue";
import { mapGetters } from "vuex";
import Breadcrumbs from '~/components/UI/Breadcrumbs.vue';
export default {
  head() {
    return {
      // script: [
      //   {
      //     src: "https://know.iitu.edu.kz/TemplateData/UnityProgress.js",
      //     body: true,
      //     defer: true
      //   }
      // ],
      link: [
        {
          rel: "shortcut icon",
          href:
            "http://glacial-everglades-84858.herokuapp.com/TemplateData/favicon.ico"
        },
        {
          rel: "stylesheet",
          href:
            "http://glacial-everglades-84858.herokuapp.com/TemplateData/style.css"
        }
      ]
    };
  },
  components: {
    Tab,
    Tabs,
    Breadcrumbs
  },
  data() {
    return {
      exercise: {},
      fileUploading: false
    };
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(`/exercises/${params.id}`);
    return {
      exercise: res
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    async submitFile(id) {
      try {
        const input = this.$refs["fileInput"];
        this.fileUploading = true;
        const res = await this.$nuxt.$axios.$post("/exercises/results", {
          user_id: this.user.id,
          exercise_id: id
        });
        const formData = new FormData();
        formData.append("model_id", res.id);
        formData.append("model_type", "result");
        formData.append("file", input.files[0]);
        await this.$nuxt.$axios.post("/attachments", formData);
        input.value = "";
        this.$nuxt.refresh();
        this.fileUploading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async submitTextAnswer(id) {
      const input = this.$refs["textInput"];
      console.log(input.value)
      const res = await this.$nuxt.$axios.$post("/exercises/results", {
        user_id: this.user.id,
        exercise_id: id,
        value: input.value
      });
      this.$nuxt.refresh()
    },
    async deleteAttachment(id) {
      await this.$nuxt.$axios.$delete(`/attachments/${id}`);
      this.$nuxt.refresh();
    },
    async downloadAttachment(file) {
      await this.$nuxt
        .$axios({
          url: `/download/${file.id}`,
          method: "GET",
          responseType: "blob"
        })
        .then(response => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", file.name);
          fileLink.click();
        });
    }
  },
  mounted() {
    if (this.exercise.attachment) {
      const promise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `http://glacial-everglades-84858.herokuapp.com/Build/${this.exercise.path}/UnityLoader.js`;
        //script.defer = true;
        script.async = false;
        script.onerror = err => {
          reject(err, script);
        };
        script.onload = () => {
          resolve("UnityLoader ready!");
        };
        document.body.appendChild(script);
      });
      promise
        .then(msg => {
          console.log(msg);
          const gameInstance = UnityLoader.instantiate(
            "gameContainer",
            `http://glacial-everglades-84858.herokuapp.com/Build/${this.exercise.path}/${this.exercise.attachment.name}`
            //{ onProgress: UnityProgress }
          );
        })
        .catch(err => {});
    }
  }
};
</script>
