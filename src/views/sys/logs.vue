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
  <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="tableEmptyText">
    <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
    <el-table-column align="center" prop="category" label="操作栏目"></el-table-column>
    <el-table-column align="center" prop="type" label="操作类型"></el-table-column>
    <el-table-column align="center" prop="user" label="操作用户"></el-table-column>
    <el-table-column align="center" prop="logtime" label="操作时间">
      <template slot-scope="scope">{{ formatDate(scope.row.logtime, 'yyyy-MM-dd hh:mm:ss') }}</template>
    </el-table-column>
    <el-table-column header-align="center" align="center" width="150" label="操作">
      <template slot-scope="scope">
        <el-button v-permisson="permisson.logsShow" type="text" size="small" @click="showHandle(scope.row.id)">查看</el-button>
        <el-button v-permisson="permisson.logsDelete" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :background="paginationBg"
    :page-size="pageSize"
    :layout="paginationLayout"
    :current-page="pageIndex"
    :page-sizes="paginationPageSizes"
    :total="totalPage"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle">
  </el-pagination>
</div>
</template>

<script>
import listPageMixin from '@/mixins/listPage';
import {
  getAllAdmin,
  getLogsList,
  deleteLogs,
} from '@/apis/system';
import {
  logsResults,
} from '@/constants';

export default {
  mixins: [
    listPageMixin,
  ],
  data () {
    return {
      dataForm: {
        userid: null,
        category: null,
        result: null,
      },
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
    // 获取用户列表
    async getUserList () {
      const data = await getAllAdmin();
      if (!this.isEmptyObject(data)) {
        this.userList = [];
        data.forEach(item => {
          this.userList.push(item);
        });
      }
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
