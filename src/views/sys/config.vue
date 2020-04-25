<template>
  <div class="app-page mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
      <el-form-item>
        <el-input v-model="dataForm.paramKey" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList(true)">查询</el-button>
        <el-button v-permisson="permisson.configAdd" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-permisson="permisson.configDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="this.$store.state.common.tableEmptyText">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column
        v-for="(item, index) in headData"
        :key="index" :prop="item.key"
        :width="item.width"
        :label="item.label"
        :header-align="item.headerAlign"
        :align="item.align">
      </el-table-column>
      <el-table-column header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button v-permisson="permisson.configUpdate" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
          <el-button v-permisson="permisson.configDelete" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="$store.state.common.paginationOptions.pageSizes" :page-size="$store.state.common.paginationOptions.pageSize" :total="totalPage" :layout="$store.state.common.paginationOptions.layout">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update ref="addOrUpdate" v-if="addOrUpdateVisible" @close="addOrUpdateVisible = false" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import Config from '@/models/sys/config';
import AddOrUpdate from './config-add-or-update';
export default {
  data () {
    return {
      dataForm: {
        paramKey: ''
      },
      headData: [
        { key: 'id', label: 'ID', width: 80, headerAlign: 'center', align: 'center' },
        { key: 'paramKey', label: '参数名', headerAlign: 'center', align: 'center' },
        { key: 'paramValue', label: '参数值', headerAlign: 'center', align: 'center' },
        { key: 'remark', label: '备注', headerAlign: 'center', align: 'center' },
      ],
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
      let configModel = new Config();
      configModel
        .list({
          page: this.pageIndex,
          limit: this.pageSize,
          paramKey: this.dataForm.paramKey
        })
        .then(({ data }) => {
          let resultData = this.$httpResponseHandle(data);
          if (resultData) {
            this.dataList = resultData.list;
            this.totalPage = resultData.totalCount;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
          this.dataListLoading = false;
        });
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
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle (id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        let configModel = new Config();
        configModel.delete(ids).then(({ data }) => {
          let resultData = this.$httpResponseHandle(data);
          if (resultData) {
            this.$messageCallback('success', '操作成功', () => {
              this.getDataList();
            });
          }
        });
      });
    }
  },
  components: {
    AddOrUpdate
  }
};
</script>
