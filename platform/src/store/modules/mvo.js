const state = {
  userId: 1,
  manId: 5,
  brdId: 1,
  role: 'mvo'
};

const mutations = {
  changeCompanyID : function(state,id){
    state.manId = id;
  },

  changeBrandID : function(state,id){
    state.brdId = id;
  },
};

export default {
  state,
  mutations
}
