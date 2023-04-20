<template>
    <div id="main-content" class="area-page">
        <div class="container">
            <div class="wp-inner">
                <div id="breadcrumb">
                    <ul class="list-item clearfix">
                        <li>
                            <a href="/trang_chu" title="">Trang chủ</a>
                        </li>
                        <li class="ms-1 me-1">>></li>
                        <li>
                            <a href="/khu_vuc" title="">Khu vực</a>
                        </li>
                    </ul>
                </div>
                <div id="area-list-wp" class="detail">
                    <div class="section">
                        <div class="section-detail clearfix">
                            <div class="list-item row" >
                                <div class="item col-3" v-for="item in areas">
                                    <div class="item_inner">
                                        <a :href="'/khu_vuc/'+item.codename">{{ item.name }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
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
        const areas = ref([]);
        const route = useRoute();
        const getApi = () => {
            try {
                axios.get(baseUrl + "/api/areas")
                    .then((response) => {
                        if (response.data.code == 200) {
                            areas.value = response.data.areas;
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        };
        getApi();
        return {
            areas,
            baseUrl,
        }
    }
});
</script>
<style>
.sector-detail-page,
.sector-detail-page .listing,
.school.card{
    background-color: #fafafa !important;
    box-sizing: border-box;
}

.sector-detail-page .detail .info_object .object_logo{
    height: 150px;
    position: absolute;
    top: -100px;
    top: 100px;
    left: 50%; 
    transform: translate(-50%, -50%);
}
.sector-detail-page .detail .info_object .object_name{
    padding-top: 250px;
    left: 50%;
    transform: translateX(-50%);
    color: #000;
    text-shadow: none;
}
.sector-detail-page .detail .description{
    padding: 30px;
    padding-top: 260px;
    text-align: justify;
}
/* listing */
.sector-detail-page .item-listing{
    margin-bottom: 30px;
}
.sector-detail-page .item-listing .top-content {
    border-bottom: 1px solid #04AFAE;
}

.sector-detail-page .item-listing .top-content .img {
    height: 100px;
}

.sector-detail-page .item-listing .top-content .img img {
    height: 100px;
    max-width: 100%;
}

.sector-detail-page .item-listing .top-content .title {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 20px;
    color: #04AFAE;
}

.sector-detail-page .item-listing .top-content .address {
    height: 50px;
    font-style: italic;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

.sector-detail-page .item-listing .bottom-content {
    height: 240px;
    margin-top: 20px;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

.sector-detail-page .item-listing .bottom-content p {
    text-align: justify;
}

.sector-detail-page .item-inner:hover {
    background: #fff !important;
}

.sector-detail-page .paginate i {
    font-size: 14px;
}

.sector-detail-page .paginate .item_inner {
    padding: 5px 10px;
    background: #04AFAE;
    color: #fff;
    border-left: 1px solid #fff;
    cursor: pointer;
}

.sector-detail-page .paginate .item_inner:last-child() {
    border-left: none;
}
</style>