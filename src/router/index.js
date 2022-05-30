import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailsComiteView from "../views/DetailsComiteView.vue";
import DetailsAssociationView from "../views/DetailsAssociationView.vue";
import UserComiteView from "../views/UserComiteView.vue";
//import AssociationView from "../views/AssociationView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/detailscomite",
    name: "detailscomite",
    component: DetailsComiteView,
    props: true,
  },

  {
    path: "/usercomite",
    name: "usercomite",
    component: UserComiteView,
  },

  // {
  //   path: "/association",
  //   name: "association",
  //   component: AssociationView,
  // },

  {
    path: "/detailsassociation",
    name: "detailsassociation",
    component: DetailsAssociationView,
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    // next({ name: "login" });
    next({ name: "admin" });
  } else {
    next();
  }
});

export default router;
