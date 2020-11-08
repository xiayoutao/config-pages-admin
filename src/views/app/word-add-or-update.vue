<template>
<el-dialog
  class="dialog-common"
  :title="isUpdate ? '编辑' : '新增'"
  :close-on-click-modal="false"
  @close="$emit('close')"
  :visible.sync="visible"
  width="320px"
>
  <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="80px" @keyup.enter.native="dataFormSubmit()">
    <el-form-item label="类型" prop="type">
      <el-select v-model="dataForm.type" clearable>
        <el-option label="字母" :value="0"></el-option>
        <el-option label="拼音" :value="1"></el-option>
        <el-option label="汉字" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文字" prop="word">
      <el-input v-model="dataForm.word" placeholder="参数名" clearable style="120px;"></el-input>
    </el-form-item>
    <el-form-item label="等级" prop="level">
      <el-select v-model="dataForm.level" clearable>
        <el-option label="简单" :value="1"></el-option>
        <el-option label="中等" :value="2"></el-option>
        <el-option label="难" :value="3"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="visible = false">取消</el-button>
    <el-button type="primary" :loading="ajaxLoading" @click="dataFormSubmit()">确定</el-button>
  </span>
</el-dialog>
</template>

<script>
import {
  getWordInfo,
  insertWord,
  updateWord,
} from '@/apis/app';

export default {
  data () {
    return {
      visible: false,
      id: null,
      rules: {
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        word: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        level: [{ required: true, message: '请选择级别', trigger: 'change' }],
      },
      dataForm: {
        type: 1,
        word: null,
        level: 1,
      },
    };
  },
  computed: {
    isUpdate () {
      return !!this.dataForm.id;
    }
  },
  methods: {
    init (dataForm) {
      dataForm = dataForm || {};
      this.dataForm = { ...dataForm };
      this.visible = true;
    },
    // 表单提交
    async dataFormSubmit () {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          if (this.ajaxLoading) {
            return false;
          }
          this.ajaxLoading = true;
          let data;
          if (this.isUpdate) {
            data = await updateWord(this.dataForm);
          } else {
            data = await insertWord(this.dataForm);
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
