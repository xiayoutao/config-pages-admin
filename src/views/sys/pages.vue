<template>
<div class="app-page mod-pages">
  <!-- <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
    <el-form-item>
      <el-select v-model="dataForm.userid" placeholder="操作用户" clearable style="width: 160px;">
        <el-option v-for="(item, index) in userList" :key="index" :value="item.userid" :label="item.nickname + ' / ' + item.userid"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="getDataList(true)">查询</el-button>
    </el-form-item>
  </el-form> -->
  <el-table :data="dataList" border v-loading="dataListLoading" :empty-text="tableEmptyText">
    <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
    <el-table-column align="center" prop="userid" label="用户"></el-table-column>
    <el-table-column align="center" prop="layouts" label="组件">
      <template slot-scope="scope">{{ getLayouts(scope.row.layouts) }}</template>
    </el-table-column>
    <el-table-column header-align="center" align="center" width="150" label="操作">
      <template slot-scope="scope">
        <el-button v-permisson="permisson.pagesShow" type="text" class="btn-success" size="small" @click="showHandle(scope.row.uuid)">预览</el-button>
        <el-button v-permisson="permisson.pagesQRcode" type="text" class="btn-warning" size="small" @click="createQRcodeHandle(scope.row.uuid)">生成二维码</el-button>
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
  <pages-show ref="pagesShow" v-if="pagesShowVisible" @close="pagesShowVisible = false"></pages-show>
  <pages-qrcode ref="pagesQRcode" v-if="pagesQRcodeVisible" @close="pagesQRcodeVisible = false"></pages-qrcode>
</div>
</template>

<script>
import listPageMixin from '@/mixins/listPage';
import { getAllAdmin } from '@/apis/system';
import { getPageList, deletePage } from '@/apis/app';
import { compList } from '@/constants/components';
import PagesShow from './pages-show';
import PagesQrcode from './pages-qrcode';

export default {
  mixins: [
    listPageMixin,
  ],
  components: {
    PagesShow,
    PagesQrcode,
  },
  data () {
    return {
      dataForm: {
        userid: null
      },
      dataList: [],
      pageIndex: 1,
      totalPage: 0,
      dataListLoading: false,
      userList: [],
      pagesShowVisible: false,
      pagesQRcodeVisible: false,
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
    this.getAllAdmin();
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
    async getAllAdmin () {
      const data = await getAllAdmin();
      if (!this.isEmptyObject(data)) {
        this.userList = [];
        data.forEach(item => {
          this.userList.push(item);
        });
      }
    },
    showHandle (uuid) {
      this.pagesShowVisible = true;
      this.$nextTick(() => {
        this.$refs.pagesShow.init(uuid);
      });
    },
    createQRcodeHandle (uuid) {
      this.pagesQRcodeVisible = true;
      this.$nextTick(() => {
        this.$refs.pagesQRcode.init(uuid);
      });
    },
    getLayouts (dataList) {
      let compUse = {};
      const layouts = JSON.parse(dataList);
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
};
</script>
