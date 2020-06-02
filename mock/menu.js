export default {
  'GET /api/example/menu': {
    menuData: [{
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/tb',
        icon: 'form',
        name: '后台-商品SKU信息管理',
        component: './404',
      },
      {
        path: '/jd',
        icon: 'table',
        name: '后台-京东店铺营销数据管理',
        component: './404',
      },
      {
        path: '/analysis',
        name: '店铺经营统计分析报表',
        icon: 'profile',
        component: './404',
      }, {
        name: 'UIToolsList',
        icon: 'profile',
        path: '/uitoolsList?func_id=11008',

        component: './uitools',
      }, {
        name: '查询表格',
        icon: 'smile',
        path: '/listtablelist',
        component: './ListTableList',
      }, {
        name: '搜索列表（项目）',
        icon: 'smile',
        path: '/listsearchprojects',
        component: './ListSearchProjects',
      },
      {
        name: 'Form',
        icon: 'smile',
        path: '/formpage',
        component: './formpage',
      },
      // {
      //   path: '/',
      //   redirect: '/welcome',
      //   authority: ['admin', 'user'],
      // },
      {
        component: '404',
      },
    ],
  }
}
