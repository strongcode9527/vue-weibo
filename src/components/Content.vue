//此模块包括微博显示，以及发微博窗口。

<template>
	<div class="weibo-all">
		<div class="submit-weibo">
			<p class="restWordsNum">还能输入<strong>{{restWordsNum}}</strong></p>
			<textarea class="sendWeiboContent" v-model="weiboContent">
			</textarea>
		  <button class="sendWeiboButton" v-on:click="sendWeibo">发布</button>
		</div>
		<div class="weibos">
			<Weibo v-for="weiboid in getweiboids" :weiboid="weiboid" 
			:weiboindex="$index"></Weibo>
		</div>
		<p></p>
	</div>
</template>

<style>
.weibo-all{
	transform:translate(0,2rem);
	width:50%;
	margin:0 auto;
	text-align:center;
	overflow:hidden;
	
}

.restWordsNum{
	margin:0px;
	text-align:right;
}

.sendWeiboContent{
	display:block;
	width:100%;
	height:3rem;
	box-sizing:border-box;

}
.sendWeiboContent:focus{
	outline:none;
	resize:none;
	padding:0.5rem 0.5rem;
	box-sizing:border-box;
}
.sendWeiboButton{
	float:right;
	margin:0.4rem 0.4rem 0 0;
	background:#ffc09f;
	padding:0.3rem 1rem;
	box-shadow:none;
	color:white;
	border:none;
	border-radius:0.1rem;
}

.submit-weibo{
	width:97%;
	margin:1rem auto;
	padding:0.5rem;
	box-sizing:border-box;
	background:#fff;
}
.submit-weibo:after{
	content:" ";
	display:block;
	clear:both;
}
.weibos{
	margin:1rem 0 ;
	text-align: left;
}

</style>

<script>
import $ from 'jquery'
import {setAllData} from '../vuex/actionWeibo'
import Weibo from './Weibo.vue'
export default{
	components:{
		Weibo
	},
	vuex:{
		getters:{
			getUser:state=>state.user,
			getUserId:state=>state.userId,
			getWeibos:state=>state.weibo,
			getweiboids:state=>{
				return state.weibo.map(item=>item._id)
			}
		},
		actions:{
			setAllData
		}
	},
	data:function(){
		return {
			restWordsNum:140,
			weiboContent:'',
			weiboIds:[]
			// weibos:this.getWeibos()
		}
	},

	methods:{
		sendWeibo:function(){

			var this_ = this;
		
			$.ajax({
				url:"http://localhost:8090/sendWeibo",
				type:"POST",
				data:{
					user:this_.getUser,
					userId:this_.getUserId,
					weiboContent:this_.weiboContent
				},
				success:function(data){
					//data.weibo 是mongodb数据库中前十条数据
					//再node.js插入新写微博时，[].shift()在前面插入，
					//利用vuex set方法修改store中微博的数据，
					//并且vue自动更新网页微博内容
					this_.setAllData(data.weibo);
				}
			})
		},
	}
}
</script>
