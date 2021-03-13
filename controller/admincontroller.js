const Post = require('../models/post')

const User = require('../models/user')

const fs = require('fs')
const passport = require('passport')
const post = require('../models/post')
const passportSetup = require('../config/passport-setup');

const deleteFile = (filepath) => {
  fs.unlink(filepath, (err)=> {
    console.log(err);
  })
}



exports.getHome = (req,res,next) => {
    Post.find({}, function(err, posts){
        console.log(posts);
        res.render("home", {
          posts: posts
          });
      });
}






exports.getSignup = (req,res,next) => {
  res.render("signup");
}

exports.postSignup = (req,res,next) => {
  const email = req.body.signup_email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password; 
  console.log(email + " " + firstName + " " + lastName + " " + password);
  User.find({Email:email},function(err,obj){
    if(!obj){
      const user = new User({
        fName: firstName,
        lName: lastName,
        Email: email,
        Password: password
      });
      console.log(email + " " + firstName + " " + lastName + " " + password);
      user.save(function(err){
        console.log(email + " " + firstName + " " + lastName + " " + password);
        if (!err){
          console.log('user saved');
          res.redirect("/login");
        }
      });
    }else{
      res.send("<h1>Error,email already exists</h1>");
    }
  })
  
}

exports.getLogin = (req,res,next) => {
  res.render("login");
}

exports.postLogin = (req,res,next) => {
  passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login' });
}

exports.getCompose = (req,res,next)=> {
  res.render("compose");
}

exports.postCompose = (req,res,next) => {
    const title = req.body.postTitle;
    const imageUrl = req.file.path;
    const content = req.body.postBody;
    console.log(imageUrl)
    const post = new Post({
        title: title,
        imageUrl : imageUrl,
        content: content,
        name: req.body.composerName,
        email: req.body.composerEmail
      });
      console.log('post created')
      Post.findOne({title: title},function(err,obj){
          console.log('post finding')
          if(!obj){
            post.save(function(err){
                console.log('post save')
                if (!err){
                    res.redirect("/");
                }else{
                  console.log(err);
                }
              });
          }else{
              res.redirect("/exists");
          }
      });
}

exports.getExists = (req,res,next)=> {
    res.render("exists"); 
}


exports.deletePost = (req,res,next)=> {
  const postId = req.params.postId
  console.log('post deleting')
  console.log(postId);

  Post.findById({_id : postId})
      .then(post => {
        console.log('image deleting')
        return deleteFile(post.imageUrl)
      })
      .then(result => {
        console.log('post deleted')
        Post.deleteOne({_id : postId} ,(err) => {
          if(err){
            console.log(err);
            return
          }
          res.status(200).json({redirect : '/'})
        })
      })
      .catch(err => {
        console.log(err);
      })
}
exports.getGoogle = passport.authenticate('google',{
  scope: ['profile']
});

exports.getRedirect = passport.authenticate('google'),(req,res,next) => {
  res.send("<h1>Redirect Route</h1>");
};