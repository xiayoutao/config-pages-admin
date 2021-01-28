<template>
  <div class="app-page mod-menu">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button v-permisson="permisson.menuAdd" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="dataListLoading" :data="dataList" row-key="mid" border :empty-text="$store.state.common.tableEmptyText">
      <el-table-column header-align="center" align="center" width="60" label="#"></el-table-column>
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="icon" label="图标">
        <template slot-scope="scope">
          <span :class="$iconfont + scope.row.icon" style="margin-right:0;"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === menuTypes.catalog" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === menuTypes.menu" size="small" type="success">菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sort" label="排序号"></el-table-column>
      <el-table-column align="center" prop="path" label="菜单URL"></el-table-column>
      <el-table-column align="center" prop="perms" label="授权标识" show-overflow-tooltip></el-table-column>
      <el-table-column header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button v-permisson="permisson.menuUpdate" type="text" size="small" @click="addOrUpdateHandle(scope.row.mid)">编辑</el-button>
          <el-button v-permisson="permisson.menuDelete" type="text" size="small" @click="deleteHandle(scope.row.mid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update ref="addOrUpdate" v-if="addOrUpdateVisible" @close="addOrUpdateVisible = false" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import {
  getMenuList,
  deleteMenu,
} from '@/apis/system';
import {
  menuTypes,
} from '@/constants';
import { treeDataTranslate } from '@/common/treeUtils';
import AddOrUpdate from './menu-add-or-update';

export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      menuTypes,
      dataForm: {},
      dataList: [],
      dataListLoading: true,
      addOrUpdateVisible: false
    };
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    async getDataList() {
      this.dataListLoading = true;
      const data = await getMenuList();
      this.dataListLoading = false;
      if (!this.isEmptyObject(data)) {
        this.dataList = treeDataTranslate(data, 'mid');
      }
    },
    // 新增 / 修改
    addOrUpdateHandle(mid) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(mid);
      });
    },
    // 删除
    deleteHandle(mid) {
      this.$confirm(`确定对[id=${mid}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = await deleteMenu({
          mid,
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
