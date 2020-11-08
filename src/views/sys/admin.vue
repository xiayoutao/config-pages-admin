<template>
  <div class="app-page mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
      <el-form-item>
        <el-input v-model="dataForm.userid" placeholder="用户名" clearable>
          <el-button slot="append" icon="el-icon-search" @click="getDataList(true)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-permisson="permisson.adminAdd" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-permisson="permisson.adminDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="this.$store.state.common.tableEmptyText">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column v-for="(item, index) in headData" :key="index" :prop="item.key" :width="item.width" :label="item.label" :header-align="item.headerAlign" :align="item.align">
        <template slot-scope="scope">
          <template v-if="item.key === 'flag'">
            <el-tag v-if="scope.row.flag === adminFlags.enabled" size="small">正常</el-tag>
            <el-tag v-if="scope.row.flag === adminFlags.disabled" size="small" type="danger">禁用</el-tag>
          </template>
          <template v-else>
            <span v-if="item.render">{{ item.render(scope.row[item.key]) }}</span>
            <span v-else>{{ scope.row[item.key] }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" width="180" label="操作">
        <template slot-scope="scope">
          <el-button v-permisson="permisson.adminUpdate" type="text" size="small" @click="addOrUpdateHandle(scope.row.userid)">编辑</el-button>
          <el-button v-permisson="permisson.adminPwd" type="text" size="small" @click="updatePwdHandle(scope.row.userid)">修改密码</el-button>
          <el-button v-permisson="permisson.adminDelete" type="text" size="small" @click="deleteHandle(scope.row.userid)">删除</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update ref="addOrUpdate" v-if="addOrUpdateVisible" @close="addOrUpdateVisible = false" @refreshDataList="getDataList"></add-or-update>
    <!-- 弹窗, 修改密码 -->
    <update-pwd ref="updatePwd" v-if="updatePwdVisible" @close="updatePwdVisible = false"></update-pwd>
  </div>
</template>

<script>
import listPageMixin from '@/mixins/listPage';
import {
  getAdminList,
  deleteAdmin,
} from '@/apis/system';
import {
  adminFlags,
} from '@/constants';
import AddOrUpdate from './admin-add-or-update';
import UpdatePwd from './admin-update-pwd';

export default {
  mixins: [
    listPageMixin,
  ],
  components: {
    AddOrUpdate,
    UpdatePwd
  },
  data () {
    let _this = this;
    return {
      adminFlags,
      dataForm: {
        userid: null
      },
      headData: [
        {
          key: 'userid',
          label: '用户名',
          headerAlign: 'center',
          align: 'center'
        },
        {
          key: 'nickname',
          label: '昵称',
          headerAlign: 'center',
          align: 'center'
        },
        {
          key: 'mobile',
          label: '手机号',
          headerAlign: 'center',
          align: 'center'
        },
        {
          key: 'flag',
          label: '状态',
          headerAlign: 'center',
          align: 'center'
        },
        {
          key: 'role.roleName',
          label: '角色',
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
      dataListLoading: false, // 是否显示数据正在加载中
      addOrUpdateVisible: false, // 添加或修改弹窗显示状态
      updatePwdVisible: false, // 修改密码弹窗显示状态
    };
  },
  activated () {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    async getDataList () {
      const data = await getAdminList({
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
    // 修改密码
    updatePwdHandle (userid) {
      this.updatePwdVisible = true;
      this.$nextTick(() => {
        this.$refs.updatePwd.init(userid);
      });
    },
    // 新增 / 修改
    addOrUpdateHandle (userid) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(userid);
      });
    },
    // 删除
    deleteHandle (userid) {
      var userIds = userid
        ? [userid]
        : this.dataListSelections.map(item => {
            return item.userid;
          });
      this.$confirm(
        `确定对[用户名为${userIds.join(',')}]进行[${
          userid ? '删除' : '批量删除'
        }]操作?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        const data = await deleteAdmin({
          userid: userIds,
        });
        if (!this.isEmptyObject(data)) {
          this.$messageCallback('success', '操作成功', () => {
            this.getDataList();
          });
        }
      });
    }
  },
};
</script>
