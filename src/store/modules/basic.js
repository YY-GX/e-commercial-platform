const state = {
  userId: 1,
  role: 'mvo'
};

const mutations = {
  changeBasic : function(state, data){
    state.userId = data.userId;
    state.role = data.role;
  },

  basicLogout: function(state){
    state.userId = null;
    state.role = null;
  },
};

export default {
  state,
  mutations
}
