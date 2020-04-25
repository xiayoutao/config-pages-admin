<template>
  <el-dialog class="dialog-common" :title="!mid ? '新增' : '编辑'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" :show-message="validateShowMessage" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="类型" prop="type" :error="validateErrors.type">
        <el-radio-group v-model="dataForm.type">
          <el-radio-button :label="types.catalog">目录</el-radio-button>
          <el-radio-button :label="types.menu">菜单</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name" :error="validateErrors.name">
        <el-input v-model="dataForm.name" placeholder="菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid" :error="validateErrors.pid">
        <el-popover ref="menuListPopover" v-model="parentPopoverVisible" placement="bottom-start" :visible-arrow="true" popper-class="popover-menulist-container">
          <el-tree :data="menuListLevel" :props="menuListTreeProps" ref="menuListTree" node-key="mid" @current-change="menuListTreeCurrentChangeHandle" :default-expand-all="false" :default-expanded-keys="[0]" :highlight-current="true" :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.pName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
      </el-form-item>
      <el-form-item label="菜单路由" prop="path" :error="validateErrors.path" v-if="dataForm.type === types.menu">
        <el-input v-model="dataForm.path" placeholder="菜单路由"></el-input>
      </el-form-item>
      <el-form-item label="授权标识" prop="perms" :error="validateErrors.perms">
        <el-input v-model="dataForm.perms" placeholder="多个用逗号分隔, 如: user:list,user:create"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon" :error="validateErrors.icon">
        <el-popover ref="iconListPopover" v-model="iconPopoverVisible" trigger="click" width="360px" popper-class="mod-menu__icon-popover">
          <div class="mod-menu__icon-list">
            <el-button v-for="(item, index) in iconList" :key="index" @click="iconActiveHandle(item)" :class="{ 'is-active': item === dataForm.icon }">
              <span :class="$iconfont + item"></span>
            </el-button>
          </div>
        </el-popover>
        <el-input v-model="dataForm.icon" v-popover:iconListPopover placeholder="菜单图标名称" class="icon-list__input"></el-input>
        <el-button class="show-icon" v-if="dataForm.icon"><span :class="$iconfont + dataForm.icon"></span></el-button>
      </el-form-item>
      <el-form-item label="排序号" prop="sort" :error="validateErrors.sort">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序号"></el-input-number>
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
import Icons from '@/scripts/icons';
import { treeDataTranslate } from '@/scripts/treeUtils';
import Validate from '@/mixins/validate';

export default {
  mixins: [Validate],
  data () {
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
      dataForm: {}
    };
  },
  computed: {
    iconList () {
      return Menu.icons;
    },
    types () {
      return Menu.types;
    },
    menuListLevel () {
      return treeDataTranslate(this.menuList, 'mid');
    }
  },
  methods: {
    init (mid) {
      this.dataForm = {};
      this.mid = mid;
      this.$set(this.dataForm, 'mid', mid || 0);
      this.getMenuList();
      this.visible = true;
      this.$nextTick(() => {
        let menuModel = new Menu();
        if (mid) {
          menuModel.info(mid).then(({ data }) => {
            let resultData = this.$httpResponseHandle(data);
            if (resultData) {
              this.initData(resultData);
            } else {
              this.visible = false;
            }
          });
        } else {
          let dataForm = menuModel.toData();
          this.initData(dataForm);
        }
      });
    },
    // 设置dataForm对象属性
    initData (dataForm) {
      let keys = Object.keys(dataForm);
      keys.forEach(item => {
        this.$set(this.dataForm, item, dataForm[item]);
      });
    },
    // 获取菜单列表
    getMenuList () {
      let menuModel = new Menu();
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
      this.validateShowMessage = true;
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
    },
    validateForm (success) {
      let FormDataModel = new Menu(this.dataForm);
      let validateFields = []; // 需要校验的字段
      // 根据不同情况校验不同字段
      if (this.dataForm.type === this.types.catalog) {
        validateFields = ['name', 'sort'];
      } else if (this.dataForm.type === this.types.menu) {
        validateFields = ['name', 'path', 'sort'];
      }
      FormDataModel.validate(validateFields)
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
