import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";

const ProfilePage = () => import("@/views/ProfileView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: IndexView,
    },
    {
      path: "/NewFreature(aboutAs)",
      name: "AboutUs",
      component: () => import("../views/AboutUsVeiw.vue"),
    },
    {
      path: "/profile/:id",
      name: "ProfilePage",
      component: ProfilePage,
    },
  ],
});

export default router;
