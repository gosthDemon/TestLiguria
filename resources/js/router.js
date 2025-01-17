import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "./pages/Dashboard/Dashboard.vue";
import SolicitudPuertaPage from "./pages/SolicitudPuerta/SolicitudPuerta.vue";
import { mergeProps } from "vue";

const routes = [
    { path: "/", component: DashboardPage },
    { path: "/dashboard", component: DashboardPage },
    {
        path: "/solicitud-puerta/:action",
        component: SolicitudPuertaPage,
        props: (route) => ({
            action: route.params.action,
        }),
    },
    {
        path: "/solicitud-puerta/:action/:id",
        component: SolicitudPuertaPage,
        props: (route) => ({
            action: route.params.action,
            id: route.params.id || null,
        }),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
