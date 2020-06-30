let headerMovil = $('#headerMovil')

window.addEventListener('scroll', function() {
    const scroll = window.scrollY
    if (scroll > 50) {
        headerMovil.addClass('visible')
    } else {
        headerMovil.removeClass('visible')
    }
});