<template>
  <el-dialog class="dialog-common" :title="!roleId ? '新增' : '编辑'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="授权菜单" prop="menuIds">
        <el-tree ref="menuListTree" :data="menuListLevel" :props="menuListTreeProps" node-key="mid" :default-expand-all="false" show-checkbox
          @check-change="treeCheckChange"></el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  updateRole,
  insertRole,
  getRoleInfo,
  getMenuList,
} from '@/apis/system.js';
import { treeDataTranslate } from '@/scripts/treeUtils';
import {
  menuIds,
} from '@/scripts/pattern';

export default {
  data() {
    return {
      visible: false,
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      roleId: null,
      dataForm: {
        roleId: null,
        roleName: null,
        menuIds: [],
        remark: null,
      },
      menuIds: [],
      tempKey: '-6666666', // 用于解决tree半选中状态项不能传给后台接口问题，解决思路：全选值和半选值中间加上tempKey，等到渲染的时候先把tempKey和半选的值都去掉 # 待优化
      rules: {
        roleId: [
          { required: true, message: '权限ID不能为空', },
          { max: 20, message: '权限ID不能超过20个字符', },
        ],
        roleName: [
          { required: true, message: '权限名称不能为空', },
          { max: 40, message: '权限名称不能超过40个字符', },
        ],
        menuIds: [
          { required: true, message: '请勾选授权菜单', },
          { pattern: menuIds, message: '请勾选授权菜单', },
        ],
        remark: [
          { max: 100, message: '备注不能超过100个字符', },
        ],
      }
    };
  },
  computed: {
    menuListLevel() {
      return treeDataTranslate(this.menuList, 'mid');
    }
  },
  methods: {
    init(roleId) {
      this.visible = true;
      this.roleId = roleId;
      this.getMenuList();
      this.$nextTick(async () => {
        this.$refs.menuListTree.setCheckedKeys([]);
        if (roleId) {
          const data = await getRoleInfo({
            roleId,
          });
          if (!this.isEmptyObject(data)) {
            this.dataForm = { ...data };
            this.menuIds = this.dataForm.menuIds.split(',');
            var idx = this.menuIds.indexOf(this.tempKey);
            if (idx !== -1) {
              this.menuIds.splice(idx, this.menuIds.length - idx);
            }
            this.$refs.menuListTree.setCheckedKeys(this.menuIds);
          } else {
            this.visible = true;
          }
        }
      });
    },
    // 获取菜单列表
    async getMenuList() {
      const menuList = await getMenuList();
      this.menuList = menuList.map(item => {
        return { ...item };
      });
    },
    // Tree组件节点选中状态发生变化
    treeCheckChange() {
      this.menuIds = [].concat(
        this.$refs.menuListTree.getCheckedKeys(),
        [this.tempKey],
        this.$refs.menuListTree.getHalfCheckedKeys()
      );
      this.$set(this.dataForm, 'menuIds', this.menuIds.join(','));
    },
    // 表单提交
    dataFormSubmit() {
      if (this.ajaxLoading) {
        return false;
      }
      this.ajaxLoading = true;
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          let data;
          if (this.roleId) {
            data = await updateRole(this.dataForm);
          } else {
            data = await insertRole(this.dataForm);
          }
          this.ajaxLoading = false;
          if (data) {
            this.visible = false;
            this.$emit('refreshDataList');
            this.$messageCallback('success', '操作成功');
          }
        } else {
          return false;
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.mod-role {
  .role-list__input {
    > .el-input__inner {
      cursor: pointer;
    }
  }
}
</style>
