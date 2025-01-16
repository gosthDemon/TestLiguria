import "./bootstrap";
import { createApp } from "vue";
import router from "./router";
import MainTemplate from "./Layouts/MainTemplate.vue";
const app = createApp({ component: MainTemplate });
app.use(router);
app.component("main-template", MainTemplate);
app.mount("#app");
