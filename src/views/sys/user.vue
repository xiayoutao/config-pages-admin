<template>
  <div class="app-page mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
      <el-form-item>
        <el-input v-model="dataForm.nickname" placeholder="昵称" clearable>
          <el-button slot="append" icon="el-icon-search" @click="getDataList(true)"></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" :empty-text="this.$store.state.common.tableEmptyText">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column v-for="(item, index) in headData" :key="index" :prop="item.key" :width="item.width" :label="item.label" :header-align="item.headerAlign" :align="item.align">
        <template slot-scope="scope">
          <template v-if="item.key === 'avatar'">
            <img width="32" height="32" v-imgurl="item.render(scope.row[item.key])">
          </template>
          <template v-else>
            <span v-if="item.render">{{ item.render(scope.row[item.key]) }}</span>
            <span v-else>{{ scope.row[item.key] }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" width="180" label="操作">
        <template slot-scope="scope">
          <el-button v-permisson="permisson.userShow" type="text" size="small" @click="showHandle(scope.row.openid)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="$store.state.common.paginationOptions.pageSizes" :page-size="$store.state.common.paginationOptions.pageSize" :total="totalPage" :layout="$store.state.common.paginationOptions.layout">
    </el-pagination>
    <!-- 弹窗, 查看 -->
    <user-detail ref="userDetail" v-if="userDetailVisible" @close="userDetailVisible = false"></user-detail>
  </div>
</template>

<script>
import { getUserList } from '@/apis/sys/user.js';
import UserDetail from './user-detail.vue';

export default {
  data () {
    let _this = this;
    return {
      dataForm: {
        nickname: null
      },
      headData: [
        {
          key: 'nickname',
          label: '昵称',
          headerAlign: 'center',
          align: 'center'
        },
        {
          key: 'avatar',
          label: '头像',
          headerAlign: 'center',
          align: 'center',
          render (data) {
            if (data && data.indexOf('http') < 0) {
              return _this.$store.state.common.serverBaseUrl + data;
            }
            return data;
          }
        },
        {
          key: 'gender',
          label: '性别',
          headerAlign: 'center',
          align: 'center',
          render (data) {
            if (data === 1) {
              return '男';
            } else if (data === 0) {
              return '女';
            }
            return '--';
          }
        },
        {
          key: 'mobile',
          label: '手机号',
          headerAlign: 'center',
          align: 'center'
        },
        {
          key: 'regtime',
          label: '注册时间',
          headerAlign: 'center',
          align: 'center',
          width: 180,
          render (data) {
            return _this.formatDate(data, 'yyyy-MM-dd hh:mm:ss');
          }
        }
      ],
      dataList: [], // 数据列表
      pageIndex: 1, // 当前页
      totalPage: 0, // 总数
      dataListLoading: false, // 是否显示数据正在加载中
      userDetailVisible: false, // 查看用户信息弹框
    };
  },
  activated () {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    async getDataList () {
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
    // 查看
    showHandle (openid) {
      this.userDetailVisible = true;
      this.$nextTick(() => {
        this.$refs.userDetail.init(openid);
      });
    },
  },
  components: {
    UserDetail,
  }
};
</script>
