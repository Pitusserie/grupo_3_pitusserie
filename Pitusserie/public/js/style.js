let headerMovil = $('#headerMovil')

window.addEventListener('scroll', function() {
    const scroll = window.scrollY
    if (scroll > 400) {
        headerMovil.addClass('visible')
    } else {
        headerMovil.removeClass('visible')
    }
});