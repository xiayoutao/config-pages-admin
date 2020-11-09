<template>
<div class="app-page mod-role">
  <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
    <el-form-item>
      <el-input v-model="dataForm.roleName" placeholder="角色名称" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="getDataList(true)">查询</el-button>
      <el-button v-permisson="permisson.roleAdd" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      <el-button v-permisson="permisson.roleDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="tableEmptyText">
    <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
    <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
    <el-table-column align="center" prop="remark" label="备注"></el-table-column>
    <el-table-column align="center" prop="addtime" label="创建时间">
      <template slot-scope="scope">{{ formatDate(scope.row.addtime, 'yyyy-MM-dd hh:mm:ss') }}</template>
    </el-table-column>
    <el-table-column header-align="center" align="center" width="150" label="操作">
      <template slot-scope="scope">
        <el-button v-permisson="permisson.roleUpdate" type="text" size="small" @click="addOrUpdateHandle(scope.row.roleId)">修改</el-button>
        <el-button v-permisson="permisson.roleDelete" type="text" size="small" @click="deleteHandle(scope.row.roleId)">删除</el-button>
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
</div>
</template>

<script>
import listPageMixin from '@/mixins/listPage';
import {
  getRoleList,
  deleteRole,
} from '@/apis/system.js';
import AddOrUpdate from './role-add-or-update';

export default {
  mixins: [
    listPageMixin,
  ],
  components: {
    AddOrUpdate
  },
  data () {
    return {
      dataForm: {
        roleName: '',
      },
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
    async getDataList (isSearch) {
      this.dataListLoading = true;
      if (isSearch) {
        this.pageIndex = 1;
      }
      const data = await getRoleList({
        page: this.pageIndex,
        limit: this.pageSize,
        roleName: this.dataForm.roleName
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
    // 新增 / 修改
    addOrUpdateHandle (roleId) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(roleId);
      });
    },
    // 删除
    deleteHandle (id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.roleId;
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
        const data = await deleteRole({
          roleId: ids,
        });
        if (data) {
          this.$messageCallback('success', '操作成功', () => {
            this.getDataList();
          });
        }
      });
    }
  },
};
</script>
