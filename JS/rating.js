function rating1()
{
    document.querySelector('jsuites-rating').addEventListener('onchange', function(e) {
    document.getElementById('rating').value = this.value;
    document.getElementById("formsubmit").submit();
    return true;
});
}