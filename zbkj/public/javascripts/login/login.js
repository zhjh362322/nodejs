$(function() {
    $('#login').click(function() {
        var data = {};
        var formData = $('form').serializeArray();
        formData.forEach(function(obj, idx) {
            data[obj.name] = obj.value
        })
        $.ajax({
            url: '/',
            type: 'post',
            data: data,
            success: function(rst, status) {
                if(status === 'success') {
                    location.href = '/index'
                }
            },
            error: function(rst, status) {
                location.href = '/'
            }
        })
    })
})