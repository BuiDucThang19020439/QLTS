/* eslint-disable no-undef */
import { createRouter, createWebHistory } from "vue-router";

const routerList = [
    { path: "/", name: "HomeRouter", component: TheOverview}
]

const router = createRouter({
    history: createWebHistory(), routes: routerList,
})

export default router;