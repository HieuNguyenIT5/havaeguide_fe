<template>
  <div id="main-content" class="home-page">
    <div class="container">
      <div class="wp-inner">
        <div id="slider" class="mb-4">
          <Carousel :autoplay="2000" :wrap-around="true">
            <Slide v-for="slide in sliders" style="height: auto;">
              <div class="carousel__item"><img class="w-100" :src="baseUrl + '/public/images/' + slide.url" alt="">
              </div>
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
        <div class="section card" id="selling-product">
          <div class="tab-bar" id="tab-bar-listing" v-if="sectors">
            <p class="btn-tab-bar selected" data="1">Nhóm ngành bạn muốn học</p>
          </div>
          <div class="listing">
            <div class="listing-content row">
              <div class="item-listing col-6 col-sm-3" v-for="item in sectors">
                <div class="item-inner">
                  <router-link :to="{ name: 'sector', params: { sector_id: item.id } }">
                    <p class="title">{{ item.name }}</p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- End listing -->
        </div>

        <div class="list-product-by-category card" v-for="items in products">
          <div class="section">
            <div class="tab-bar" id="tab-bar-listing">
              <p class="btn-tab-bar selected" data="1">{{ items.cat_name }}</p>
            </div>
            <div class="listing">
              <div class="listing-content row">
                <div class="item-listing col-6 col-sm-3" v-for="item in items.product">
                  <a href="#">
                    <div class="item-inner">
                      <div class="top-content">
                        <a-image :height="300" :src="baseUrl + '/public/images/' + item.image" />
                        <div class="btn">
                          <i class="fa-solid fa-basket-shopping"></i>
                          <i class="fa-solid fa-eye"></i>
                          <i class="fa-solid fa-heart"></i>
                          <i class="fa-solid fa-right-left"></i>
                        </div>
                      </div>
                      <router-link :to="{ name: 'product-detail', params: { code: item.product_code } }">
                        <div class="bottom-content">
                          <p class="title">{{ item.name }}</p>
                          <div class="price-show">
                            <p class="new-price">{{ VND.format(item.new_price) }}</p>
                            <p class="price">{{ VND.format(item.price) }}</p>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <!-- End listing -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 4,
        snapAlign: 'start',
      },
    },
  }),
  components: {
    Carousel,
    Pagination,
    Slide,
  },
  setup() {
    const sliders = ref([]);
    const sectors = ref([]);
    const products = ref([]);
    const visible = ref(false);
    const setVisible = value => {
      visible.value = value;
    };
    const getApi = () => {
      axios.get(baseUrl + '/api/home')
        .then(function (response) {
          sliders.value = response.data.sliders;
          sectors.value = response.data.sectors;
          products.value = response.data.products;
        })
        .catch(function (error) {
          // xử trí khi bị lỗi
          console.log(error);
        })
    };
    getApi();
    return {
      sliders,
      sectors,
      products,
      baseUrl,
      visible,
      setVisible,
      VND
    }
  }

});

</script>

<style>
#slider {
  position: relative;
}

#slider .carousel__pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
}

.ant-image {
  width: 100%;
}
</style>
