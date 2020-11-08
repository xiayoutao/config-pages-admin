<template>
  <div class="app-page mod-bless">
    <el-table :data="dataList" border v-loading="dataListLoading" :empty-text="this.$store.state.common.tableEmptyText" style="width: 100%;">
      <el-table-column header-align="center" align="center" label="用户昵称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row['user.nickname'] }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="用户头像" show-overflow-tooltip>
        <template slot-scope="scope">
          <img width="30" height="30" v-imgurl="$store.state.common.imageServer + scope.row['user.avatar']">
        </template>
      </el-table-column>
      <el-table-column prop="addtime" header-align="center" align="center" width="300" label="祝福时间">
        <template slot-scope="scope">{{ formatDate(scope.row.addtime) }}</template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="$store.state.common.paginationOptions.pageSizes" :page-size="$store.state.common.paginationOptions.pageSize" :total="totalPage" :layout="$store.state.common.paginationOptions.layout"></el-pagination>
  </div>
</template>

<script>
import {
  getBlessList,
} from '@/apis/love';

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
      const data = await getBlessList({
        page: this.pageIndex,
        limit: this.pageSize,
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
    }
  }
};
</script>
