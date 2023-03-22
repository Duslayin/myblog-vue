import request from '@/utils/request'
import request2 from '../utils/request2'



// 加载博客列表
export function fetchList(param) {
    // console.log(param);
    let params = {
        pageSize: 5,
    }
    Object.assign(params, param)
    return request2({
        url: '/blog/loadBlog',
        params
    })
}


// 加载分类列表
export function fetchCategoryList() {
    return request2({
        url: '/view/loadCategory',
        params: {}
    })
}

// 加载分类信息
export function fetchCategoryInfo(categoryId) {
    return request2({
        url: '/view/getCategory',
        params: {
            categoryId
        }
    })
}


// 加载博客内容
export function fetchBlogContent(blogId) {
    return request2({
        url: '/view/getBlogDetail',
        params: {
            blogId
        }
    })
}


// export function fetchList(params) {
//     return request({
//         url: '/post/list',
//         method: 'get',
//         params: params
//     })
// }

// export function fetchFocus() {
//     return request({
//         url: '/focus/list',
//         method: 'get',
//         params: {}
//     })
// }

export function fetchCategory() {
    return request({
        url: '/category',
        method: 'get',
        params: {}
    })
}

export function fetchFriend() {
    return request({
        url: '/friend',
        method: 'get',
        params: {}
    })
}

export function fetchSocial() {
    return request({
        url: '/social',
        method: 'get',
        params: {}
    });
}

export function fetchSiteInfo() {
    return request({
        url: '/site',
        method: 'get',
        params: {}
    })
}

export function fetchComment() {
    return request({
        url: '/comment',
        method: 'get',
        params: {}
    })
}
