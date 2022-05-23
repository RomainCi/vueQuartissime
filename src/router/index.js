import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailsComiteView from "../views/DetailsComiteView.vue";
import ConnexionComiteView from "../views/ConnexionComiteView.vue";
import ProfilComiteView from "../views/ProfilComiteView.vue";

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
		path: "/login",
		name: "login",
		component: ConnexionComiteView,
	},
	{
		path: "/profilcomite",
		name: "profilcomite",
		component: ProfilComiteView,
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

export default router;
