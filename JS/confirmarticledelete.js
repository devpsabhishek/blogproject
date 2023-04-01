function confirm2(id){    
    const result = confirm('do you want to delete user' )   
 if(result)
 {      
    location.href='/Deletearticle/'+id     
    return true 
}      
 else
 {       return false  
  }   
}
