var express=require('express');
var router=express.Router();
const mongoose = require('mongoose');
var router=express.Router();
var flagadmin=0;

const Topicmanager=require('./model/topicmanagerschema');
const topicuser=require('./model/topicschms')
const adminuser=require('./model/adminschema')
 


  
//get admin sign in page
  
  router.get('/admin',function(req,res)
   {
      if(flagadmin==1)
      {
        res.render('homeadmin',{message:"Not logged Please Login"});
        flagadmin=0;
      }
       else
       res.render('homeadmin');

   });


   router.post('/admin',function(req,res)
   {
    if(!req.body.userid || !req.body.password)
    {
        res.render('homeadmin',
        {
          message:"Please enter UserId and password"
         });
    }
     else
     {
        adminuser.find(function(err, response)
         {
           datasadmin=response;
           console.log(datasadmin);
           const admin=datasadmin.filter(function(user)
           {
             if(user.userid== req.body.userid && user.password == req.body.password)
             {
                 return true;
             }
            });
          if(!admin[0])
          {
            res.render("homeadmin", { message: "Sorry,User not found" });
          }
         else
         {
            req.session.admin = datasadmin[0];
            console.log("session" + req.session.admin);
            res.redirect('/admindashboard'); 
         }
        
         });
    }
   });


   

//check  sessions

   router.use('/admindashboard', function( req, res, next)
 {
    if(req.session.admin){
        next(); 
            //If session exists, proceed to page
     } 
     else
      {
        var err ={message:"Not logged Please Login"}
        console.log(1);
        flagadmin=1;
        console.log(err);
        next(err);
     }
    });
    router.use('/admindashboard', function(err, req, res, next){
        console.log(1);
        res.redirect('/admin');
        });


router.get('/admindashboard',function(req,res)
{
    res.render('admindashboardpage');

})

//logout admin

router.get('/logoutadmin',function(req,res)
{
    req.session.destroy(function(){
        console.log("admin logged out.")
        
    });
    res.redirect('/admin');

});




//manage topics


router.get('/managetopics',function(req,res)
{
    topicuser.find(function(err, response){
     
        //res.json(response);
        const data=response;
        //console.log(data);
        res.render('admineditdeleteaddtopic',{topic:data})
           
        }); 

});
//edittopics

router.get('/Edittopic/:id',function(req,res)
{
    console.log(1);
    console.log(req.params.id);
    topicuser.findById(req.params.id,function(err,response)
    
    {
        
           console.log(response);
           const topic=response;
           console.log(topic);
           if(err)
            res.render('admineditingtopicform',{message:"Database error"});

            else{
                
            
            res.render('admineditingtopicform',{id:req.params.id,subject:topic.subject});

            }
    });

    
})


//after editing change db also and show edited db
router.post('/Edittopic/:id',function(req,res)
{
   console.log(2);
   console.log(req.params.id);
   console.log(req.body);
   topicuser.findByIdAndUpdate(req.params.id, req.body, function(err, response){
       if(err) 
       res.send(err);
       else
       {
         console.log(response);
       res.redirect('/managetopics');
       }
    });
 });


 //admi deletetopic


 router.get('/Deletetopic/:id',function(req,res)
 {
     console.log(1);
     console.log(req.params.id);
     topicuser.findByIdAndRemove(req.params.id,function(err,response)
     
     {
         
            console.log(response);
            const deletetopicdetails=response;
            console.log(deletetopicdetails);
            if(err)
             res.send('error')
             else
               res.redirect('/managetopics');
            
 
     })
 
     
 })



 //after click add topic get one form to add topic

router.get('/addtopic', function(req, res){
    
     if(req.session.admin)
      {
        

        res.render('adminaddtopic');

      }
      else
      {
        res.redirect('/admin');
      }

       
  
   });


 //save the article in db

 router.post('/topicpost', function(req, res)
 {
    
    var topicInfo = req.body; //Get the parsed information
    console.log(topicInfo);

   
    
    if(!topicInfo.subject)
    {
        console.log(1);
       res.render('adminaddtopic');
    } 
    else
    {
        var newtopic = new topicuser
        ({
            subject:topicInfo.subject

        })
        newtopic.save(function(err, Person){
              
              if(err)
                  res.send(err);
              else
              { 
                  //req.session.user = newPerson
                  res.redirect('/managetopics')
                
                  //  , {message: "New person added", type:"success", person: personInfo});
  
              }
            });
    }    
       
        
 });







