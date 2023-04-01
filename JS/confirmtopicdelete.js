function confirm3(id){    
    const result = confirm('do you want to delete user' )   
 if(result)
 {      
    location.href='/Deletetopic/'+id     
    return true 
}      
 else
 {       return false  
  }   
}
