<template>
    <div id="main-content" class="school-detail-page">
        <div class="container">
            <div class="wp-inner">
                <div id="breadcrumb">
                    <ul class="list-item clearfix">
                        <li>
                            <a href="/trang_chu" title="">Trang chủ</a>
                        </li>
                        <li class="ms-1 me-1">>></li>
                        <li>
                            <a href="/truong_hoc" title="">Trường học</a>
                        </li>
                        <li class="ms-1 me-1">>></li>
                        <li>
                            <a :href="'/truong_hoc/' + school.school_code" title="">{{ school.school_name }}</a>
                        </li>
                    </ul>
                </div>
                <div id="school-info-wp" class="detail">
                    <div class="section">
                        <div class="section-detail clearfix">
                            <div class="object_image">
                                <img v-if="school.school_image" :src="baseUrl + '/public/images/' + school.school_image" />
                            </div>
                            <div class="info_object">
                                <img class="object_logo" v-if="school.school_logo"
                                    :src="baseUrl + '/public/images/' + school.school_logo" />
                                <h1 class="object_name">{{ school.school_name }}</h1>
                                <div class="status mb-3">
                                    <div class="status-item mb-2">
                                        <i class="fa-regular fa-circle-check pe-1"></i>
                                        <span class="title">Mã trường: </span>
                                        <span>{{ school.school_code }}</span>
                                    </div>
                                    <div class="status-item">
                                        <i class="fas fa-location-dot pe-1"></i>
                                        <span class="title">Địa chỉ: </span>
                                        <a>{{ school.school_address }}</a>
                                    </div>
                                    <div class="status-item">
                                        <a v-if="school.school_website" :href="school.school_website"
                                            class="school_website btn">Đến website của trường</a>
                                        <a v-if="school.school_phone" :href="'tel:' + school.school_phone"
                                            class="school_phone btn">Tel: {{ school.school_phone }}</a>
                                    </div>
                                </div>
                                <div class="description" v-html="school.school_description"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="school-admissions" class="detail">
                    <div class="section">
                        <div class="section-head">
                            <p class="section-title" v-bind:class="{ active: selectedTab === 1 }"
                                v-on:click="selectedTab = 1">Các ngành đào tạo({{ majors.length }})</p>
                            <p class="section-title" v-bind:class="{ active: selectedTab === 2 }"
                                v-on:click="selectedTab = 2">Diểm chuẩn các năm</p>
                        </div>
                        <div class="section-content">
                            <div class="list-major" v-if="selectedTab == 1">
                                <div class="major_search">
                                    <input type="text" placeholder="Nhập vào tên ngành bạn muốn tìm" v-model="searchInput"
                                        @keyup="fillterMajor">
                                </div>
                                <div class="list_major_inner">
                                    <a class="major_item" v-for="item in majorFillter" href="">{{ item.major_name }}</a>
                                </div>
                            </div>
                            <div class="standard_core" v-if="selectedTab == 2">
                                <div class="standard_core_inner">
                                    Chưa cập nhật điểm chuẩn!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="school-detail" class="detail">
                    <div class="section">
                        <div class="section-head">
                            <p class="section-title active">Giới thiệu về trường {{ school.school_name }}</p>
                        </div>
                        <div class="section-content" v-html="school.school_detail">
                        </div>
                    </div>
                </div>

                <div class="comment card">
                    <div class="section">
                        <div class="tab-bar" id="tab-bar-listing">
                            <p class="btn-tab-bar selected">Bình luận</p>
                        </div>
                        <TheComment v-if="isLogin"/>
                        <div class="no_comment" v-if="comments.length == 0">
                            Không có bình luận nào!
                        </div>
                        <div class="listing" v-else>
                            <div class="listing-content">
                                <div class="item-listing" v-for="item in comments">
                                    <div class="user_comment d-flex">
                                        <div class="user_avatar me-2">
                                            <img :src="baseUrl + '/public/images/' + item.avatar" alt="">
                                        </div>
                                        <p class="user_name">{{ item.user_name }}</p>
                                        <p class="created_at">{{ item.created_at.slice(0, 19) }}</p>
                                    </div>
                                    <div class="content">
                                        {{ item.content }}
                                    </div>
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
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import TheComment from '../../components/Comment.vue';
export default defineComponent({
    components: {
        TheComment
    },
    setup() {
        const school = ref([]);
        const majors = ref([]);
        const majorFillter = ref([]);
        const comments = ref([]);
        const selectedTab = ref(1);
        const searchInput = ref("");
        const token = $cookies.isKey('token') ? $cookies.get('token') : "";
        const config = { params: { token : token } };
        var commentText;
        const route = useRoute();

        const getApi = () => {
            try {
                axios.get(baseUrl + "/api/school/" + route.params.code)
                    .then((response) => {
                        if (response.data.code == 200) {
                            school.value = response.data.school;
                            majors.value = response.data.school.school_majors;
                            majorFillter.value = majors.value.slice();
                        }
                    });
                axios.get(baseUrl + "/api/comment/" + route.params.code)
                    .then((response) => {
                        if (response.data.code == 200) {
                            comments.value = response.data.comments;
                        }
                    });
                axios.get(baseUrl + '/api/user_info', config)
                    .then(function (response) {
                        if (response.data.status == 200) {
                            isLogin.value = true;
                        }
                    })
            } catch (error) {
                console.error(error);
            }
        };
        getApi();
        return {
            school,
            majors,
            majorFillter,
            searchInput,
            commentText,
            isLogin,
            baseUrl,
            comments,
            selectedTab,
            VND
        }
    },
    methods: {
        fillterMajor() {
            let inputValue = this.searchInput.toLowerCase();
            this.majorFillter = this.majors.slice();
            if (inputValue) {
                this.majorFillter = this.majorFillter.filter(major => major.major_name.toLowerCase().includes(inputValue)
                );
            }
        },
        comment() {
            var token = $cookies.isKey('token') ? $cookies.get('token') : "";
            var data = {
                token: token,
                content: this.commentText
            }
            try {
                axios.post(baseUrl + "/api/comment/", data)
                    .then((response) => {
                        if (response.data.code == 200) {
                            console.log("Bình luận thành công!");
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        },

    }

});
</script>
<style>
.comment .section,
.comment .listing {
    background-color: #f4f4f4;
}

.comment .no_comment {
    width: 100%;
    margin-top: 20px;
    border-radius: 15px;
    padding: 20px;
    background: #fff;
}

hr {
    color: #04AFAE;
}

.comment .listing-content {
    background-color: #f4f4f4;
}

.comment .item-listing {
    padding: 15px;
    background-color: #fff;
    border-radius: 15px;
}

.comment .user_comment {
    margin-top: 0;
    border-radius: 15px;

}

.comment .user_comment .user_avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
}

.comment .user_comment .user_avatar img {
    width: 100%;
}

.comment .content {
    margin-top: 15px;
}

.comment .user_comment .created_at {
    margin-left: 15px;
    color: #ccc;
}</style>