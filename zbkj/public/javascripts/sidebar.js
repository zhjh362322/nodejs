!function ($) {
    $(document).on('click', 'ul.nav li.parent > a > span.icon', function() {
        $(this).find('em:first').toggleClass('glyphicon-minus');
    });
    $('#aaa').click(function(e) {
        $('.dropdown-toggle').dropdown()
    })
}(window.jQuery);