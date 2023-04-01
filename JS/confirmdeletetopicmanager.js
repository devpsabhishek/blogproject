function confirm4(id){    
    const result = confirm('do you want to delete user' )   
 if(result)
 {      
    location.href='/Deletetopicmanager/'+id     
    return true 
}      
 else
 {       return false  
  }   
}
