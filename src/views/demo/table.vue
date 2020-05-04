<template>
  <div class="app-page">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="warning" @click="exportHandle()" :disabled="dataListSelections.length <= 0">导出数据</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="this.$store.state.common.tableEmptyText">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="username" header-align="center" align="center" label="姓名">
      </el-table-column>
      <el-table-column prop="sex" header-align="center" align="center" label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.sex === sexs.man">男</span>
          <span v-else-if="scope.row.sex === sexs.woman">女</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" header-align="center" align="center" label="年龄">
        <template slot-scope="scope">
          {{ scope.row.age + '岁' }}
        </template>
      </el-table-column>
      <el-table-column prop="city" header-align="center" align="center" label="城市">
      </el-table-column>
      <el-table-column header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="$store.state.common.paginationOptions.pageSizes" :page-size="$store.state.common.paginationOptions.pageSize" :total="totalPage" :layout="$store.state.common.paginationOptions.layout">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        paramKey: ''
      },
      dataList: [],
      pageIndex: 1,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  activated () {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList (isSearch) {
      this.dataListLoading = true;
      if (isSearch) {
        this.pageIndex = 1;
      }
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 导出数据
    exportHandle () {
      // let tableModel = new Table();
      // tableModel.xlsx(this.dataListSelections).then(({ data, headers }) => {
      //   console.log(headers);
      //   // let resultData = this.$httpResponseHandle(data);
      //   let contentType = headers['content-type'];
      //   const blob = new Blob([data], {
      //     type:
      //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
      //   });
      // });
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val;
    },
    // 删除
    deleteHandle (id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对 ${ids.length > 1 ? '选中的项' : 'id=' + ids.join(',')} 进行[${
          id ? '删除' : '批量删除'
        }]操作?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$messageCallback('success', '操作成功', () => {
          this.getDataList();
        });
      });
    }
  },
};
</script>
