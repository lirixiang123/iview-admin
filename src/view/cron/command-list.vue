<template>
  <Card style="height:100%">
    <div class="search-con search-con-top">
      <Input class="search-input" v-model="searchValue" clearable :maxlength='50' placeholder="输入关键字搜索"/>

      <ButtonGroup class="search-btn">
        <Button @click="handlerExportData()"><Icon type="ios-download-outline"></Icon>导出数据</Button>
        <Button @click="editModal('', 'post', '新建任务')" >新建任务</Button>
      </ButtonGroup>
    </div>

    <Table size="small" ref="selection"  :columns="columns" :data="tableData"/>
   
   <div style="margin: 10px;overflow: hidden">
      <div style="float: left;">
        <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-total show-sizer :page-size-opts="[10,15,20,50,500,1000]"
            @on-change="changePage" @on-page-size-change="handlePageSize" />
      </div>
    </div>

    <Modal v-model="modalData.modalVisible"  :title="modalData.modalTitle" :loading=true :footer-hide=true width="660">
      <form-group :list="formList"  @on-submit-success="handleSubmit"></form-group>
    </Modal>

  </Card>
</template>

<script>
import FormGroup from '_c/form-group'
import { getCommandlist, operationCommand, runCommand } from '@/api/scheduler/scheduler-task'
export default {
  components: {
    FormGroup
  },
  data () {
    return {
      columns: [
        {
          title: '名称',
          key: 'task_name',
          align: 'left',
          minWidth: 120,
          maxWidth: 320,
          sortable: true,
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.editModal(params.index, 'put', '编辑命令')
                  }
                }
              },
              params.row.task_name
            );
          }
        },
        {
          title: '命令',
          key: 'task_command',
          align: 'left',
          minWidth: 300,
        },
        {
          title: '参数',
          key: 'task_args',
          align: 'left',
          sortable: true,
          minWidth: 220,
          
        },
        {
          title: '指定主机',
          key: 'task_host',
          width: 140,
          align: 'center',
        },
        {
          title: '操作',
          key: 'handle',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h("div",[
              h("Button",{
                props: {
                  type: "success",
                  size: "small"
                },
                style:{
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    // 运行命令
                    this.runCMD(params)
                  }
                }
              }, "运行"),
              h("Button",{
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editModal(params.index, "put", "更新命令");
                    }
                  }
                },
                "编辑"
              ),
              h("Button",{
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.delData(params);
                    }
                  }
                },
                "删除"
              )
            ])
          }
        }
      ],
      tableData: [],
      modalData: {
        modalVisible: false,
        modalTitle: '新建'
      },
      formList: [],
      editModalData: '',
      //
      pageTotal: 0, // 数据总数
      pageNum: 1, // 当前页码
      pageSize: 15, // 每页条数
      searchValue: '',
    }
  },
  methods: {
    handlerGetCommandList () {
      getCommandlist(this.searchValue).then(res => {
        if (res.data.status_code === 10000) {
          this.pageTotal = res.data.total
          this.tableData = res.data.data
        } else {
          this.$Message.error(`${res.data.msg}`)
        }
      })
    },
    editModal (index, meth, mtitle) {
      this.modalData.modalVisible = true
      this.modalData.modalTitle = mtitle
      this.editModalData = meth
      this.formList = [
        {
          name: 'command_id',
          value: meth === 'put' ? this.tableData[index].task_id : ''
        },
        {
          name: 'command_name',
          type: 'i-input',
          value: meth === 'put' ? this.tableData[index].task_name : '',
          label: '命令名称',
          placeholder: '请输入一个有意义的名称',
          rule: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
        },
        {
          name: 'command',
          type: 'i-input',
          maxlength: 220,
          value: meth === 'put' ? this.tableData[index].task_command : '',
          label: '执行命令',
          placeholder: '请输入可执行命令，通常为shell命令或者可执行文件脚本。',
          rule: [
            { required: true, message: '执行命令不能为空', trigger: 'blur' }
          ]
        },
        {
          name: 'args',
          type: 'i-input',
          maxlength: 220,
          value: meth === 'put' ? this.tableData[index].task_args : '',
          label: '命令参数',
          placeholder:
            '请输入参数，系统会自动匹配变量，如果无法匹配则返回自身。'
        },
        {
          name: 'force_host',
          type: 'i-input',
          value: meth === 'put' ? this.tableData[index].task_host : '',
          label: '强制主机',
          placeholder:
            '通常为空，如果存在，则系统在执行到当前命令的时候会强制在这一台主机执行'
        }
      ]
    },
    handleSubmit (value) {
      setTimeout(() => {
        operationCommand(value.data, this.editModalData).then(res => {
          if (res.data.status_code === 10000) {
            this.handlerGetCommandList()
            this.$Message.success(`${res.data.message}`)
            this.modalData.modalVisible = false
          } else {
            this.$Message.error(`${res.data.message}`)
          }
        })
      }, 1000)
    },
    // 运行命令
    runCMD(params){
      console.log(params)
      if (confirm(`确定要运行任务 ${params.row.task_name}`)) {
        // 调用运行命令的接口
        runCommand({task_id: params.row.task_id}).then(
          res => {
            if (res.data.status_code === 10000) {
              this.$Message.success(`${res.data.message}`)
            } else {
              this.$Message.error(`${res.data.message}`)
            }
          }
        )
      }
    },
    // 删除
    delData (params) {
      if (confirm(`确定要删除 ${params.row.task_name}`)) {
        operationCommand({ task_id: params.row.task_id }, 'delete').then(
          res => {
            if (res.data.status_code === 10000) {
              this.$Message.success(`${res.data.message}`)
              this.tableData.splice(params.index, 1)
            } else {
              this.$Message.error(`${res.data.message}`)
            }
          }
        )
      }
    },
     // 切换页码
    changePage(value){
      this.pageNum = value
      this.handlerGetServerList()
    },    
    handlePageSize(value){
       this.pageSize = value
       this.handlerGetServerList()
    }, 
     //导出数据
    handlerExportData(){
      let nowTime = Date.parse(new Date())
      this.$refs.selection.exportCsv({
          filename: `命令信息-${nowTime}`,
       });
    }
  },
  watch:{
    searchValue (val) {
      this.handlerGetCommandList()
    },
   },
  mounted () {
    this.handlerGetCommandList()
  }
}
</script>

<style lang="less" scoped>
  .search-con {
    padding: 5px 0;
    .search {
      &-col {
        display: inline-block;
        width: 200px;
      }
      &-input {
        display: inline-block;
        width: 350px;
        margin-left: 2px;
      }
      &-btn {
        margin-right: 0px;
        float:right;
      }
    }
  }
</style>
