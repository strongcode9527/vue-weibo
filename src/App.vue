<template>
	<Heade></Heade>
	<Cover v-if="getIsShowCover"></Cover>
	<Content></Content>
</template>

<script>
import Heade from './components/Head.vue'
import store from './vuex/store'
import Cover from './components/Cover.vue'
import Content from './components/Content.vue'
import {setIsShowCover,setIsShowLogin} from './vuex/actionCover'
import {setAllData} from './vuex/actionWeibo'
import $ from 'jquery'
export default {
	components:{
		Heade:Heade,
		Cover:Cover,
		Content:Content
	},
  store:store,
  vuex:{
  	getters:{
  		getIsShowCover:state=>state.isShowCover,
  		getUser:state=>state.user,
  		getAllData:state=>state.weibo
  	},
  	actions:{
  		setIsShowCover,
  		setIsShowLogin,
  		setAllData
  	}
  },
  created:function(){
  	if(this.getUser == ''){
  		this.setIsShowLogin(true);
  		this.setIsShowCover(true);
  	}

  	var this_ = this;
  	$.ajax({
  		url:'http://localhost:8090/getWeibos',
  		type:"POST",
  		success:function(data){
  			console.log("success get")
  			this_.setAllData(data.weibos);
  			
  		}
  	})

  }
 
}

</script>
<style>

</style>
