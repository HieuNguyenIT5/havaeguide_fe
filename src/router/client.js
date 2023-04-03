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
                path: "/nhom_nganh/:sector_id",
                name: "sector",
                component: () => import("../pages/product/index.vue"),
            },
            {
                path: "/san_pham/chi_tiet_san_pham/:code",
                name: "product-detail",
                component: () => import("../pages/product/detail.vue")
            },

            //Module cart
            {
                path: "/gio_hang",
                name: "cart",
                component: () => import("../pages/cart/index.vue"),
            },

        ]
    }
];
export default client;
