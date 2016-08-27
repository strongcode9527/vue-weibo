export const setAllData = function({dispatch,state},weibo){
	dispatch('setAllData',weibo);
}

export const setComment = function({dispatch,state},index,comments){
	dispatch('setComment',index,comments);
}

export const setLikes = function({dispatch,state},index){
	dispatch('setLikes',index);
}

export const setCommentLikes = function({dispatch,state},weiboid,commentid){
	dispatch('setCommentLikes',weiboid,commentid);
}