//add edit delete topic managers

router.get('/managetopicamanagers', function(req, res){
  var topic;
  Topicmanager.find(function(err, response){
     
  
   const data=response;
   console.log(data);
   topicuser.find(function(err2, response2){
    const topic_data=response2;
       
      res.render('adminaddeditdeletetopicmanager',{topicmanager:data,topic:topic_data})
   });
  });
   
   
});

router.get('/addtopicmanagers',function(req,res){
  var topics;
  topicuser.find(function(err,response)
  {
      console.log(1);
       topics=response;
       console.log(topics);;
       res.render('addtopicmanager',{topic:topics});
   
  })
 

});
//addtopic managers
router.post('/addtopicmanagers',function(req,res)
{
 var topicmangerlist=req.body;
  if(!topicmangerlist.userid||!topicmangerlist.password||!topicmangerlist.name||!topicmangerlist.subject)
   {
      res.render('addtopicmanager',{message2:"Please fill full fields"});

   }
   else
   {
      Topicmanager.find(function(err, response){
      var data=response;
         const registertopicmanger=data.filter(function(value)
         {
          if(value.userid == topicmangerlist.userid)
          {
              return value.userid;
          }
         }); 
      
       
        if(!registertopicmanger[0])
        {
            var date=Date.now();
            var newtopicmanagerinfo=new Topicmanager(
            {
             
              userid:topicmangerlist.userid,
              password:topicmangerlist.password,
              name:topicmangerlist.name,
              subject:topicmangerlist.subject,
              current_date:date


            });
             newtopicmanagerinfo.save(function(err,response)
             {
                if(err)
                  res.send('err')
              else
              {
               res.redirect("/managetopicamanagers");  
               
              }
             });
          }
     
        });

      }
  });


  
  //edittopicmangers

router.get('/Edittopicmanager/:id',function(req,res)
{
    console.log(1);
    console.log(req.params.id);
    Topicmanager.findById(req.params.id,function(err,response)
    
    {
        
           console.log(response);
           const topicmanager=response;
           console.log(topicmanager);
            if(err)
              res.render('admineditingtopicmanagerform',{message:"Database error"});

             else
             {
              topicuser.find({_id:topicmanager.subject},function(err,response)
              {
                correspondingtopic=response;
                console.log("correspondingtopic"+ correspondingtopic);
              topicuser.find(function(err,response)
               {
                  if(err)
                      res.send(err)
                  else
                   {
                       topic=response;
                       
                
                        res.render('admineditingtopicmanagerform',{id:req.params.id,name:topicmanager.name,subjectid:topicmanager.subject,topic1:correspondingtopic.subject,subject:topic});
                   }
                 });
                });

              }
    });
  });


 //after editing change db also and show edited db
router.post('/Edittopicmanager/:id',function(req,res)
{
   console.log(2);
   console.log(req.params.id);
   console.log(req.body);
   Topicmanager.findByIdAndUpdate(req.params.id, req.body, function(err, response){
       if(err) 
       res.send(err);
       else
       {
         console.log(response);
       res.redirect('/managetopicamanagers');
       }
    });
 });



 //admi deletetopicmanagers


 router.get('/Deletetopicmanager/:id',function(req,res)
 {
     console.log(1);
     console.log(req.params.id);
     Topicmanager.findByIdAndRemove(req.params.id,function(err,response)
     
     {
         
            console.log(response);
            const deletetopicmanagerdetails=response;
            console.log(deletetopicmanagerdetails);
            if(err)
             res.send('error')
             else
               res.redirect('/managetopicamanagers');
            
 
     })
 
     
 })

module.exports = router;