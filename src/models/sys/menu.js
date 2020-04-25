import Icons from '@/scripts/icons';
import baseModel from '../baseModel';

class Menu extends baseModel {
  constructor (data) {
    super('Menu', {
      id: {
        type: Number,
        default: null,
      },
      mid: {
        type: String,
        default: '',
        rules: [{
          max: 40,
          message: '菜单ID不能超过40个字符'
        }]
      },
      name: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '菜单名称不能为空'
        }, {
          max: 12,
          message: '菜单名称不能超过12个字符'
        }]
      },
      pid: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '请选择父级菜单'
        }, {
          max: 40,
          message: '菜单父级ID不能超过40个字符'
        }]
      },
      pName: {
        type: String,
        default: '',
        rules: [{
          max: 12,
          message: '菜单名称不能超过12个字符'
        }]
      },
      path: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '菜单路径不能为空'
        }, {
          max: 100,
          message: '菜单路径不能超过100个字符'
        }]
      },
      perms: {
        type: String,
        default: null,
        rules: [{
          required: true,
          message: '权限标识不能为空'
        }, {
          max: 200,
          message: '权限标识不能超过200个字符'
        }]
      },
      icon: {
        type: String,
        default: '',
        rules: [{
          max: 45,
          message: '图标不能超过45个字符'
        }]
      },
      sort: {
        type: Number,
        default: 50,
        rules: [{
          type: 'number',
          min: 0,
          message: '排序号必须大于等于0'
        }]
      },
      type: {
        type: Number,
        default: 1,
        rules: [{
          required: true,
          type: 'enum',
          enum: [Menu.types.catalog, Menu.types.menu],
          message: '菜单类型不能为空'
        }]
      }
    });

    super.getDataByModel(data);
  }

  static types = {
    catalog: 0, // 目录
    menu: 1, // 菜单
  };

  static icons = Icons.getNameList();

  // 列表
  list () {
    return this.post('/menu/list');
  }

  delete (mid) {
    return this.post('/menu/delete', {
      mid
    });
  }

  save () {
    let data = this.toData();
    return this.post(`${data.id ? '/menu/update' : '/menu/add'}`, data);
  }

  info (mid) {
    return this.post('/menu/info', {
      mid
    });
  }

  access () {
    return this.post('/menu/access');
  }
}

export default Menu;
