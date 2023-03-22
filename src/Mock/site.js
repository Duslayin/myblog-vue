const Mock = require('mockjs');
export default [
    // 站点信息
    {
        url: '/site',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: {
                    avatar: 'https://pic.imgdb.cn/item/64167a08a682492fcc1b8b84.png',
                    slogan: '日拱一卒，功不唐捐',
                    name: 'Guanlyee′blog',
                    domain: 'https://www.fengziy.cn',
                    notice: '欢迎访问Guanlyee的博客~~~',
                    desc: '一个It技术的探索者'
                }
            }
        }
    },
    // 站点社交信息
    {
        url: '/social',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: [
                    {
                        id: 1,
                        title: 'QQ-3310934602',
                        icon: 'iconqq',
                        color: '#1AB6FF ',
                        href: '/'
                    },
                    {
                        id: 2,
                        title: 'Gitee',
                        icon: 'icongitee',
                        color: '#d81e06',
                        href: 'https://gitee.com/duslayin'
                    },
                    {
                        id: 3,
                        title: 'CSDN',
                        icon: 'iconcsdn',
                        color: 'red',
                        href: 'https://blog.csdn.net/weixin_44856909'
                    }
                ]
            }
        }
    }
]