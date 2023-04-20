import { advancePositionWithMutation } from "@vue/compiler-core";

const client = [
    {
        path: "",
        component: () => import("../layouts/client.vue"),
        children: [
            //Module home
            {
                path: "",
                name: "index",
                component: () => import("../pages/home/index.vue")
            },
            {
                path: "/trang_chu",
                name: "home",
                component: () => import("../pages/home/index.vue")
            },
            
            //Module product
            {
                path: "/nhom_nganh",
                name: "sectors",
                component: () => import("../pages/sector/index.vue"),
            },
            {
                path: "/nhom_nganh/:sector_id",
                name: "sector",
                component: () => import("../pages/sector/index.vue"),
            },
            {
                path: "/truong_hoc",
                name: "school",
                component: () => import("../pages/school/index.vue")
            },
            {
                path: "/truong_hoc/:code",
                name: "school_detail",
                component: () => import("../pages/school/detail.vue")
            },
            //Module cart
            {
                path: "/dia_diem",
                name: "areas",
                component: () => import("../pages/cart/index.vue"),
            },
            {
                path: "/dia_diem/:code",
                name: "area",
                component: () => import("../pages/cart/index.vue"),
            },


            // Trang tĩnh
            {
                path: "/gioi_thieu",
                name: "about",
                component: () => import("../pages/page/about.vue"),
            },
            {
                path: "/lien_he",
                name: "contace",
                component: () => import("../pages/page/contact.vue"),
            },
        ]
    }
];
export default client;
