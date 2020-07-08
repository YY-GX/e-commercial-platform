const state = {
  companyID : 0,
  brandID : 0,
  storeID : 0
}

const mutations = {
  changeCompanyID : function(state,id){
    state.companyID = id;
  },
  changeBrandID : function(state,id){
    state.brandID = id;
  },
  changeStoreID : function(state,id){
    state.storeID = id;
  }
}

export default {
  state,
  mutations
}
