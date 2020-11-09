import {
  getBaiduToken,
} from '@/apis/common';

export default {
  namespaced: true,
  state: {
    baiduToken: null,
    qiniuToken: null,
  },
  getters: {
    baiduToken: state => state.baiduToken,
    qiniuToken: state => state.qiniuToken,
  },
  mutations: {
    setBaiduToken (state, token) {
      state.baiduToken = token;
    },
  },
  actions: {
    async getBaiduToken ({ commit }) {
      const data = await getBaiduToken();
      commit('setBaiduToken', data.access_token);
    }
  }
};