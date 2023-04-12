<template>
    <div class="container-fluid" id="header" style="background-color: #0499AA; color: #fff;">
        <div class="container">
            <div class="row text-white text-while p-2" id="head-body">
                <div class="col-6 d-flex justify-content-start">
                    <a class="pe-3"><i class="fa-solid fa-location-dot"></i></a>
                    <a class="pe-3"><i class="fa-regular fa-envelope"></i></a>
                    <a class="pe-3"><i class="fa-brands fa-facebook-f"></i></a>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <a class="">Đăng nhập</a>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid" style="background-color: #04AFAE;">
        <div class="container">
            <div class="row text-while f-flex justify-content-center" id="head-body" style="padding: 1rem 0">
                <div class="col-12 col-sm-3 d-flex align-items-center justify-content-sm-start justify-content-center">
                    <router-link :to="{name: 'home'}">
                        <img src="../assets/images/logo.png" alt="logo" height="100" />
                    </router-link>
                </div>
                <div class="col-9 col-sm-6 d-flex align-items-center justify-content-center">
                    <form method="POST" action="">
                        <div id="search-wp">
                            <input type="text" name="s" id="s" placeholder="Nhập tên trường bạn muốn tìm kiếm!">
                            <button type="submit" id="sm-s">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="col-3 col-sm-3 d-sm-flex align-items-center justify-content-end d-none" id="action-wp">
                    <div id="advisory-wp" class="d-none d-sm-block " >
                        <span class="title fs-4">Tư vấn</span>
                        <span class="phone fw-bold">0911.634.683</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    setup(){
        return {
            baseUrl
        }
    }
}
</script>