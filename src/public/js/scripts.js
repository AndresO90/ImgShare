//para que el boton comentar muestre la card de comentarios que está escondida
$('#post-comment').hide(); //establecemos hide para esconder
$('#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle(); //muestra algo escondido con slide
})


$('#btn-like').click(function(e) {
e.preventDefault();
let imgId = $(this).data('id');

$.post('/images/' + imgId + '/like')
.done(data=> {
    //console.log(data);
    $('.likes-count').text(data.likes);
})
})

$('#btn-delete').click(function(e) {
    e.preventDefault(); 
    let $this = $(this);
   const response = confirm('Are you Sure you want to delete this image?');
   if(response) {
       let imageId = $this.data('id');
       $.ajax({
           url:'/images/' + imageId,
           type: 'DELETE'
       })
       .done(function(result){
           console.log(result);
           $this.removeClass('btn-danger').addClass('btn-success'); //cambiamos el boton a verde para que sepa que se elimno
           $this.find('i').removeClass('fa-times').addClass('fa-check');//cambiamos el icono X por un check
       })
   }
    
   
    })
    