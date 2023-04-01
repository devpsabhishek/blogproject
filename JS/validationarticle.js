function validate()
{
  let titlevalue,articlevalue,subjectvalue,descriptionvalue;

   
   articlevalue=document.getElementById("article").value;
   titlevalue=document.getElementById("title").value;
    subjectvalue=document.getElementById("subject").value;
    
   descriptionvalue=document.getElementById("description").value;
     
     if(articlevalue == "")
    {
        document.getElementById("validationwrite").innerHTML="Please enter article";
        document.getElementById("validationwrite").style.display="block";
        return false;
    }
  
    else if(titlevalue == "")
    {
        document.getElementById("validationwrite").innerHTML="Please enter title";
        document.getElementById("validationwrite").style.display="block";
        return false;
    }
    
    else if(subjectvalue == "")
    {
      document.getElementById("validationwrite").innerHTML="Please select subject";
        document.getElementById("validationwrite").style.display="block";
        return false;

    }
    else if(descriptionvalue == "")
    {
      document.getElementById("validationwrite").innerHTML="Please enter description";
        document.getElementById("validationwrite").style.display="block";
        return false;

    }

    else
    {

    
       // document.getElementById("formsubmit").submit();
   
        document.getElementById("validationwrite").style.display="none";
       
        return true;
    
    
    }



}