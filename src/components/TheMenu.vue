<template>
    <div id="menu" class="container-fluid shadow mb-3">
        <div class="container">
            <div class="d-flex align-items-center menu-inner">
                <div class="fs-6">
                    <div id="main-menu-wp" class="d-flex align-items-center justify-content-end">
                        <ul id="main-menu" class="clearfix p-2">
                            <li>
                                <a href="/trang_chu" title="">Trang chủ</a>
                            </li>
                            <li>
                                <a href="/truong_hoc" title="">Trường học</a>
                            </li>
                            <li>
                                <a href="/blog" title="">Diễn đàn</a>
                            </li>
                            <li>
                                <a href="/news" title="">Tin tức</a>
                            </li>
                            <li>
                                <a href="/gioi_thieu" title="">Giới thiệu</a>
                            </li>
                            <li>
                                <a href="/lien_he" title="">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
#menu #main-menu {
    display: flex;
    margin: 0;
}

#menu #main-menu li {
    list-style: none;
}

#menu #main-menu li a {
    display: block;
    color: #000;
    padding: 5px 15px;
    border-right: 1px solid black;
    font-size: 20px;
}

#menu #main-menu li:last-child a {
    border-right: none;
}

#menu .menu-inner {
    position: relative;
}
@media (max-width: 576px){
    #menu a{
    font-size: 14px !important;
    }
}
</style>