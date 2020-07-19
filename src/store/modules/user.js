const state = {
  usrId : 0,
  token : "",
  permissions : [],
  roleId : 0
};

const mutations = {
  changeToken : function (state,data) {
    state.token = data;
  },
  changeUserPermissions : function(state,data){
    state.permissions = data;
  },
  changeUserRoleId : function(state,data){
    state.roleId = data;
  }
};

export default {
  state,
  mutations
};
