var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var url = require('url');
var Weibo = require('./models/weibo');
var User = require('./models/user');
var Comment = require('./models/comment.js');
var bodyParser = require('body-parser');
var app = express();
var dbUrl = 'mongodb://127.0.0.1/weibo'


app.use(bodyParser());
//设置跨域代码.
app.all("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

app.listen(8090);

console.log('node start at 8090 port');

app.post('/getWeibos',function(req,res){
  Weibo.find({},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.send({weibos:data.slice(0,11).reverse()});
    }
  })
})

app.post('/login',function(req,res){
  var account = req.body.account;
  var password = req.body.password;
  User.find({account:account,password:password},function(err,data){
    if( data.length ){
      res.send({
        success:true
      })
    }else{
      res.send({
        success:false
      })
    }
  })
})

app.post('/register',function(req,res){
  var account = req.body.account;
  var password = req.body.password;
  
  User.find({account:account},function(err,data){

    if(err){
      console.log(err)
    }else{
      if( data.length ){
        res.send({
          err:"账号已存在",
          success:false
        })
      }
      else{
        var newUser = new User({
          account:account,
          password:password
        });
        newUser.save(function(err,data){
          if(err){
            console.log(err);
          }else{
            res.send({
              success:true
            })
          }
        })
      }
    }
  })
});

app.post('/sendWeibo',function(req,res){
  var body = req.body;
  var user = body.user;
  var userId = body.userId;
  var weiboContent = body.weiboContent;

  var newWeibo = new Weibo({
    content : weiboContent,
    user_name : user,
    user_id : userId,
    likes : 0,
  });
  newWeibo.save(function(err,data){
    if(err){
      console.log(err);
    }else{
      Weibo.find({},function(err,data){
        res.send({weibo:(data.slice(0,11).reverse())});
      })
    }
  });
})




app.post('/writeComment',function(req,res){
  var id = req.body.weiboid;
  var  comment_data = req.body.comment_data;
  var user = req.body.reply_name;
  var userId = req.body.reply_id;
    Weibo.find({_id:id},function(err,data){

    var weibo = data[0];
    var comment = new Comment({
      reply_name : user,
      reply_id: userId,
      content:comment_data,
      likes:0
    })
  
    weibo.reply.push(comment);
    weibo.save(function(err,data){
      if(err){
        console.log(err);
      }else{
       res.send({
        //返回的评论后加入，放在前面，便于展示.
        comments:weibo.reply.reverse()
       })
      }
    });

  })
});     

app.post('/weiboLikes',function(req,res){
  var _id = req.body.weiboid;

  Weibo.find({_id:_id},function(err,data){
    
    if(err){
      console.log(err);
    }else{
       data[0].likes++;
       data[0].save(function(err,data){
         if(err){
          console.log(err);
         }else{
          res.send({
            success:true
          })
         }
          
       });
    }
  })
})

app.post('/commentLikes',function(req,res){
  var weiboid = req.body.weiboid;
  var commentid = req.body.commentid;
  Weibo.find({_id:weiboid},function(err,data){
    if(err){
      console.log(err);
    }else{
      if(!data.length){
        return ;
      }
      data[0].reply.forEach(function(e){
        if( e._id == commentid )
          e.likes++;
      });
      data[0].save(function(err,data){
        if(err){
          console.log(err);
        }else{
          res.send({
            success:true
          })
        }
      })  
    }
  })
})