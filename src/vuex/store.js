import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

const state = {
	user:'',
	userId:'',
	weibo:[],
	reply:[],
	isShowCover:false,
	isShowLogin:false,
  isShowRegister:false
}

const mutations = {
	//更改用户
	setUser (state,user){
		state.user = user;
	},
	//设置所有微博信息，信息不包括用户
	setAllData(state,data){
		state.weibo = data;
	},
	setIsShowCover(state,flag){
		state.isShowCover = flag;
	},
	setIsShowLogin(state,flag){
		state.isShowLogin = flag;
	},
	setIsShowRegister(state,flag){
		state.isShowRegister = flag;
	},
	setUserId(state,id){
		state.userId = id;
	},
	setUser(state,account){
		state.user = account;
	},
	setComment(state,index,comments){
		state.weibo[index].reply = comments;
	},
	setLikes(state,index){
		state.weibo[index].likes++;
	},
	setCommentLikes(state,weiboid,commentid){

		state.weibo.forEach(function(e){
			if( e._id == weiboid ){
				e.reply.forEach(function(m){
					if(m._id == commentid)
						m.likes++;
				})
	
			}
		})
	}
}


export default new vuex.Store({
  state,
  mutations
})