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
    name: '资产管理',
    meta: {
      icon: 'ios-cube',
      title: '资产管理',
      showAlays: true
    },
    component: Main,
    children: [{
      path: 'servers',
      name: '主机管理',
      meta: {
        icon: 'ios-cube',
        title: '主机管理',
        access: ['super_admin']
      },
      component: () =>
        import ('@/view/cmdb2/server_mg.vue')
      },
      {
        path: 'idcs',
        name: 'IDC管理',
        meta: {
            icon: 'ios-cube',
            title: 'IDC管理'
        },
        component: () =>
            import ('@/view/cmdb2/asset_idc.vue')
      },
      {
        path: 'oper_audit',
        name: '操作审计',
        meta: {
          icon: 'md-build',
          title: '操作审计'
        },
        component: () =>
          import ('@/view/cmdb2/operational_audit.vue')
      }
    ]
  },
  // 任务管理
  {
    path: '/task',
    name: '任务管理', // 一级目录
    meta: {
      icon: 'ios-bowtie',
      title: '任务管理',
      showAlways: true
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
        path: 'list',
        name: '任务列表', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '任务列表'
        },
        component: () => import('@/view/cron/command-list.vue') // 这引入的是页面单文件
      },
      {
        path: 'cron',
        name: '定时任务', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '定时任务'
        },
        component: () => import('@/view/cron/cron-jobs.vue') // 这引入的是页面单文件
      },
      {
        path: 'log',
        name: '任务日志', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '任务日志'
        },
        component: () => import('@/view/cron/cron-logs.vue') // 这引入的是页面单文件
      }
    ]
  },
  // opertools 运维工具
  {
    path: '/opertools',
    name: '运维工具', // 一级目录
    meta: {
      icon: 'ios-bowtie',
      title: '运维工具',
      showAlways: true
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
          path: 'mysqlAudit',
          name: 'mysqlAudit',
          meta: {
              icon: 'ios-help-circle',
              title: 'SQL审核'
          },
          component: () =>
              import ('@/view/devops-tools/mysql-audit.vue')
      },
      {
        path: 'webssh',
        name: 'WebSSH', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: 'WebSSH'
        },
        component: () => import('@/view/devops-tools/webssh/web-ssh.vue') // 这引入的是页面单文件
      },
      {
        path: 'remind',
        name: '提醒工具', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '提醒工具'
        },
        component: () => import('@/view/devops-tools/remind-manager.vue') // 这引入的是页面单文件
      },
      {
        path: 'fault',
        name: '故障管理', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '故障管理'
        },
        component: () => import('@/view/devops-tools/fault-manager.vue') // 这引入的是页面单文件
      },
      {
        path: 'syslog',
        name: '日志分析', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '日志分析'
        },
        component: () => import('@/view/multilevel/level-2-1.vue') // 这引入的是页面单文件
      }
    ]
  },
  // system
  {
    path: '/system',
    name: '系统中心', // 一级目录
    meta: {
      icon: 'ios-bowtie',
      title: '系统中心',
      showAlways: true
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
        path: 'users',
        name: '用户列表', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '用户列表'
        },
        component: () => import('@/view/multilevel/level-2-1.vue') // 这引入的是页面单文件
      },
      {
        path: 'roles',
        name: '角色列表', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '角色列表'
        },
        component: () => import('@/view/multilevel/level-2-1.vue') // 这引入的是页面单文件
      },
      {
        path: 'permissions',
        name: '权限列表', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '权限列表'
        },
        component: () => import('@/view/multilevel/level-2-1.vue') // 这引入的是页面单文件
      },
      {
        path: 'config',
        name: '系统配置', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '系统配置'
        },
        component: () => import('@/view/system-manage/system.vue') // 这引入的是页面单文件
      },
      {
        path: 'log',
        name: '系统日志', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '系统日志'
        },
        component: () => import('@/view/system-manage/systemlog.vue') // 这引入的是页面单文件
      }
    ]
  },
  // uc 用户中心
  {
    path: '/uc',
    name: '用户中心', // 一级目录
    meta: {
      icon: 'ios-bowtie',
      title: '用户中心',
      showAlways: true
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
        path: 'profile',
        name: '个人信息', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '个人信息'
        },
        component: () => import('@/view/multilevel/level-2-1.vue') // 这引入的是页面单文件
      },
      {
        path: 'permissions',
        name: '我的权限', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '我的权限'
        },
        component: () => import('@/view/multilevel/level-2-1.vue') // 这引入的是页面单文件
      },
      {
        path: 'password',
        name: '密码信息', // 一级目录下的二级页面
        meta: {
          icon: 'ios-bowtie',
          title: '密码信息'
        },
        component: () => import('@/view/multilevel/level-2-1.vue') // 这引入的是页面单文件
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
  }
]
