const state = {
  userId: 1,
  manId: 1,
  brdId: 1,
  role: 'mvo',
  username: 'cui',
  permissions: '1',
  phone: null,
  email: null,
};

const mutations = {
  changeCompanyID : function(state,id){
    state.manId = id;
  },

  changeBrandID : function(state,id){
    state.brdId = id;
  },

  loginChange: function (state, data) {
    state.username = data.name;
    state.permissions = data.permissions;
    state.role = data.role.name;
    state.userId = data.userId;
    state.phone = data.phone;
    state.email = data.email;
  },

  mvoLogout: function (state) {
    state.username = null;
    state.permissions = null;
    state.role = null;
    state.userId = null;
    state.phone = null;
    state.email = null;
  },
};

export default {
  state,
  mutations
}
