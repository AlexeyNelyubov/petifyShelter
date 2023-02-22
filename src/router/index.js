import { createRouter, createWebHistory } from "vue-router";

const IndexPage = () => import("../views/IndexView.vue");
const AboutUsPage = () => import("../views/AboutUsVeiw.vue");
const ProfilePage = () => import("@/views/ProfileView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: IndexPage,
    },
    {
      path: "/NewFreature(aboutAs)",
      name: "AboutUs",
      component: AboutUsPage,
    },
    {
      path: "/profile/:id",
      name: "ProfilePage",
      component: ProfilePage,
    },
  ],
});

export default router;
