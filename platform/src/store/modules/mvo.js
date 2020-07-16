const state = {
  userId: 3,
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
  }
};

export default {
  state,
  mutations
}
