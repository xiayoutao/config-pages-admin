<template>
  <div class="app-page mod-message">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button v-permisson="permisson.messageDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="this.$store.state.common.tableEmptyText" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column header-align="center" align="center" label="昵称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row['user.nickname'] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="msg" header-align="center" align="center" width="400" label="评论内容" show-overflow-tooltip></el-table-column>
      <el-table-column header-align="center" align="center" width="120" label="头像" show-overflow-tooltip>
        <template slot-scope="scope">
          <img width="30" height="30" v-imgurl="$store.state.common.imageServer + scope.row['user.avatar']">
        </template>
      </el-table-column>
      <el-table-column prop="addtime" header-align="center" align="center" width="200" label="留言时间">
        <template slot-scope="scope">{{ formatDate(scope.row.addtime) }}</template>
      </el-table-column>
      <el-table-column header-align="center" align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button v-permisson="permisson.messageDelete" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="$store.state.common.paginationOptions.pageSizes" :page-size="$store.state.common.paginationOptions.pageSize" :total="totalPage" :layout="$store.state.common.paginationOptions.layout"></el-pagination>
  </div>
</template>

<script>
import {
  getMsgList,
  deleteMsg,
} from '@/apis/love/message.js';

export default {
  data () {
    return {
      dataForm: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: []
    };
  },
  activated () {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    async getDataList () {
      this.dataListLoading = true;
      const data = await getMsgList({
        page: this.pageIndex,
        limit: this.pageSize
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
        const data = await deleteMsg({
          ids,
        });
        if (data) {
          this.$messageCallback('success', '操作成功', () => {
            this.getDataList();
          });
        } else {
          this.$messageCallback('error', '删除失败');
        }
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
    }
  }
};
</script>
