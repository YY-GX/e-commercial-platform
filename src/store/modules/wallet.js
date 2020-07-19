const state = {
  is_pay: false,
  walletId: null,
  username: null,
  usrId: null,
  accountType: null,
  orderInfo : {},
  productDetail : {},
};

const mutations = {
  walletLogin : function(state, data){
    state.walletId = data.walletId;
    state.username = data.username;
    state.usrId = data.userId;
    state.accountType = data.accountType;
  },

  walletLogout: function(state){
    state.walletId = null;
    state.username = null;
    state.usrId = null;
    state.accountType = null;
  },

  changeIsPay : function(state,data){
    state.is_pay = data;
  },
  changeOrderInfo : function (state,data) {
    state.orderInfo = data;
  },
  changeProductDetail : function(state,data){
    state.productDetail = data;
  }
};

export default {
  state,
  mutations
}
