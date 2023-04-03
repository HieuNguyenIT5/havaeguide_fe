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
                                <a href="/san_pham" title="">Sản phẩm</a>
                            </li>
                            <li>
                                <a href="/blog" title="">Blog</a>
                            </li>
                            <li>
                                <a href="/page/detail_blog" title="">Giới thiệu</a>
                            </li>
                            <li>
                                <a href="?page=detail_blog" title="">Liên hệ</a>
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
}

#menu #main-menu li:last-child a {
    border-right: none
}

#menu .menu-inner {
    position: relative;
}

#menu .btn_category {
    cursor: pointer;
    padding: 13px 0px;
}

#menu .list-category {
    position: absolute;
    width: 25%;
    top: 58px;
    display: none;
    z-index: 2;
    background-color: #fff;
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
    font-size: 16px;

}

#menu .list-category li {
    list-style: none;
    border-bottom: 1px solid #E0E0E0;
}

#menu .list-category li a {
    padding: 10px 10px;
}

#menu .list-category .subcategory {
    display: none;
    width: 300%;
    height: auto;
    background-color: #fff;
    position: absolute;
    top: 0px;
    left: 100%;
}

#menu .list-category .subcategory>li {
    width: 33.33%;
    height: 70px;
    border: none;
}
#menu .list-category .subcategory>li img{
    width: 50px;
}
#menu .list-category .subcategory>li p{
    display:-webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}
#menu .category_product:hover .list-category {
    display: block;
}

#menu .list-category>li:hover {
    background-color: #F5F5F5;

}

#menu .list-category li:hover .subcategory {
    display: flex;
    flex-wrap: wrap;
}
#menu .list-category .subcategory>li:hover{
    border: 1px solid #E0E0E0;
}
</style>