<template>
	<header class="header">
	  <img src="../images/logo.png" class="weibo-logo"/>
		<div class="header-search">
			<input class="header-search-input">
		  <img src="../images/search.png" class="header-search-logo"/>
		</div>
		<div class="user">
			<img src="../images/user.png" class="user-logo">
			<em>{{getUser}}</em>     
		</div>
		
	</header>
</template>

<style>
html{
	font-size:125%;
	height:100%;
	width:100%;
}
body{
	margin:0px;
	height:100%;
	width:100%;
	overflow:auto;
	background:rgba(70,149,194,0.3);
}
.weibo-logo{
	float:left;
	margin:0.35rem 0;
}
.header{
	width:100%;
	background:blue;
	height:2rem;
	padding:0 2rem;
	position:fixed;
	top:0px;
	z-index:50;
}
.header-search{
	float:left;
	margin-left:3rem;
  margin-top: .25rem;
	width:50%;
	position:relative;
	vertical-align:middle;

}
.header-search-input{
	width:100%;
  height:1.5rem;
	padding:0 2rem;
	box-sizing:border-box;
	background:white;
}
.header-search-logo{
	position:absolute;
	top:0.25rem;
	right:0.5rem;
	width:1rem;
	height:1rem;
}
.user{
	float:left;
	margin:0.25rem 0 0 2rem;
}
.user-logo{
	width:1rem;
	height:1rem;
	margin-top:0.25rem;
	vertical-align:top;
}
</style>

<script>
import $ from 'jquery'
import {setAllData} from '../vuex/actionWeibo'
import {setIsShowCover} from '../vuex/actionCover'
import vuex from '../vuex/store.js'
export default {
 vuex: {
  getters: {
    getUser : state=>state.user,
    getAllData :state=>state.weibo,
    getIsShowCover:state=>state.isShowCover
  },
  actions: {
  	setAllData:setAllData,
  	setIsShowCover : setIsShowCover
  }
 },
 created:function(){
 	  if( vuex.state == '' ){
 	  	this.setIsShowCover(true);
 	  }

	}
}
 //生命钩子，在创建header后初始化vuex中的所有微博数据
 //因为用户的特殊性，在这里不在初始化.
</script>

