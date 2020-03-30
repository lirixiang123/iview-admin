import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  // 首页
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // cmdb 资产
  {
    path: '/cmdb',
    name: 'cmdb',
    meta: {
      icon: 'ios-cube',
      title: '资产管理',
      showAlays: true
    },
    component: Main,
    children: [{
      path: 'servers',
      name: 'cmdb_servers',
      meta: {
        icon: 'ios-cube',
        title: '主机管理',
        access: ['super_admin']
      },
      component: () => import('@/view/cmdb/server_mg.vue')
      },
      {
        path: 'idcs',
        name: 'cmdb_idcs',
        meta: {
            icon: 'ios-cube',
            title: 'IDC管理'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'oper_audit',
        name: 'cmdb_oper_audit',
        meta: {
          icon: 'md-build',
          title: '操作审计'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      }
    ]
  },
  // 任务管理
  {
    path: '/task',
    name: 'task',
    meta: {
      icon: 'ios-bowtie',
      title: '任务管理',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'task_list',
        meta: {
          icon: 'ios-bowtie',
          title: '任务列表'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'cron',
        name: 'task_cron',
        meta: {
          icon: 'ios-bowtie',
          title: '定时任务'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'log',
        name: 'task_log',
        meta: {
          icon: 'ios-bowtie',
          title: '任务日志'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      }
    ]
  },
  // opertools 运维工具
  {
    path: '/opertools',
    name: 'opertools',
    meta: {
      icon: 'ios-bowtie',
      title: '运维工具',
      showAlways: true
    },
    component: Main,
    children: [
      {
          path: 'mysql_audit',
          name: 'opertools_mysql_audit',
          meta: {
              icon: 'ios-help-circle',
              title: 'SQL审核'
          },
          component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'webssh',
        name: 'opertools_webssh',
        meta: {
          icon: 'ios-bowtie',
          title: 'WebSSH'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'remind',
        name: 'opertools_remind',
        meta: {
          icon: 'ios-bowtie',
          title: '提醒工具'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'fault',
        name: 'opertools_fault',
        meta: {
          icon: 'ios-bowtie',
          title: '故障管理'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'syslog',
        name: 'opertools_syslog',
        meta: {
          icon: 'ios-bowtie',
          title: '日志分析'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      }
    ]
  },
  // system系统管理
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'ios-bowtie',
      title: '系统中心',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'users',
        name: 'system_users',
        meta: {
          icon: 'ios-bowtie',
          title: '用户列表'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'roles',
        name: 'system_roles',
        meta: {
          icon: 'ios-bowtie',
          title: '角色列表'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'permissions',
        name: 'system_permissions',
        meta: {
          icon: 'ios-bowtie',
          title: '权限列表'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'config',
        name: 'system_config',
        meta: {
          icon: 'ios-bowtie',
          title: '系统配置'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'log',
        name: 'system_log',
        meta: {
          icon: 'ios-bowtie',
          title: '系统日志'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      }
    ]
  },
  // uc用户中心
  {
    path: '/uc',
    name: 'uc',
    meta: {
      icon: 'ios-bowtie',
      title: '用户中心',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'profile',
        name: 'uc_profile',
        meta: {
          icon: 'ios-bowtie',
          title: '个人信息'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'permissions',
        name: 'uc_permissions',
        meta: {
          icon: 'ios-bowtie',
          title: '我的权限'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'password',
        name: 'uc_password',
        meta: {
          icon: 'ios-bowtie',
          title: '密码信息'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      }
    ]
  },
  // login
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // 401
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  // 500
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  // 404
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  // message
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/study1',
    name: 'study1',
    meta: {
      hideInMenu: true
    },
    component: () => import ('@/view/study/first.vue')
  },
  {
    path: '/study2',
    name: 'study2',
    meta: {
      hideInMenu: true
    },
    component: () => import ('@/view/study/second.vue')
  },
]
