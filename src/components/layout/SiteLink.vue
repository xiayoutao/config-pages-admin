<template>
  <div class="site-link">
    <a v-for="(item, index) in links" :key="index" :href="item.url" :target="item.url.indexOf('http') === 0 ? '_blank' : '_self'" :title="item.title" :class="$iconfont + item.icon"></a>
    <a href="javascript:;" :class="$iconfont + 'xyt-tuichu'" title="安全退出" @click="logout()"></a><!-- 安全退出 -->
  </div>
</template>

<script>
import { clearLoginInfo } from '@/scripts/common';

export default {
  name: 'SiteLink',
  data () {
    return {
      links: [
        {
          label: 'GitHub',
          icon: 'xyt-logo-github',
          title: '我的GitHub',
          url: 'https://github.com/xiayoutao'
        }
      ]
    };
  },
  methods: {
    // 退出登录
    logout () {
      this.$confirm('安全退出系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl('/common/logout'),
            method: 'post'
          }).then(({ data }) => {
            clearLoginInfo();
            location.href = '/login.html';
          });
        })
        .catch(() => {});
    },
  },
};
</script>
