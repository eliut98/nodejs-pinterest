$('.card-img-top').click(function(e) {
    let image = e.target;
    $('.modal-title').html(image.alt);
    $('.modal-body img').attr( "src", image.src);
    $('.desc').html(image.title);
});