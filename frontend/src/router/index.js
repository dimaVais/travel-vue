import Vue from 'vue'
import VueRouter from 'vue-router'
import TravelApp from "@/pages/TravelApp.vue"
import TravelDetails from "@/pages/TravelDetails.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'TravelApp',
        component: TravelApp
    },
    {
        path: '/details/:id',
        name: 'TravelDetails',
        component: TravelDetails
    },
]

const router = new VueRouter({
    routes
})

export default router