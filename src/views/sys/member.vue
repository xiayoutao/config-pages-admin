<template>
  <div class="app-page mod-member">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
      <el-form-item>
        <el-input v-model="dataForm.nickname" placeholder="昵称" clearable>
          <el-button slot="append" icon="el-icon-search" @click="getDataList(true)"></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" :empty-text="tableEmptyText">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column align="center" prop="nickname" label="昵称" min-width="150"></el-table-column>
      <el-table-column align="center" prop="avatar" label="头像">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]" style="width: 32px; height: 32px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="gender" label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.gender === 1">男</span>
          <span v-else-if="scope.row.gender === 2">女</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
      <el-table-column align="center" prop="regtime" label="注册时间" min-width="160">
        <template slot-scope="scope">{{ formatDate(scope.row.regtime, 'yyyy-MM-dd hh:mm:ss') }}</template>
      </el-table-column>
      <el-table-column align="center" prop="updateTime" label="最后更新时间" min-width="160">
        <template slot-scope="scope">{{ formatDate(scope.row.updateTime, 'yyyy-MM-dd hh:mm:ss') }}</template>
      </el-table-column>
      <el-table-column header-align="center" align="center" width="180" label="操作">
        <template slot-scope="scope">
          <el-button v-permisson="permisson.userShow" type="text" size="small" @click="showHandle(scope.row.openid)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :background="paginationBg" :page-size="pageSize" :layout="paginationLayout" :current-page="pageIndex"
      :page-sizes="paginationPageSizes" :total="totalPage" @size-change="sizeChangeHandle" @current-change="currentChangeHandle">
    </el-pagination>
    <!-- 弹窗, 查看 -->
    <member-detail ref="memberDetail" v-if="memberDetailVisible" @close="memberDetailVisible = false"></member-detail>
  </div>
</template>

<script>
import listPageMixin from '@/mixins/listPage';
import { getUserList } from '@/apis/user';
import MemberDetail from './member-detail.vue';

export default {
  mixins: [
    listPageMixin,
  ],
  components: {
    MemberDetail,
  },
  data() {
    return {
      dataForm: {
        nickname: null
      },
      dataList: [], // 数据列表
      pageIndex: 1, // 当前页
      totalPage: 0, // 总数
      dataListLoading: false, // 是否显示数据正在加载中
      memberDetailVisible: false, // 查看用户信息弹框
    };
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    async getDataList() {
      this.dataList = [];
      const data = await getUserList({
        page: this.pageIndex,
        limit: this.pageSize,
        nickname: this.dataForm.nickname,
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
    // 查看
    showHandle(openid) {
      this.memberDetailVisible = true;
      this.$nextTick(() => {
        this.$refs.memberDetail.init(openid);
      });
    },
  },
};
</script>
