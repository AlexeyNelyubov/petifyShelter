import { createRouter, createWebHistory } from "vue-router";

import IndexPage from "/src/views/IndexView.vue";
const AboutUsPage = () => import("/src/views/AboutUsVeiw.vue");
const PetPage = () => import("/src/views/PetView.vue");
const ProfilePage = () => import("/src/views/ProfileView.vue");
const SignUpPage = () => import("/src/views/SignUpView.vue");
const SignInPage = () => import("/src/views/SignInView.vue");
const PasswordRecoveryPage = () => import("/src/views/PasswordRecovery.vue");
const CreateNewPetCardPage = () => import("/src/views/CreateNewPetCard.vue");

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
