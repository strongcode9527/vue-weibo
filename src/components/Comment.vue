<template>
	<ul class="comments">
		<li class="comment">
		  <div class="comment-body">
		  	 <img src="../images/user.jpg" alt="">
		  	 <span>{{user}} :</span>
		  	 <span class="">{{content}}</span>
		  </div>
		  <footer class="comment-footer">
		  	<div v-on:click="isShowReplyComment"><span>回复</span></div>
		  	<div v-on:click="commentLikes">
  				<img src="../images/likes.png" alt=""><span>{{likes}}</span>
		  	</div>
		  </footer>
		  <div class="reply-comment" v-if="showReply">
		  	<input v-bind:value="reply_comment" v-model="comment_data"/>
		  	<button v-on:click="writeReplyComment">回复</button>
		  </div>
		</li>
	</ul>
</template>


<style>
  .comment-all{
  	width:97%;
  	margin:0 auto;

  	box-sizing:border-box;
  	background:#f2f2f5;
  }
	.comment-header img{
		width:2rem;
		height:2rem;
	}
	.comment-input{
		border:1px solid yellow;
		width:80%;
		height:2rem;
		margin-left:5%;
	}
	.writeComment{
		float:right;
		margin-right:10%;
	}
	.comments{
		margin:1rem 0;
		box-sizing:border-box;
		border-top:1px solid #ccc;
	}
	.comment{
		list-style-type:none;
		
		padding:0.2rem 0.2rem;
	}
	.comment-header-bar{
		overflow:hidden;
	}
	.comment-body img{
		width:2rem;
		height:2rem;
	}
	.comment-footer{
		overflow:hidden;
		text-align:right;
		padding-right:1rem;
	}
	.comment-footer div{
		display:inline-block;
		font-size:0.8rem;
	}

	.comment-footer img{
		width:1rem;
		height: 1rem;
	}
	.reply-comment{
		height:2.5rem;
		background:white;
		padding:0.5rem 2rem;
		text-align:right;
		
	}
	.reply-comment input{
		width:100%;
		display:block;
	}
	.reply-comment button{
		padding:0.3rem 0.5rem;
		background:#ffc09f;
		box-shadow:none;
		border:none;
		color:white;
		border-radius:0.1rem;
		margin:0.2rem 0.2rem;
	}
</style>

<script>
	import $ from 'jquery'
	import {setComment,setCommentLikes} from '../vuex/actionWeibo';
	export default{
		props:{
			id:String,
			content:String,
			user:String,
			likes:Number,
			weiboid:String,
			weiboindex:Number
		},
		vuex:{
			getters:{
			  	weibos:state=>state.weibo,
			  	user:state=>state.user,
			  	userid:state=>state.userId
			},
			actions:{
				setComment,
				setCommentLikes
			}
		},
		computed:{
	

		},
		data:function(){
			return {
				comment_data:'',
				reply_comment:'回复@' + this.user,
				showReply:false
			}
		},
		methods:{
			isShowReplyComment:function(){
				this.showReply = !this.showReply;
			},
			writeReplyComment:function(){
				var this_ = this;
				$.ajax({
						url:"http://localhost:8090/writeComment",
					data:{
						weiboid:this_.weiboid,
						reply_name:this_.user,
						reply_id:this_.userid,
						comment_data:this_.comment_data
					},
					type:"post",
					success:function(data){
					   this_.setComment(this_.weiboindex,data.comments);

					}
				})
			},
			commentLikes:function(){
				var this_ = this;
				$.ajax({
					url:"http://localhost:8090/commentLikes",
					data:{
						weiboid:this_.weiboid,
						commentid:this_.id
					},
					type:"POST",
					success:function(data){
						if(data.success){
							this_.setCommentLikes(this_.weiboid,this_.id);
							
						}
					}
				})
			}
		}
	}
</script>