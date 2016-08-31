<template>
	<div class="cover">
		<section class="register" v-if="getIsShowRegister">
			<h3>注册</h3>
		  <input type="text" name="account" v-model="register_account" class="account" autocomplete="off">
	    <input type="password" name="password" v-model="register_password"
	    class="password" autocomplete="off">
	    <div class="register-button">
	    	<button v-on:click="register">注册</button>
	    	<button v-on:click="showLogin">登录</button>
	    </div>
	    <span>{{registerErrMsg}}</span>
		</section>
		<section class="login" v-if="getIsShowLogin">
			<h3>登录</h3>
			<input type="text" name="account" v-model="login_account" class="account" autocomplete="off">
			<input type="password" name="password" v-model="login_password"
			class="password" autocomplete="off">
			<div class="login-button">
				<button v-on:click="login">登录</button>
				<button v-on:click="showRegister">注册</button>
			</div>
			<span>{{loginErrMsg}}</span>
		</section>
		
	</div>
</template>
	
<style scoped>
	.cover{
		height:100%;
		width:100%;
		background:rgba(0,0,0,0.8);
		position:fixed;
		top:0px;
		z-index:101;
	}
	.cover input{
		border:none;
		border-bottom:1px solid #999;
	
	}
  .cover input:focus{
  	outline:none;
  }
  .cover img{
  	width:.8rem;
  	height:.8rem;
  	vertical-align:bottom;
  	display:inline-block;
	}

  .cover h3{
  	margin:2rem 0 2rem 0;
  }
  .account{
  	margin:2rem auto;
  	display:block;
  	width:10rem;
		padding:0 1rem;
		box-sizing:border-box;
		background:url('../images/user.png') no-repeat;
		background-position:left;
		background-size:0.8rem 0.8rem;
  }
  .password{
  	margin:2rem auto;
  	display:block;
  	width:10rem;
		padding:0 1rem;
		box-sizing:border-box;
		background:url('../images/password.png') no-repeat;
		background-position:left;
		background-size:0.8rem 0.8rem;
  }
  .register{
  	position:absolute;
  	width:20rem;
  	height:15rem;
  	top:50%;
  	left:50%;
  	transform:translate(-50%,-50%);
  	text-align:center;
		background:white;
		border-radius:5px;
	
  } 
  .login{
  	position:absolute;
  	width:20rem;
  	height:15rem;
  	top:50%;
  	left:50%;
  	transform:translate(-50%,-50%);
  	text-align:center;
		background:white;
		border-radius:5px;
  }
  .login-button button{
  	margin:0 1rem;
  	padding:0.2rem 1rem;
  	border-radius:5px;
  	box-shadow:none;
  	color:white;
  	border-radius:0.5rem;
  	background:pink;
  	outline:none;
  	border:none;
	}
	.register-button button{
  	margin:0 1rem;
  	padding:0.2rem 1rem;
  	border-radius:5px;
  	box-shadow:none;
  	color:white;
  	border-radius:0.5rem;
  	background:pink;
  	outline:none;
  	border:none;
	}
	
</style>
	
<script>
	import {setUser,setUserId} from '../vuex/actionUser'
	import {setIsShowLogin,setIsShowRegister,setIsShowCover} from '../vuex/actionCover'
	import $ from 'jquery'
	export default{
		vuex:{
			actions:{
				setUser:setUser,
				setUserId:setUserId,
				setIsShowCover:setIsShowCover,
				setIsShowLogin:setIsShowLogin,
				setIsShowRegister:setIsShowRegister
			},
			getters:{
				getIsShowLogin: state=>state.isShowLogin,
				getIsShowRegister:state=>state.isShowRegister
			}
		},
		methods:{
			login:function(){
				var this_ = this;
				$.ajax({
					url:"http://localhost:8090/login",
					type:"POST",
					data:{
						account:this_.login_account,
						password:this_.login_password
					},
					success:function(data){
						if( data.success ){
							this_.setUser(this_.login_account);
							this_.setUserId(this_.login_password);
							this_.setIsShowCover(false);
						}else{
							this_.loginErrMsg = "账号密码错误";
						}
					}
				})
			},
			showRegister:function(){
				
				this.setIsShowLogin(false);
				this.setIsShowRegister(true);
				this.registerErrMsg = '';
			},
			showLogin:function(){
				this.setIsShowLogin(true);
				this.setIsShowRegister(false);
				this.loginErrMsg = '';
			},
			register:function(){
				var this_ = this;
				$.ajax({
					url:'http://localhost:8090/register',
					data:{
						account:this_.register_account,
						password:this_.register_password
					},
					type:"POST",
					success:function(data){
						
						if( data.success ){
							this_.showLogin();
						}
						else{
							this_.errMsg = data.err;
						}
					}
				})
			}
		},
		data:function(){
			return {
				register_account:'',
				register_password:'',
				login_account:'',
				login_password:'',
				registerErrMsg:'',
				loginErrMsg:''
			}
		}
  }
</script>
		
		
		
						
			
					
			   
					
					
	
		

