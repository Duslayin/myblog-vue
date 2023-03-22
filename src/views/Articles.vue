<template>
    <div class="articles">
        <banner></banner>
        <div class="site-content animate">
            <!-- 文章目录 -->
            <div id="article-menus" v-if="menus.length!=0">
                <menu-tree :menus="menus" child-label="child"></menu-tree>
            </div>
            <main class="site-main">
                <article class="hentry">
                    <!-- 文章头部 -->
                    <header class="entry-header">
                        <!-- 标题输出 -->
                        <h1 class="entry-title">{{ blogInfo.title }}</h1>
                        <hr>
                        <div class="breadcrumbs">
                            <div id="crumbs">最后更新时间：{{ blogInfo.lastUpdateTime }}</div>
                        </div>
                    </header>
                    <!-- 正文 -->
                    <div class="entry-content" v-highlight>
                        <div class="content"
                            id="content"
                            ref="content"
                            v-html="blogInfo.content"></div>
                    </div>
                    <!-- 文章底部 -->
                    <section-title>
                        <footer class="post-footer">
                            <!-- 阅读次数 -->
                            <div class="post-like">
                                <i class="iconfont iconeyes"></i>
                                <span class="count">685</span>
                            </div>
                            <div class="donate" @click="showDonate=!showDonate">
                                <span>赏</span>
                                <ul class="donate_inner" :class="{'show':showDonate}">
                                    <li class="wedonate"><img src="https://pic.imgdb.cn/item/6416fbd8a682492fcc0643b3.jpg"><p>微信赞赏</p></li>
                                </ul>
                            </div>
                            <!-- 文章标签 -->
                            <div class="post-tags">
                                <i class="iconfont iconcategory"></i>
                                <router-link :to="`/category/${blogInfo.categoryId}`">{{ blogInfo.categoryName }}</router-link>
                            </div>
                        </footer>
                    </section-title>

                    <!--声明-->
                    <div class="open-message">
                        <p>声明：本文源自「guanlyee博客」|版权所有，违者必究|如未注明，均为原创</p>
                        <p>转载：转载请注明原文链接 - <a href="/">{{ blogInfo.title }}</a></p>
                    </div>
                </article>
            </main>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import sectionTitle from '@/components/section-title'
    import comment from '@/components/comment'
    import menuTree from '@/components/menu-tree'
    import {fetchBlogContent} from '../api'
    export default {
        name: 'articles',
        data(){
          return{
              menus: [],
              showDonate: false,
              blogId: this.$route.params.blogId,
              blogInfo: '',
          }
        },
        components: {
            Banner,
            sectionTitle,
            comment,
            menuTree
        },
        methods: {
          // 获取博客内容
          fetchBlogContent(){
            fetchBlogContent(this.blogId).then(res => {
                //   console.log(res.data);
                  this.blogInfo = res.data
                  this.createMenus()
              }).catch(err => {
                  console.log(err)
              })
          },
          fetchH(arr,left,right){
              if (right) {
                  return arr.filter(item => item.offsetTop > left && item.offsetTop < right)
              }else {
                  return arr.filter(item => item.offsetTop > left)
              }
          },
          // 生成目录
          createMenus(){
            // 要在DOM更新之后执行
            this.$nextTick(() => {
                let arr = []
                let index = 0
                for(let i=6;i>0;i--){
                  let temp = []
                  let e = document.querySelector(".entry-content").querySelector('#content').querySelectorAll(`h${i}`)
                  for (let j=0;j<e.length;j++){
                      index++
                      let child = this.fetchH(arr,e[j].offsetTop,(j+1 === e.length)?undefined:e[j+1].offsetTop)
                      e[j].setAttribute('id', index)
                      temp.push({
                          h: i,
                          title: e[j].innerText,
                          id: index,
                          offsetTop: e[j].offsetTop,
                          child
                      })
                  }
                  if (temp.length){
                      arr = temp
                  }
                }
                this.menus = arr
                // console.log(arr);
            })
          }
        },
        mounted(){
            // console.log(this.blogId);
            // v-html不会作为 Vue 模板进行编译 innerHTML的内容访问不到
            // this.createMenus()

        },
        created() {
            this.fetchBlogContent()
        }
    }
</script>
<style lang="less">

    .site-content {
        position: relative;
        .site-main {
            padding: 80px 0 0 0;
            .content {
                img {
                    max-width: 100%;
                }
            }
        }
    }
    #article-menus{
        position: sticky;
        top: 0;
        box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
        border-radius: 3px;
        padding: 15px;
        width: 300px;
        max-height: 400px;
        overflow: auto;
        transform: translateX(-120%) translateY(150px);
        font-size: 14px;
    }
    article.hentry {
        .entry-header {
            .entry-title {
                font-size: 23px;
                font-weight: 600;
                color: #737373;
                margin: 0.67em 0;

                &:before {
                    content: "#";
                    margin-right: 6px;
                    color: #d82e16;
                    font-size: 20px;
                    font-weight: 600;
                }
            }

            hr {
                height: 1px;
                border: 0;
                background: #EFEFEF;
                margin: 15px 0;
            }

            .breadcrumbs {
                font-size: 14px;
                color: #D2D2D2;
                text-decoration: none;
                margin-bottom: 30px;
            }
        }

        .entry-content {

        }

        footer.post-footer {
            width: 100%;
            padding: 20px 10px;
            margin-top: 30px;
            height: 65px;
            position: relative;
            i{
                font-size: 18px;
                margin-right: 5px;
            }
            .post-like {
                float: right;
                margin: 7px 0 0 20px;
            }

            .post-share {
                float: right;
                list-style: none;
                margin-right: 20px;
            }

            .donate {
                float: left;
                line-height: 36px;
                border-radius: 100%;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border: 1px solid #2B2B2B;
                &:hover{
                    border: 1px solid goldenrod;
                    span{
                        color: goldenrod;
                    }
                }
                span {
                    color: #2B2B2B;
                    padding: 10px;
                    position: relative;
                    cursor: pointer;
                }

                .donate_inner {
                    display: none;
                    margin: 0;
                    list-style: none;
                    position: absolute;
                    left: 80px;
                    top: -40px;
                    background: #FFF;
                    padding: 10px;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
                    border-radius: 3px;
                    &.show{
                        display: block;
                    }
                    li {
                        float: left;
                    }

                    img {
                        width: 100px;
                    }
                    p {
                        text-align: center;
                        font-size: 15px;
                        color: #D2D2D2;
                        line-height: 1rem;
                    }
                }

                .donate_inner:after, .donate_inner:before {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 45%;
                    margin-left: -8px;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    border-right: 8px solid #fff;
                }

                .donate_inner:before {
                    left: -1px;
                    border-right: 8px solid #ddd;
                }

            }

            .post-tags {
                margin: 7px 0 0 20px;
                float: left;
                text-transform: uppercase;
                a:hover{
                    color: #ff6d6d;
                }
            }
        }
        .open-message {
            margin: 50px 0;
            position: relative;
            background: #2B2B2B;
            padding: 10px 30px;
            border-radius: 3px;
            font-size: 14px;
            color: #fff;
            &:after {
                content: "";
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #2B2B2B;
                position: absolute;
                top: -8px;
                left: 48%;
            }
            p {
                margin: 10px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            a {
                color: #A0DAD0;
                padding: 0 5px;
            }
        }
    }

    @media (max-width: 1490px) {
        #article-menus {
            display: none;
        }
    }
    @media (max-width: 800px) {
        #article-menus {
            display: none;
        }
    }
</style>
