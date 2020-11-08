<template>
<el-dialog
  class="dialog-common"
  :title="isUpdate ? '编辑' : '新增'"
  :close-on-click-modal="false"
  @close="$emit('close')"
  :visible.sync="visible"
  width="360px"
>
  <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="80px" @keyup.enter.native="dataFormSubmit()">
    <el-form-item label="类型" prop="type">
      <el-select v-model="dataForm.type" clearable>
        <el-option v-for="(item, index) in wordTypes" :key="index" :value="item.value" :label="item.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="拼音类型" prop="pinType" v-if="dataForm.type === 2">
      <el-select v-model="dataForm.pinType" clearable>
        <el-option v-for="(item, index) in pinTypes" :key="index" :value="item.value" :label="item.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="等级" prop="level" v-if="dataForm.type === 0">
      <el-select v-model="dataForm.level" clearable>
        <el-option v-for="(item, index) in wordLevels" :key="index" :value="item.value" :label="item.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文字" prop="word">
      <el-input v-model="dataForm.word" placeholder="文字" clearable></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" type="textarea" :rows="5" placeholder="备注"></el-input>
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
  batchInsertWord,
  updateWord,
} from '@/apis/app';
import {
  wordLevels,
  wordTypes,
  pinTypes,
} from '@/constants';

export default {
  data () {
    return {
      visible: false,
      wordLevels,
      wordTypes,
      pinTypes,
      isBatch: false,
      rules: {
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        pinType: [{ required: true, message: '请选择拼音类型', trigger: 'change' }],
        level: [{ required: true, message: '请选择级别', trigger: 'change' }],
        word: [{ required: true, message: '文字不能为空', trigger: 'blur' }],
      },
      dataForm: {
        type: 0,
        pinType: null,
        level: 1,
        word: null,
        remark: null,
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
      this.isBatch = false;
      this.visible = true;
    },
    batch () {
      this.isBatch = true;
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
          if (this.isBatch) {
            data = await batchInsertWord({
              ...this.dataForm,
              words: this.dataForm.word.split(','),
            });
          } else if (this.isUpdate) {
            data = await updateWord({
              ...this.dataForm,
              word: this.dataForm.word,
            });
          } else {
            data = await insertWord({
              ...this.dataForm,
              word: this.dataForm.word,
            });
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
