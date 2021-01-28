<template>
  <div class="app-page mod-words">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList(true)">
      <el-form-item>
        <el-select v-model="dataForm.type" placeholder="类型" clearable style="width: 160px;">
          <el-option v-for="(item, index) in wordTypes" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.level" placeholder="难易程度" clearable style="width: 160px;">
          <el-option v-for="(item, index) in wordLevels" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.word" placeholder="文字" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList(true)">查询</el-button>
        <el-button v-permisson="permisson.wordUpdate" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-permisson="permisson.wordUpdate" type="success" @click="batchAddHandle()">批量新增</el-button>
        <el-button v-permisson="permisson.wordDelete" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :empty-text="tableEmptyText">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column align="center" prop="word" label="文字"></el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <el-tag size="mini">{{ $getWordType(scope.row.type) }}</el-tag>
          <el-tag type="warning" size="mini" effect="plain" v-if="scope.row.type === 2" style="margin-left: 10px;">
            {{ $getPinType(scope.row.pinType) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="level" label="难易程度" :formatter="$formatter.getWordLevel"></el-table-column>
      <el-table-column align="center" prop="remark" label="备注" show-overflow-tooltip min-width="250"></el-table-column>
      <el-table-column header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" class="btn-success" size="small" @click="playAudioHandle(scope.row, scope.$index)" :disabled="playIndex !== null"
            v-if="scope.row.type !== 2">播放</el-button>
          <el-button v-permisson="permisson.wordUpdate" type="text" size="small" @click="addOrUpdateHandle(scope.row)">编辑</el-button>
          <el-button v-permisson="permisson.wordDelete" type="text" class="btn-danger" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :background="paginationBg" :page-size="pageSize" :layout="paginationLayout" :current-page="pageIndex"
      :page-sizes="paginationPageSizes" :total="totalPage" @size-change="sizeChangeHandle" @current-change="currentChangeHandle">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update ref="addOrUpdate" v-if="addOrUpdateVisible" @close="addOrUpdateVisible = false" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import listPageMixin from '@/mixins/listPage';
import {
  getWordList,
  deleteWord,
} from '@/apis/app';
import {
  wordTypes,
  wordLevels,
  pinTypes,
} from '@/constants';
import {
  getChineseTTS,
  getEnglishTTS,
} from '@/common/utils';
import AddOrUpdate from './word-add-or-update';
const { mapState, mapActions } = createNamespacedHelpers('config');

export default {
  mixins: [
    listPageMixin,
  ],
  components: {
    AddOrUpdate
  },
  data() {
    return {
      wordTypes,
      wordLevels,
      audioContext: '',
      dataForm: {
        type: null,
        level: null,
        word: ''
      },
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false,
      playIndex: null,
    };
  },
  computed: {
    ...mapState([
      'baiduToken',
    ]),
  },
  activated() {
    this.getBaiduToken();
    this.getDataList();
  },
  methods: {
    ...mapActions([
      'getBaiduToken',
    ]),
    // 获取数据列表
    async getDataList(isSearch) {
      this.dataListLoading = true;
      if (isSearch) {
        this.pageIndex = 1;
      }
      const data = await getWordList({
        ...this.dataForm,
        page: this.pageIndex,
        limit: this.pageSize,
      });
      this.dataListLoading = false;
      if (!this.isEmptyObject(data)) {
        this.dataList = data.list;
        this.totalPage = data.totalCount;
      } else {
        this.dataList = [];
        this.totalPage = 0;
      }
    },
    // 新增 / 修改
    addOrUpdateHandle(dataForm) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(dataForm);
      });
    },
    batchAddHandle() {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.batch();
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id;
      });
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = await deleteWord({
          ids,
        });
        if (data) {
          this.$messageCallback('success', '操作成功', () => {
            this.getDataList();
          });
        }
      });
    },
    playAudioHandle(dataForm, index) {
      this.playIndex = index;
      let audioContext = new Audio();
      let audioSrc;
      if (dataForm.type === 0) { // 汉字
        audioSrc = getChineseTTS(dataForm.word, this.baiduToken);
      } else if (dataForm.type === 1) { // 字母
        audioSrc = getEnglishTTS(dataForm.word, this.baiduToken);
      }
      audioContext.src = audioSrc;
      audioContext.play();
      audioContext.onended = () => {
        this.playIndex = null;
      };
    }
  },
};
</script>

<style lang="scss" scoped>
</style>