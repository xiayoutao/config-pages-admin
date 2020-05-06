<template>
  <div class="app-page mod-pages">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
      <el-form-item>
        <el-select v-model="dataForm.userid" placeholder="操作用户" clearable style="width: 160px;">
          <el-option v-for="(item, index) in userList" :key="index" :value="item.userid" :label="item.nickname"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList(true)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" :empty-text="this.$store.state.common.tableEmptyText">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column
        v-for="(item, index) in headData"
        :key="index"
        :prop="item.key"
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
          <el-button v-permisson="permisson.pagesShow" type="text" size="small" @click="showHandle(scope.row.uuid)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="$store.state.common.paginationOptions.pageSizes" :page-size="$store.state.common.paginationOptions.pageSize" :total="totalPage" :layout="$store.state.common.paginationOptions.layout">
    </el-pagination>
    <pages-show ref="pagesShow" v-if="pagesShowVisible" @close="addOrUpdateVisible = false"></pages-show>
  </div>
</template>

<script>
import { getAllUser } from '@/apis/sys/user.js';
import { getPageList, deletePage } from '@/apis/sys/pages.js';
import { compList } from '@/data/components.js';
import PagesShow from './pages-show.vue';

export default {
  data () {
    let _this = this;
    return {
      dataForm: {
        userid: null
      },
      headData: [
        { key: 'id', label: 'ID', width: 80, headerAlign: 'center', align: 'center', },
        {
          key: 'userid',
          label: '用户',
          width: 180,
          headerAlign: 'center',
          align: 'center',
          render (data) {
            return _this.userObject[data];
          }
        },
        {
          key: 'layouts',
          label: '组件',
          headerAlign: 'center',
          align: 'center',
          render (data) {
            let compUse = {};
            const layouts = JSON.parse(data);
            layouts.forEach(item => {
              if (compUse[item.label] > 0) {
                compUse[item.label] = compUse[item.label] + 1;
              } else {
                compUse[item.label] = 1;
              }
            });
            let strCompUse = '';
            Object.keys(compUse).forEach((item, index) => {
              strCompUse += (index === 0 ? '' : '、') + item + ' * ' + compUse[item];
            });
            return strCompUse;
          }
        },
      ],
      dataList: [],
      pageIndex: 1,
      totalPage: 0,
      dataListLoading: false,
      userList: [],
      pagesShowVisible: false,
    };
  },
  computed: {
    userObject () {
      let obj = {};
      this.userList.forEach(item => {
        obj[item.userid] = item.nickname;
      });
      return obj;
    },
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
      const data = await getPageList({
        page: this.pageIndex,
        limit: this.pageSize,
        userid: this.dataForm.userid
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
    showHandle (uuid) {
      this.pagesShowVisible = true;
      this.$nextTick(() => {
        this.$refs.pagesShow.init(uuid);
      });
    }
  },
  components: {
    PagesShow,
  }
};
</script>
