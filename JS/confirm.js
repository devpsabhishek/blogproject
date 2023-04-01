function confirm1(id){    
     const result = confirm('do you want to delete user' )   
  if(result)
  {      
     location.href='/Delete/'+id     
     return true 
 }      
  else
  {       return false  
   }   
 }
