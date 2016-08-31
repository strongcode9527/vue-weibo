<template>
	<div class="weibo">
		<header class='weibo-header'>
			<img src="../images/user.jpg"></img><strong>{{weibo.user_name}}</strong>
		</header>
		<div class="weibo-content">
			{{weibo.content}}
		</div>
		<footer class="weibo-footer">
			<div class="weibo-action"><img src="../images/collection.png" alt=""><span>收藏</span>
			</div><div class="weibo-action"><img src="../images/zhuanfa.png" alt=""><span>转发</span>
			</div><div class="weibo-action" v-on:click="comment"><img src="../images/comment.png" alt=""><span>{{weibo.reply.length}}</span>
			</div><div class="weibo-action" v-on:click="likes"><img src="../images/likes.png" alt=""><span>{{weibo.likes}}</span></div>
		</footer>
	</div>
	<div class="comment-all" v-if="isShowComment">
		<header class="comment-header">
			<img src="../images/user.jpg" alt="">
			<input class="comment-input" v-model="comment_data"/>
			<footer class="comment-header-bar">
				<button v-on:click="writeComment" class='writeComment'>发表</button>
			</footer>
		</header>
		<Comment v-for="comment in comments" :id="comment._id" :content="comment.content" :user="comment.reply_name" :likes="comment.likes"
		:weiboid="weiboid" :weiboindex="weiboindex"></Comment>
	</div>
</template>

<style>
.weibo{
	background:#fff;
	padding:0.5rem 0.5rem 0 0.5rem;
	box-sizing:border-box;
	width:97%;
	margin:.3rem auto 0 auto;
}

.weibo-header img{
	width:2.5rem;
	height:2.5rem;
	border-radius:50%;
}
.weibo-content{
	padding-left:2.5rem;
}
.weibo-action{
  display:inline-block;
	width:24%;
	text-align:center;
	margin-top:.5rem;
	font-size:0.8rem;
	font-family:inherit;
}
.weibo-action img{
	width:1rem;
	height:1rem;
  vertical-align:middle;
}
.weibo-action span{
	vertical-align:middle;
}
.weibo-action + .weibo-action{
	border-left:1px solid #ccc;
}
</style>

<script>
import Comment from './Comment.vue'
import {setComment,setLikes} from '../vuex/actionWeibo'
export default{
	components:{
		Comment
	},
	props:{
		weiboid:String,
		weiboindex:Number
	},
	data:function(){
		return {
			isShowComment : false,
			comment_data: ''
		}
	},
	vuex:{
		getters:{
			weibos:state=>state.weibo,
			user:state=>state.user,
			userId:state=>state.userId
		},
		actions:{
			setComment,
			setLikes
		}
	
  },
  computed:{
  	weibo(){
  		return this.weibos[this.weiboindex]
  	},
  	comments(){
			return this.weibos[this.weiboindex].reply
		}
  },
  methods:{
  	comment:function(){

  		this.isShowComment = ! this.isShowComment;
  	},
  	likes:function(){
  		var this_ = this;
  		$.ajax({
  			url:"http://localhost:8090/weiboLikes",
  			type:"POST",
  			data:{
  				weiboid:this_.weiboid
  			},
  			success:function(data){
  				if( data.success ){
  					this_.setLikes(this_.weiboindex);
  				}
  			}
  		})
		},
		writeComment:function(){
			var this_ = this;
			if( this.comment_data == '' ){
			  alert("输入不能为空");
			  return
			}
			
			$.ajax({
					url:"http://localhost:8090/writeComment",
				data:{
					weiboid:this_.weiboid,
					reply_name:this_.user,
					reply_id:this_.userId,
					comment_data:this_.comment_data
				},
				type:"post",
				success:function(data){
				   this_.setComment(this_.weiboindex,data.comments);

				}
			})
		}
	}
}
	
</script>
		
	