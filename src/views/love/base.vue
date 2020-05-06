<template>
  <div class="app-page isedit mod-base">
    <el-form ref="dataForm" :model="dataForm" label-width="108px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="新郎姓名" prop="groomName">
        <el-input v-model="dataForm.groomName" placeholder="新郎姓名"></el-input>
      </el-form-item>
      <el-form-item label="新娘姓名" prop="brideName">
        <el-input v-model="dataForm.brideName" placeholder="新娘姓名"></el-input>
      </el-form-item>
      <el-form-item label="婚礼日期" prop="weddingDate">
        <el-date-picker v-model="dataForm.weddingDate" type="date" value-format="datetime" format="yyyy-MM-dd" placeholder="选择日期" style="width:200px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="农历" prop="lunarDate">
        <el-input v-model="dataForm.lunarDate" placeholder="农历"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="mobile">
        <el-input type="mobile" v-model="dataForm.mobile" placeholder="联系方式"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input type="textarea" v-model="dataForm.address" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="codeAddress()" style="width: 160px;">显示位置</el-button>
      </el-form-item>
      <el-form-item label="地图">
        <div id="container" style="max-width:100%;height:18rem"></div>
      </el-form-item>
      <el-form-item label="背景音乐" prop="bgmusic">
        <el-select v-model="dataForm.bgmusic" multiple collapse-tags placeholder="背景音乐">
          <el-option v-for="(item, index) in musicList" :key="index" :label="item.name" :value="item.url">
            <span style="float:left;">{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="小程序背景图" prop="bgimage">
        <el-select v-model="dataForm.bgimage" clearable placeholder="小程序背景图">
          <el-option v-for="(item, index) in imageList" :key="index" :label="item.name" :value="item.url">
            <img :src="item.url + '?imageView2/1/w/50/h/50'" style="float:left;width:30px;height:30px;margin-right:10px;">
            <span style="float:left;">{{ item.name }}</span>
          </el-option>
        </el-select>
        <div class="clearfix"></div>
        <img class="show-thumb" :src="dataForm.bgimage + '?imageView2/1/w/100/h/300'" v-if="dataForm.bgimage">
      </el-form-item>
      <el-form-item label="更多图片" prop="moreimg">
        <el-select v-model="dataForm.moreimg" multiple collapse-tags placeholder="选择图片">
          <el-option v-for="(item, index) in imageList" :key="index" :label="item.name" :value="item.url">
            <img :src="item.url + '?imageView2/1/w/50/h/50'" style="float:left;width:30px;height:30px;margin-right:10px;">
            <span style="float:left;">{{ item.name }}</span>
          </el-option>
        </el-select>
        <div class="clearfix"></div>
        <img class="show-thumb" :src="item + '?imageView2/1/w/80/h/80'" v-for="(item, index) in dataForm.moreimg" :key="index">
      </el-form-item>
      <el-form-item label="AppID" prop="appid">
        <el-input v-model="dataForm.appid" placeholder="小程序AppID"></el-input>
      </el-form-item>
      <el-form-item label="分享名称" prop="share">
        <el-input v-model="dataForm.share" placeholder="分享名称"></el-input>
      </el-form-item>
      <el-form-item label="分享缩略图" prop="thumb">
        <el-input v-model="dataForm.thumb" placeholder="分享缩略图"></el-input>
        <div class="clearfix"></div>
        <img class="show-thumb" :src="dataForm.thumb + '?imageView2/1/w/200/h/160'" v-if="dataForm.thumb">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-permisson="permisson.baseSave" :loading="ajaxLoading" @click="dataFormSubmit()" style="width:8rem;">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import {
  fileTypes,
  getAllFile,
} from '@/apis/love/file.js';
import {
  getBaseInfo,
  insertBaseInfo,
  updateBaseInfo,
} from '@/apis/love/base.js';

export default {
  data () {
    return {
      fileTypes,
      dataForm: {},
      imageList: [],
      musicList: [],
      map: null,
      rules: {
        sort: [
          { required: true, message: '排序号不能为空', },
          { type: 'number', min: 0, message: '排序号必须大于等于0', },
        ],
      }
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.getFormData();
      this.getImageList();
      this.getMusicList();
    });
  },
  methods: {
    /**
     * 获取基本信息
     */
    async getFormData () {
      const data = await getBaseInfo();
      if (!this.isEmptyObject(data)) {
        let keys = Object.keys(data);
        keys.forEach(item => {
          let itemData = '';
          if (item === 'moreimg' || item === 'bgmusic') {
            itemData =
              data[item] !== '' ? data[item].split(',') : [];
          } else {
            itemData = data[item];
          }
          this.$set(this.dataForm, item, itemData);
        });
        this.initMap(this.dataForm.coord.split(','), this.dataForm.address);
      }
    },
    /**
     * 获取图片列表
     */
    async getImageList () {
      // 0图片，1音频，2视频
      const data = await getAllFile({
        type: this.fileTypes.image,
      });
      if (!this.isEmptyObject(data)) {
        this.imageList = [];
        data.forEach(item => {
          this.imageList.push({
            id: item.id,
            url: this.$store.state.common.cdnUrl + item.urlkey,
            name: item.name
          });
        });
      }
    },
    /**
     * 获取音频列表
     */
    async getMusicList () {
      // 0图片，1音频，2视频
      const data = await getAllFile({
        type: this.fileTypes.audio,
      });
      if (!this.isEmptyObject(data)) {
        this.musicList = [];
        data.forEach(item => {
          this.musicList.push({
            id: item.id,
            url: this.$store.state.common.cdnUrl + item.urlkey,
            name: item.name
          });
        });
      }
    },
    // 提交表单
    async dataFormSubmit () {
      if (this.ajaxLoading) {
        return false;
      }
      this.ajaxLoading = true;
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          let data;
          if (this.mid) {
            data = await updateBaseInfo(this.dataForm);
          } else {
            data = await insertBaseInfo(this.dataForm);
          }
          if (data) {
            this.$messageCallback('success', '操作成功', () => {
              this.getFormData();
            });
          }
        } else {
          return false;
        }
      });
    },
    /**
     * 显示地图
     */
    initMap (coord, address) {
      this.$nextTick(() => {
        var center = new qq.maps.LatLng(coord[0], coord[1]);
        this.map = new qq.maps.Map(document.getElementById('container'), {
          // 地图的中心地理坐标。
          center: center,
          zoom: 10
        });
        var marker = new qq.maps.Marker({
          position: center,
          map: this.map,
          title: address
        });

        this.initMapEvent(this.map);
      });
    },
    /**
     * 加载地图事件
     */
    initMapEvent (map) {
      var _this = this;
      qq.maps.event.addListener(map, 'click', event => {
        var latLng = event.latLng;
        var geocoder = new qq.maps.Geocoder({
          complete (result) {
            _this.dataForm.address = result.detail.address;
          }
        });
        var coord = new qq.maps.LatLng(latLng.lat, latLng.lng);
        geocoder.getAddress(coord);
      });
    },
    /**
     * 根据输入的地址显示地图位置
     */
    codeAddress () {
      var _this = this;
      var center = new qq.maps.LatLng(39.916527, 116.397128);
      this.map = new qq.maps.Map(document.getElementById('container'), {
        center: center,
        zoom: 15
      });
      // 调用地址解析类
      var geocoder = new qq.maps.Geocoder({
        complete (result) {
          var location = result.detail.location;
          _this.dataForm.coord = location.lat + ',' + location.lng;
          _this.map.setCenter(location);
          var marker = new qq.maps.Marker({
            map: _this.map,
            position: location
          });
        }
      });
      geocoder.getLocation(this.dataForm.address);
    }
  }
};
</script>

<style lang="scss">
.mod-base {
  padding-top: 2rem;
  padding-right: 0;

  @include screen-pc {
    max-width: 1200px;
    padding-right: 10rem;
  }

  .show-thumb {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 10px 15px 0 0;
  }
}
</style>
