<template>
  <el-dialog class="dialog-common" :title="!mid ? '新增' : '编辑'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio-button :label="menuTypes.catalog">目录</el-radio-button>
          <el-radio-button :label="menuTypes.menu">菜单</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <el-popover ref="menuListPopover" v-model="parentPopoverVisible" placement="bottom-start" :visible-arrow="true" popper-class="popover-menulist-container">
          <el-tree :data="menuListLevel" :props="menuListTreeProps" ref="menuListTree" node-key="mid" @current-change="menuListTreeCurrentChangeHandle" :default-expand-all="false" :default-expanded-keys="[0]" :highlight-current="true" :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.pName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
      </el-form-item>
      <el-form-item label="菜单路由" prop="path" v-if="dataForm.type === menuTypes.menu">
        <el-input v-model="dataForm.path" placeholder="菜单路由"></el-input>
      </el-form-item>
      <el-form-item label="授权标识" prop="perms">
        <el-input v-model="dataForm.perms" placeholder="多个用逗号分隔, 如: user:list,user:create"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-popover ref="iconListPopover" v-model="iconPopoverVisible" trigger="click" width="360px" popper-class="mod-menu__icon-popover">
          <div class="mod-menu__icon-list">
            <el-button v-for="(item, index) in menuIcons" :key="index" @click="iconActiveHandle(item)" :class="{ 'is-active': item === dataForm.icon }">
              <span :class="$iconfont + item"></span>
            </el-button>
          </div>
        </el-popover>
        <el-input v-model="dataForm.icon" v-popover:iconListPopover placeholder="菜单图标名称" class="icon-list__input"></el-input>
        <el-button class="show-icon" v-if="dataForm.icon"><span :class="$iconfont + dataForm.icon"></span></el-button>
      </el-form-item>
      <el-form-item label="排序号" prop="sort">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序号"></el-input-number>
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
  getMenuList,
  getMenuInfo,
  insertMenu,
  updateMenu
} from '@/apis/system.js';
import {
  menuTypes,
} from '@/constants';
import {
  treeDataTranslate,
} from '@/scripts/treeUtils';
import Icons from '@/scripts/icons';
const menuIcons = Icons.getNameList();

export default {
  data () {
    const _this = this;
    const validatePid = (rule, value, callback) => {
      console.log(_this.dataForm.type, menuTypes.menu, value);
      if (_this.dataForm.type === menuTypes.menu) {
        if (!value) {
          callback(new Error('请选择父级菜单'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePName = (rule, value, callback) => {
      if (value.length > 12) {
        callback(new Error('菜单名称不能超过12个字符'));
      } else {
        callback();
      }
    };
    const validatePerms = (rule, value, callback) => {
      if (_this.dataForm.type === menuTypes.menu) {
        if (!value) {
          callback(new Error('权限标识不能为空'));
        } else if (value.length > 200) {
          callback(new Error('权限标识不能超过200个字符'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePath = (rule, value, callback) => {
      if (_this.dataForm.type === menuTypes.menu) {
        if (!value) {
          callback(new Error('菜单路径不能为空'));
        } else if (value.length > 100) {
          callback(new Error('菜单路径不能超过100个字符'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateType = (rule, value, callback) => {
      if (value !== menuTypes.catalog && value !== menuTypes.menu) {
        callback(new Error('菜单类型有误'));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      parentPopoverVisible: false,
      iconPopoverVisible: false,
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      mid: null,
      dataForm: {
        mid: null,
        name: null,
        pid: null,
        pName: null,
        path: null,
        perms: null,
        icon: null,
        sort: 50,
        type: menuTypes.menu,
      },
      rules: {
        mid: [
          { max: 40, message: '菜单ID不能超过40个字符',},
        ],
        name: [
          { required: true, message: '菜单名称不能为空', },
          { max: 12, message: '菜单名称不能超过12个字符', },
        ],
        pid: [
          { validator: validatePid, },
        ],
        pName: [
          { validator: validatePName, },
        ],
        path: [
          { validator: validatePath, },
        ],
        perms: [
          { validator: validatePerms, },
        ],
        icon: [
          { max: 45, message: '图标不能超过45个字符', },
        ],
        sort: [
          { type: 'number', min: 0, message: '排序号必须大于等于0', },
        ],
        type: [
          { required: true, message: '菜单类型不能为空', },
          { validator: validateType, },
        ],
      },
      menuTypes,
      menuIcons,
    };
  },
  computed: {
    menuListLevel () {
      return treeDataTranslate(this.menuList, 'mid');
    }
  },
  methods: {
    init (mid) {
      this.mid = mid;
      this.$set(this.dataForm, 'mid', mid || 0);
      this.getMenuList();
      this.visible = true;
      this.$nextTick(async () => {
        if (mid) {
          const data = await getMenuInfo({
            mid,
          });
          if (!this.isEmptyObject(data)) {
            this.dataForm = { ...data };
          } else {
            this.visible = true;
          }
        }
      });
    },
    // 获取菜单列表
    async getMenuList () {
      const data = await getMenuList();
      if (!this.isEmptyObject(data)) {
        this.menuList = [];
        data.forEach(item => {
          this.menuList.push(item);
        });
      }
    },
    // 菜单树选中
    menuListTreeCurrentChangeHandle (data, node) {
      this.dataForm.pid = data.mid;
      this.dataForm.pName = data.name;
      this.parentPopoverVisible = false;
    },
    // 菜单树设置当前选中节点
    menuListTreeSetCurrentNode () {
      this.$refs.menuListTree.setCurrentKey(this.dataForm.pid);
      this.dataForm.pName = (this.$refs.menuListTree.getCurrentNode() || {})[
        'name'
      ];
    },
    // 图标选中
    iconActiveHandle (iconName) {
      this.dataForm.icon = iconName;
      this.iconPopoverVisible = false;
    },
    // 表单提交
    dataFormSubmit () {
      if (this.ajaxLoading) {
        return false;
      }
      this.ajaxLoading = true;
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          // this.treeCheckChange(); // 勾选的菜单发生变化，设置dataForm.menuIds
          this.$nextTick(async () => {
            let data;
            if (this.mid) {
              data = await updateMenu(this.dataForm);
            } else {
              data = await insertMenu(this.dataForm);
            }
            this.ajaxLoading = false;
            if (data) {
              this.visible = false;
              this.$emit('refreshDataList');
              this.$messageCallback('success', '操作成功');
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.mod-menu {
  &__icon-popover {
    overflow: hidden;
  }
  &__icon-list {
    @include screen-pc {
      width: 360px;
    }

    @include screen-mob {
      width: 100%;
    }

    max-height: 180px;
    margin: -8px 0 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;
      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }

  .show-icon {
    display: inline-block;
    padding: 6px 8px;
    vertical-align: middle;

    > span {
      display: inline-block;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      font-size: 18px;
    }
  }

  .icon-list__input {
    display: inline-block;
    width: auto;
    margin-right: 0.5rem;
    vertical-align: middle;

    @include screen-mob {
      width: 8rem;
    }
  }
}
</style>
