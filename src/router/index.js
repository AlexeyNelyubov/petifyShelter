import { createRouter, createWebHistory } from "vue-router";

import IndexPage from "@/views/IndexView.vue";
import AboutUsPage from "@/views/AboutUsVeiw.vue";
import PetPage from "@/views/PetView.vue";
import ProfilePage from "@/views/ProfileView.vue";
import SignUpPage from "@/views/SignUpView.vue";
import SignInPage from "@/views/SignInView.vue";
import PasswordRecoveryPage from "@/views/PasswordRecovery.vue";
import CreateNewPetCardPage from "@/views/CreateNewPetCard.vue";

// const IndexPage = () => import("../views/IndexView.vue");
// const AboutUsPage = () => import("../views/AboutUsVeiw.vue");
// const PetPage = () => import("@/views/PetView.vue");
// const ProfilePage = () => import("@/views/ProfileView.vue");
// const SignUpPage = () => import("@/views/SignUpView.vue");
// const SignInPage = () => import("@/views/SignInView.vue");
// const PasswordRecoveryPage = () => import("@/views/PasswordRecovery.vue");
// const CreateNewPetCardPage = () => import("@/views/CreateNewPetCard.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "IndexPage",
      component: IndexPage,
    },
    {
      path: "/NewFreature(aboutAs)",
      name: "AboutUs",
      component: AboutUsPage,
    },
    {
      path: "/pet/:id",
      name: "PetPage",
      component: PetPage,
      props: (route) => ({ id: route.params.id }),
    },
    {
      path: "/profile/:id",
      name: "ProfilePage",
      component: ProfilePage,
    },
    {
      path: "/signup",
      name: "SignUpPage",
      component: SignUpPage,
    },
    {
      path: "/signin",
      name: "SignInPage",
      component: SignInPage,
    },
    {
      path: "/passwordrecovery",
      name: "PasswordRecoveryPage",
      component: PasswordRecoveryPage,
    },
    {
      path: "/newPetCard",
      name: "CreateNewPetCardPage",
      component: CreateNewPetCardPage,
    },
  ],
});

export default router;
