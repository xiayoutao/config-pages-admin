<template>
  <el-dialog class="dialog-common" :title="!id ? '新增' : '编辑'" :close-on-click-modal="false" @close="$emit('close')" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" :show-message="validateShowMessage" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="姓名" prop="username" :error="validateErrors.username">
        <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" :error="validateErrors.sex">
        <el-radio-group v-model="dataForm.sex">
          <el-radio-button :label="sexs.man">男</el-radio-button>
          <el-radio-button :label="sexs.woman">女</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age" :error="validateErrors.age">
        <el-input-number v-model="dataForm.age" controls-position="right" :min="0" label="年龄"></el-input-number>
      </el-form-item>
      <el-form-item label="城市" prop="city" :error="validateErrors.city">
        <el-input v-model="dataForm.city" placeholder="城市"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="ajaxLoading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Table from '@/models/demo/table';
import Validate from '@/mixins/validate';

export default {
  mixins: [Validate],
  data () {
    return {
      visible: false,
      dataForm: {},
      id: null
    };
  },
  computed: {
    sexs () {
      let tableModel = new Table();
      return tableModel.sexs;
    }
  },
  methods: {
    init (dataForm) {
      this.id = dataForm.id;
      this.visible = true;
      this.$nextTick(() => {
        let tableModel = new Table();
        if (dataForm.id) {
          tableModel.info(dataForm.id).then(({ data }) => {
            let resultData = this.$httpResponseHandle(data);
            if (resultData) {
              this.initData(resultData);
            }
          });
        } else {
          let dataForm = tableModel.toData();
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
    // 表单提交
    dataFormSubmit () {
      this.validateShowMessage = true;
      this.validateForm(FormDataModel => {
        FormDataModel.save(this.id).then(({ data }) => {
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
      let FormDataModel = new Table(this.dataForm);
      FormDataModel.validate(['username', 'sex', 'age', 'city'])
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
