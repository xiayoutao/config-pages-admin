<template>
  <div class="app-page mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
      <el-form-item>
        <el-select v-model="dataForm.category" placeholder="操作栏目" clearable style="width: 160px;"></el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.userid" placeholder="操作用户" clearable style="width: 160px;">
          <el-option v-for="(item, index) in userList" :key="index" :value="item.userid" :label="item.nickname"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.result" placeholder="操作结果" clearable style="width: 120px;">
          <el-option :value="logsResults.success" label="成功"></el-option>
          <el-option :value="logsResults.fail" label="失败"></el-option>
          <el-option :value="logsResults.error" label="错误"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList(true)">查询</el-button>
        <el-button v-permisson="permisson.logsDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
        <template slot-scope="scope">
          <span v-if="item.render">{{ item.render(scope.row[item.key]) }}</span>
          <span v-else>{{ scope.row[item.key] }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button v-permisson="permisson.logsShow" type="text" size="small" @click="showHandle(scope.row.id)">查看</el-button>
          <el-button v-permisson="permisson.logsDelete" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="$store.state.common.paginationOptions.pageSizes" :page-size="$store.state.common.paginationOptions.pageSize" :total="totalPage" :layout="$store.state.common.paginationOptions.layout">
    </el-pagination>
  </div>
</template>

<script>
import {
  logsResults,
  getLogsList,
  deleteLogs,
} from '@/apis/sys/logs.js';
import {
  getAllUser,
} from '@/apis/sys/user.js';

export default {
  data () {
    let _this = this;
    return {
      dataForm: {
        userid: null,
        category: null,
        result: null,
      },
      headData: [
        { key: 'category', label: '操作栏目', headerAlign: 'center', align: 'center' },
        { key: 'type', label: '操作类型', headerAlign: 'center', align: 'center' },
        { key: 'user', label: '操作用户', headerAlign: 'center', align: 'center' },
        {
          key: 'logtime',
          label: '操作时间',
          width: 150,
          headerAlign: 'center',
          align: 'center',
          render (data) {
            return _this.formatDate(data, 'yyyy-MM-dd hh:mm:ss');
          }
        },
      ],
      dataList: [],
      pageIndex: 1,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      userList: [],
      logsResults,
    };
  },
  activated () {
    this.getUserList();
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    async getDataList (isSearch) {
      this.dataListLoading = true;
      if (isSearch) {
        this.pageIndex = 1;
      }
      const data = await getLogsList({
        page: this.pageIndex,
        limit: this.pageSize,
        type: this.dataForm.type,
        level: this.dataForm.level,
        userid: this.dataForm.userid,
        category: this.dataForm.category,
        result: this.dataForm.result,
      });
      this.dataListLoading = false;
      if (!this.isEmptyObject(data)) {
        this.dataList = data.list;
        this.totalPage = data.totalCount;
      } else {
        this.dataList = [];
        this.totalPage = 0;
      }
    },
    // 获取菜单列表
    async getUserList () {
      const data = await getAllUser();
      if (!this.isEmptyObject(data)) {
        this.userList = [];
        data.forEach(item => {
          this.userList.push(item);
        });
      }
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
        `确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        const data = await deleteLogs({
          ids,
        });
        if (data) {
          this.$messageCallback('success', '操作成功', () => {
            this.getDataList();
          });
        }
      });
    },
    // 查看
    showHandle (id) {},
  }
};
</script>
