<template>
<div class="app-page mod-config">
  <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
    <el-form-item>
      <el-input v-model="dataForm.paramKey" placeholder="参数名" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="getDataList(true)">查询</el-button>
      <el-button v-permisson="permisson.configAdd" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      <el-button v-permisson="permisson.configDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="tableEmptyText">
    <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
    <el-table-column align="center" prop="paramKey" label="参数名"></el-table-column>
    <el-table-column align="center" prop="paramValue" label="参数值"></el-table-column>
    <el-table-column align="center" prop="remark" label="备注"></el-table-column>
    <el-table-column header-align="center" align="center" width="150" label="操作">
      <template slot-scope="scope">
        <el-button v-permisson="permisson.configUpdate" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
        <el-button v-permisson="permisson.configDelete" type="text" class="btn-danger" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
  getConfigList,
  deleteConfig,
} from '@/apis/system';
import AddOrUpdate from './config-add-or-update';

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
        paramKey: ''
      },
      dataList: [],
      dataListLoading: false,
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
      const data = await getConfigList({
        page: this.pageIndex,
        limit: this.pageSize,
        paramKey: this.dataForm.paramKey,
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
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
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
        const data = await deleteConfig({
          ids,
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
