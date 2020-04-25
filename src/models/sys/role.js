import baseModel from '../baseModel';
import {
  menuIds
} from '@/scripts/pattern';

class Role extends baseModel {
  constructor (data) {
    super('Role', {
      id: {
        type: Number,
        default: null,
      },
      roleId: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '权限ID不能为空'
        }, {
          max: 20,
          message: '权限ID不能超过20个字符'
        }]
      },
      roleName: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '权限名称不能为空'
        }, {
          max: 40,
          message: '权限名称不能超过40个字符'
        }]
      },
      menuIds: {
        type: String,
        default: '',
        rules: [{
          required: true,
          message: '请勾选授权菜单'
        }, {
          pattern: menuIds,
          message: '请勾选授权菜单'
        }]
      },
      remark: {
        type: String,
        default: '',
        rules: [{
          max: 100,
          message: '备注不能超过100个字符'
        }]
      },
      addtime: {
        type: Number
      }
    });

    super.getDataByModel(data);
  }

  // 列表
  list ({
    page,
    limit,
    roleName
  }) {
    return this.post('/role/list', {
      page,
      limit,
      roleName
    });
  }

  select () {
    return this.post('/role/select');
  }

  delete (roleId) {
    return this.post('/role/delete', {
      roleId
    });
  }

  save () {
    let data = this.toData();
    return this.post(`${data.roleId ? '/role/update' : '/role/add'}`, data);
  }

  info (roleId) {
    return this.post('/role/info', {
      roleId
    });
  }
}

export default Role;