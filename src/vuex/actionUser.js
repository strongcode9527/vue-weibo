export const setUser = function({dispatch,state},account){
	dispatch("setUser",account);
}

export const setUserId = function({dispatch,state},id){
	dispatch("setUserId",id);
}