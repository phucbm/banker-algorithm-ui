import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventDetails from "../views/EventDetails.vue";
import About from "../views/AboutView.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    component: EventDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
