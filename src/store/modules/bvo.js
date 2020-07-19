const state = {
  companyID : 0,
  brandID : 0,
  storeID : 0,
  storeInfo : {},
  dsrId : 0,
  bvo_usrId : 0,
  permissions : {}
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
  },
  saveStoreInfo : function(state,obj){
    state.storeInfo = obj;
  },
  changeDsrId : function(state,id){
    state.dsrId = id;
  },
  BVO_login : function(state,data){
    state.bvo_usrId = data.userId;
    state.permissions = data.permissions;
  }
}

export default {
  state,
  mutations
}
