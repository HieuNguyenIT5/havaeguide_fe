<template>
    <div id="main-content" class="product-detail-page">
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
                <div class="main-content">
                    <div class="section" id="detail-product-wp">
                        <div class="section-detail clearfix row">
                            <div class="thumb col-4">
                                <a-image v-if="product.image" :src="baseUrl + '/public/images/' + product.image" />
                            </div>
                            <div class="info col-8">
                                <h3 class="product-name">{{ product.name }}</h3>
                                <div class="status d-flex mb-3 justify-content-between">
                                    <div class="status-item">
                                        <i class="fa-regular fa-circle-check pe-1"></i>
                                        <span class="title">Trạng thái: </span>
                                        <span v-if="product.quantity > 0">Còn hàng</span>
                                        <span v-else>Hết hàng</span>
                                    </div>
                                    <div class="status-item">
                                        <i class="fa-regular fa-circle-check pe-1"></i>
                                        <span class="title">Mã sản phẩm: </span>
                                        <span>{{ product.product_code }}</span>
                                    </div>
                                    <div class="status-item">
                                        <i class="fa-regular fa-circle-check pe-1"></i>
                                        <span class="title">Phí vận chuyển: </span>
                                        <span>Miễn phí</span>
                                    </div>
                                </div>
                                <div class="desc" v-html="product.description">
                                </div>
                                <div class="show-price d-flex mb-3">
                                    <p class="new_price">{{ VND.format(product.new_price) }}</p>
                                    <p class="price">{{ VND.format(product.price) }}</p>
                                </div>
                                <div id="num-order-wp">
                                    <a title="" id="minus"><i class="fa fa-minus"></i></a>
                                    <input type="text" name="num-order" value="1" id="num-order">
                                    <a title="" id="plus"><i class="fa fa-plus"></i></a>
                                </div>
                                <a href="?page=cart" title="Thêm giỏ hàng" class="add-cart">Thêm giỏ hàng</a>
                            </div>
                        </div>
                    </div>
                    <div class="section " id="product-detail">
                        <div class="section-head">
                            <span class="section-title active">Mô tả sản phẩm</span>
                            <span class="section-title">Thông số kỹ thuật</span>
                        </div>
                        <div class="section-detail" v-html="product.product_detail">
                        </div>
                    </div>
                </div>
                <!-- same category -->
                <div class="section card" id="same-category">
                    <div class="tab-bar" id="tab-bar-listing">
                        <p class="btn-tab-bar selected" data="1">Cùng danh mục</p>
                    </div>
                    <div class="listing">
                        <div class="listing-content row">
                            <div class="item-listing col-6 col-sm-3" v-for="product in sameCategory.slice(0, 4)">
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
                                    <router-link :to="{ name: 'product-detail', params: { id: product.id } }">
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
                    <!-- end same category -->
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

        const product = ref([]);
        const sameCategory = ref([]);
        var catId;
        const route = useRoute();

        const getApi = () => {
            try {
                axios.get(baseUrl + "/api/product/" + route.params.code)
                    .then((response1) => {
                        product.value = response1.data.product;
                        catId = response1.data.product.cat_id;
                    });
                axios.get(baseUrl + "/api/product/same_category/" + catId)
                    .then((response2) => {
                        sameCategory.value = response2.data.products;
                    });
            } catch (error) {
                console.error(error);
            }
        };
        getApi();
        return {
            product,
            sameCategory,
            baseUrl,
            VND
        }
    },

});
</script>