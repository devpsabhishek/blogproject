var express=require('express');
var router=express.Router();
const mongoose = require('mongoose');
var router=express.Router();
const Topicmanager=require('./model/topicmanagerschema');
const topicuser=require('./model/topicschms')
const Articleuser=require('./model/articleschema')
var flagtopicmanager=0;


router.get('/topicmanager',function(req,res)
   {
      if(flagtopicmanager==1)
      {
        res.render('hometopicmanager',{message:"Not logged Please Login"});
        flagtopicmanager=0;
      }
       else
       res.render('hometopicmanager');

   });

   router.post('/topicmanager',function(req,res)
   {
    if(!req.body.userid || !req.body.password)
    {
        res.render('hometopicmanager',
        {
          message:"Please enter UserId and password"
         });
    }
     else
     {
      Topicmanager.find(function(err, response)
         {
           datastopicmanager=response;
           console.log( datastopicmanager);
           const topicmanager= datastopicmanager.filter(function(user)
           {
             if(user.userid== req.body.userid && user.password == req.body.password)
             {
                 return true;
             }
            });
          if(!topicmanager[0])
          {
            res.render("hometopicmanager", { message: "Sorry,User not found" });
          }
         else
         {
          console.log(topicmanager);
            req.session.topicmanager= topicmanager[0];
            console.log("session" + req.session.topicmanager);
            res.redirect('/topicmanagerdashboard'); 
            
         }
        
         });
    }
   });


   //check  sessions

   router.use('/topicmanagerdashboard', function( req, res, next)
 {
    if(req.session.topicmanager){
        next(); 
            //If session exists, proceed to page
     } 
     else
      {
        var err ={message:"Not logged Please Login"}
        console.log(1);
        flagtopicmanger=1;
        console.log(err);
        next(err);
     }
    });
    router.use('/topicmanagerdashboard', function(err, req, res, next){
        console.log(1);
        //let st=err.message;
        //console.log(st);
        res.redirect('/topicmanager');
        });


router.get('/topicmanagerdashboard',function(req,res)
{
    res.render('topicmanagerdashboardpage',{name:req.session.topicmanager.name});

})



//logout

router.get('/logouttopicmanager',function(req,res)
{
    req.session.destroy(function(){
        console.log("user logged out.")
        
    });
    res.redirect('/topicmanager');

});


//get article of that topic manager


router.get('/managetopicarticles',function(req,res){
  const subject=req.session.topicmanager.subject;
  console.log("sessioncontent" + req.session.topicmanager);
  console.log(req.session.subject);
   Articleuser.find({subject:subject},function(err,response)
   {
    const data=response;
    console.log(data);
    res.render('topicmanageracceptrejectartcles',{data1:data}) 
   });
})


//when accepted user article approved become 1

router.get('/acceptarticle/:id',function(req,res){
 const approved=1;
  console.log(4);
   Articleuser.findByIdAndUpdate(req.params.id, {$set:{approved:1}}, function(err, response)
   {
    const data=response;
    console.log(data);
    res.redirect('/managetopicarticles');
   });
})

//when rejected user article approved become 0

router.get('/rejectarticle/:id',function(req,res){
  const approved=1;
   console.log(4);
    Articleuser.findByIdAndUpdate(req.params.id, {$set:{approved:0}}, function(err, response)
    {
     const data=response;
     console.log(data);
     res.redirect('/managetopicarticles');
    });
 })



  module.exports = router;