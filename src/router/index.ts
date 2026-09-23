import { createRouter, createWebHistory } from "vue-router";
import Adminlayout from "@/layouts/AdminLayout.vue";
import Dashboard from "@/pages/admin/Dashboard.vue";
import Clients from "@/pages/admin/Clients.vue";
import Trainers from "@/pages/admin/Trainers.vue";
import Programs from "@/pages/admin/Programs.vue";
import Exercises from "@/pages/admin/Exercises.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/admin/dashboard",
        },
        {
            path: "/admin",
            component: Adminlayout,
            redirect: "/admin/dashboard",
            children: [
                {
                    path: "dashboard",
                    name: "admin-dashboard",
                    component: Dashboard,
                },
                {
                    path: "clients",
                    name: "admin-clients",
                    component: Clients,
                },
                {
                    path: "trainers",
                    name: "admin-trainers",
                    component: Trainers,
                },
                {
                    path: "programs",
                    name: "admin-programs",
                    component: Programs,
                },
                {
                    path: "exercises",
                    name: "admin-exercises",
                    component: Exercises,
                }
            ]
        }
    ]
})

export default router;
