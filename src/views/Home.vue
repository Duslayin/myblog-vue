<template>
    <div class="home">
        <banner isHome="true"></banner>
        <div class="site-content animate">
            <!--通知栏-->
            <div class="notify">
                <div class="search-result" v-if="hideSlogan">
                    <span v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</span>
                    <span v-else-if="category">分类 "{{categoryInfo.categoryName}}" 相关文章</span>
                </div>
                <quote v-else>{{ notice }}</quote>
            </div>

            <!--焦点图-->
            <!-- <div class="top-feature" v-if="!hideSlogan">
                <section-title>
                    <div style="display: flex;align-items: flex-end;">聚焦<small-ico></small-ico></div>
                </section-title>
                <div class="feature-content">
                    <div class="feature-item" v-for="item in features" :key="item.title">
                        <Feature :data="item"></Feature>
                    </div>
                </div>
            </div> -->
            <!--文章列表-->
            <main class="site-main" :class="{'search':hideSlogan}">
                <section-title v-if="!hideSlogan">全部文章</section-title>
                <div class="no-data">
                    <span v-if="postList.length==0">空空如也~~~</span>
                </div>
                <template v-for="item in postList">
                    <post :post="item" :key="item.id"></post>
                </template>
            </main>

            <!--加载更多-->
            <div class="more" v-show="hasNextPage">
                <div class="more-btn" @click="loadMore">More</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import Feature from '@/components/feature'
    import sectionTitle from '@/components/section-title'
    import Post from '@/components/post'
    import SmallIco from '@/components/small-ico'
    import Quote from '@/components/quote'
    import { fetchList, fetchCategoryInfo } from '../api'

    export default {
        name: 'Home',
        props: ['cate', 'words'],
        data() {
            return {
                features: [],
                postList: [],
                currPage: 1,
                hasNextPage: false,
                categoryInfo: {}
            }
        },
        components: {
            Banner,
            Feature,
            sectionTitle,
            Post,
            SmallIco,
            Quote
        },
        computed: {
            searchWords() {
                return this.$route.params.words
            },
            category() {
                return this.$route.params.cate
            },
            hideSlogan() {
                return this.category || this.searchWords
            },
            notice() {
                return this.$store.getters.notice
            }
        },
        methods: {
            
            // 加载博客列表
            fetchList(params) {
                fetchList(params).then(res => {
                    if(!res) {
                        return
                    }
                    this.postList = res.data.list
                    this.currPage = res.data.pageNo         /* 更新当前页 */
                    if(this.postList.length < res.data.totalCount) {
                        this.hasNextPage = true
                    } else {
                        this.hasNextPage = false
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 加载更多博客
            loadMore() {
                let params = {
                    pageNo: this.currPage + 1,
                    categoryId: this.category
                }
                fetchList(params).then(res => {
                    // 合并下一页的数据到数组中
                    this.postList = this.postList.concat(res.data.list || [])
                    this.currPage = res.data.pageNo         /* 更新当前页 */
                    if(this.postList.length < res.data.totalCount) {
                        this.hasNextPage = true
                    } else {
                        this.hasNextPage = false
                    }
                })
            },
            // 获取分类信息
            getCategoryInfo(categoryId) {
                fetchCategoryInfo(categoryId).then(res => {
                    if(!res) {
                        return 
                    }
                    this.categoryInfo = res.data
                })
            }
        },
        watch: {
            category : function(newVal) {
                // console.log(newVal)
                this.currPage = 1
                this.fetchList({categoryId: this.category})
                this.getCategoryInfo(this.category)
            },
            searchWords: function(newVal) {
                // console.log(this.searchWords);
                this.currPage = 1
                this.fetchList({titleFuzzy: this.searchWords})
            },
            
        },
        mounted() {
            this.fetchList({categoryId: this.category, titleFuzzy: this.searchWords})
            this.getCategoryInfo(this.category)
        }
    }
</script>
<style scoped lang="less">

    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;
            & > div {
                padding: 20px;
            }
        }


        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;
        }
    }

    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }

    .site-main {
        padding-top: 80px;
        
        &.search {
            padding-top: 0;
        }

        .no-data {
            line-height: 50px;
            text-align: center;
            margin-bottom: 60px;
            font-size: 18px;
        }
    }

    .more{
        margin: 50px 0;
        .more-btn{
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;
            &:hover{
                color: #8fd0cc;
                border: 1px dashed #8fd0cc;
            }
        }
    }

    /******/
    @media (max-width: 800px) {
        .top-feature {
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

        .site-content {
            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }

    /******/
</style>
