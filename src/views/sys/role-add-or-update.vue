<template>
  <el-dialog class="dialog-common" :title="!roleId ? '新增' : '编辑'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" label-width="80px" :show-message="validateShowMessage" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="角色名称" prop="roleName" :error="validateErrors.roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :error="validateErrors.remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="授权菜单" prop="menuIds" :error="validateErrors.menuIds" size="mini">
        <el-tree ref="menuListTree" :data="menuListLevel" :props="menuListTreeProps" node-key="mid" :default-expand-all="false" show-checkbox @check-change="treeCheckChange"></el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="ajaxLoading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Menu from '@/models/sys/menu';
import Role from '@/models/sys/role';
import { treeDataTranslate } from '@/scripts/treeUtils';
import Validate from '@/mixins/validate';

export default {
  mixins: [Validate],
  data () {
    return {
      visible: false,
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      roleId: null,
      dataForm: {},
      menuIds: [],
      tempKey: '-666666' // 用于解决tree半选中状态项不能传给后台接口问题，解决思路：全选值和半选值中间加上tempKey，等到渲染的时候先把tempKey和半选的值都去掉 # 待优化
    };
  },
  computed: {
    menuListLevel () {
      return treeDataTranslate(this.menuList, 'mid');
    }
  },
  methods: {
    init (roleId) {
      this.visible = true;
      this.roleId = roleId;
      this.dataForm = {};
      this.getMenuList();
      this.$set(this.dataForm, 'roleId', roleId || null);
      this.$nextTick(() => {
        this.$refs.menuListTree.setCheckedKeys([]);
        let roleModel = new Role();
        if (roleId) {
          roleModel.info(roleId).then(({ data }) => {
            let resultData = this.$httpResponseHandle(data);
            if (resultData) {
              // let dataForm = data.toData();
              this.initData(resultData);
              var idx = this.menuIds.indexOf(this.tempKey);
              if (idx !== -1) {
                this.menuIds.splice(idx, this.menuIds.length - idx);
              }
              this.$refs.menuListTree.setCheckedKeys(this.menuIds);
            }
          });
        } else {
          let dataForm = roleModel.toData();
          this.initData(dataForm);
        }
      });
    },
    // 设置dataForm对象属性
    initData (dataForm) {
      let keys = Object.keys(dataForm);
      keys.forEach(item => {
        if (item === 'menuIds') {
          this.menuIds = dataForm[item].split(',');
        }
        this.$set(this.dataForm, item, dataForm[item]);
      });
    },
    // 获取菜单列表
    getMenuList () {
      let menuModel = new Menu();
      // 0图片，1音频，2视频
      menuModel.list().then(({ data }) => {
        let resultData = this.$httpResponseHandle(data);
        if (resultData) {
          this.menuList = [];
          resultData.forEach(item => {
            this.menuList.push(item);
          });
        }
      });
    },
    // Tree组件节点选中状态发生变化
    treeCheckChange () {
      this.menuIds = [].concat(
        this.$refs.menuListTree.getCheckedKeys(),
        [this.tempKey],
        this.$refs.menuListTree.getHalfCheckedKeys()
      );
      this.$set(this.dataForm, 'menuIds', this.menuIds.join(','));
    },
    // 表单提交
    dataFormSubmit () {
      this.treeCheckChange(); // 勾选的菜单发生变化，设置dataForm.menuIds
      this.$nextTick(() => {
        this.validateShowMessage = true; // 因为treeCheckChange方法的原因，这里需要在$nextTick里执行，否则会校验两次数据
        this.validateForm(FormDataModel => {
          FormDataModel.save().then(({ data }) => {
            let resultData = this.$httpResponseHandle(data);
            if (resultData) {
              this.$messageCallback('success', '操作成功');
              this.$emit('refreshDataList');
              this.visible = false;
            }
          });
        });
      });
    },
    /**
     * 校验表单数据
     * @param {function} success 验证成功执行的方法
     */
    validateForm (success) {
      let FormDataModel = new Role(this.dataForm);
      FormDataModel.validate(['roleName', 'menuIds', 'remark'])
        .then(() => {
          this.$validateFormMsg.call(this, this.$refs.dataForm.fields);
          success && success(FormDataModel);
        })
        .catch(errors => {
          console.log('验证失败', errors);
          this.$validateFormMsg.call(this, this.$refs.dataForm.fields, errors);
        });
    }
  }
};
</script>

<style lang="scss">
.mod-role {
  .role-list__input {
    > .el-input__inner {
      cursor: pointer;
    }
  }
}
</style>
