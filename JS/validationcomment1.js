function validation(id,typeuser,email)
{
    const email1=email;
    const id1=id
    const typeuser1=typeuser;
    if(typeuser1 == "premiumuser")
    {
        document.getElementById("commentlabel").style.display="block";
        document.getElementById("comments").style.display="block";
        document.getElementById("ratinglabel").style.display="block";
        document.getElementById("rating").style.display="block";
        return true;   
    }
}