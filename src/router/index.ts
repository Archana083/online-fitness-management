import { createRouter, createWebHistory } from "vue-router";
import Adminlayout from "@/layouts/AdminLayout.vue";
import Dashboard from "@/pages/admin/Dashboard.vue";
import Clients from "@/pages/admin/Clients.vue";


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
                }
            ]
        }
    ]
})

export default router;
