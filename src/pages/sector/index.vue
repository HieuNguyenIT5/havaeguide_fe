<template>
    <div id="main-content" class="product-page">
        <div class="container">
            <div class="wp-inner">
                <div class="secion" id="breadcrumb">
                    <div class="secion-detail">
                        <ul class="list-item clearfix">
                            <li>
                                <a href="" title="">Trang chủ</a>
                            </li>
                            <li>>></li>
                            <li>
                                <a href="" title="">Điện thoại</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="secion" id="filter-product">
                    <div class="secion-detail">
                        <form method="get" ref="filter" enctype="multipart/form-data">
                            <div class="row">
                                <div class="col-10 d-flex justify-content-start">
                                    <select name="nganh_hang" id="" class="select-box" v-on:change="submitForm">
                                        <option value="">Ngành hàng</option>
                                        <option 
                                        v-for="item in categorys" 
                                        :value="item.id"
                                        v-bind:selected="filterSelect.nganh_hang == item.id"
                                        >
                                            {{ item.name }} 
                                        </option>
                                    </select>
                                    <select name="gia" id="" class="select-box" v-on:change="submitForm">
                                        <option value="">Giá</option>
                                        <option v-for="item in filrers.gia" 
                                        :value="item.value"
                                        v-bind:selected="filterSelect.gia == item.value"
                                        >{{ item.label }}
                                        </option>
                                    </select>
                                    <select name="thuong_hieu" id="" class="select-box" v-on:change="submitForm">
                                        <option value="">Thương hiệu</option>
                                        <option v-for="item in brands" 
                                        :value="item.id"
                                        v-bind:selected="filterSelect.thuong_hieu == item.id"
                                        >
                                        {{ item.name }}
                                    </option>
                                    </select>
                                </div>
                                <div class="col-2 d-flex justify-content-end">
                                    <select name="sap_xep" id="" class="select-box" v-on:change="submitForm">
                                        <option value="">Sắp xếp</option>
                                        <option v-for="item in filrers.sap_xep" 
                                        :value="item.value"
                                        v-bind:selected="filterSelect.sap_xep == item.value"
                                        >
                                        {{ item.label }}
                                    </option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="section" id="product-list">
                    <div class="section-detail">
                        <div class="listing">
                            <div class="listing-content row">
                                <div class="item-listing col-6 col-sm-3" v-for="product in products.data">
                                    <div class="item-inner">
                                        <div class="top-content">
                                            <a-image :height="300" :src="baseUrl + '/public/images/' + product.image" />
                                            <div class="btn">
                                                <i class="fa-solid fa-basket-shopping"></i>
                                                <i class="fa-solid fa-eye"></i>
                                                <i class="fa-solid fa-heart"></i>
                                                <i class="fa-solid fa-right-left"></i>
                                            </div>
                                        </div>
                                        <router-link :to="{ name: 'product-detail', params: { code: product.product_code } }">
                                            <div class="bottom-content">
                                                <p class="title">{{ product.name }}</p>
                                                <div class="price-show">
                                                    <p class="new-price">{{ VND.format(product.new_price) }}</p>
                                                    <p class="price">{{ VND.format(product.price) }}</p>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav class="pt-4 d-flex justify-content-center">
                            <ul class="pagination">
                                <li class="page-item" v-if="products.current_page > 1">
                                    <a class="page-link" :href="'/san_pham?page=' + (products.current_page - 1) + (filterUrl ? '&'+filterUrl : '')"
                                        aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>

                                <li class="page-item" v-for="(link, index) in products.links"
                                    v-bind:class="[{ active: products.current_page == link.label }]">
                                    <a class="page-link" :href="'/san_pham?page=' + link.label +  (filterUrl ? '&'+filterUrl : '')"
                                        v-if="index != 0 && index != products.last_page + 1">{{ link.label }}</a>
                                </li>

                                <li class="page-item" v-if="products.current_page < products.last_page">
                                    <a class="page-link" :href="'/san_pham?page=' + (products.current_page + 1) + (filterUrl ? '&'+filterUrl : '')"
                                        aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const categorys = ref([]);
        const products = ref([]);
        const brands = ref([]);
        const route = useRoute();
        var filrers = {
            gia: [
                {
                    value: '1',
                    label: "Dưới 1 triệu"
                },
                {
                    value: '1-3',
                    label: "Từ 1-3 triệu"
                },
                {
                    value: '3-5',
                    label: "Từ 3-5 triệu"
                },
                {
                    value: '5-10',
                    label: "Từ 5-10 triệu"
                },
                {
                    value: '10',
                    label: "Trên 10 triệu"
                }
            ],
            sap_xep: [
                {
                    value: '1',
                    label:"Sản phẩm mới nhất"
                },
                {
                    value: '2',
                    label:"Sản phẩm cũ nhất"
                },
                {
                    value: '3',
                    label:"Giá từ thấp lên cao"
                },
                {
                    value: '4',
                    label:"Giá từ cao xuống thấp"
                },
            ]
        };
        var filterSelect = {
            nganh_hang: route.query.nganh_hang,
            gia: route.query.gia,
            thuong_hieu: route.query.thuong_hieu,
            sap_xep: route.query.sap_xep,
        };
        var page = route.query.page;
        var filterUrl = filterSelect.nganh_hang ? 'nganh_hang=' +filterSelect.nganh_hang : ''
        filterUrl += filterSelect.gia ? '&gia=' +filterSelect.gia : ''
        filterUrl += filterSelect.thuong_hieu ? '&thuong_hieu=' +filterSelect.thuong_hieu : ''
        filterUrl += filterSelect.sap_xep ? '&sap_xep=' +filterSelect.sap_xep : '';
        var subUrl = page ? 
            "?page=" + page + '&' + filterUrl
        : '?' + filterUrl;
        console.log(filterUrl);
        const getApi = () => {
            axios.get(baseUrl + "/api/product" + subUrl)
                .then((response) => {
                    
                    categorys.value = response.data.categorys;
                    brands.value = response.data.brands;
                    products.value = response.data.products;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getApi();
        
        return {
            categorys,
            brands,
            products,
            filrers,
            filterSelect,
            filterUrl,
            baseUrl,
            VND
        }

    },
    methods: {
        submitForm() {
            this.$refs.filter.submit();
        }
    }
});
</script>