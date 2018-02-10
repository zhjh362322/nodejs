!function($) {
    $('#setting').click(function(e) {
        var user = e.currentTarget.dataset.user;
        var userObj = JSON.parse(user);
        $('#userModal').on('show.bs.modal', function() {
            $('#uid').val(userObj.uid);
            $('#password').val(userObj.password);
            $('#name').val(userObj.name);
            $('#_id').val(userObj._id);
            $('.newUser').hide();
            $('.updateUser').hide();
            $('.settingUser').show();
        });
        $('#userModal').modal('show');
    });
    $('#updateUser').click(function() {
        var _id = $('#_id').val();
        var doc = {};
        var formData = $('#userModal form').serializeArray();
        formData.forEach(function(obj) {
            doc[obj.name] = obj.value;
        });
        doc['_id'] = _id;
        $.ajax({
            url: '/admin/updateUser',
            type: 'post',
            data: doc,
            success: function(rst, status) {
                if(status === 'success') {
                    $('#userModal').modal('hide');
                    $().alert()
                }
            }
        })
    });
}(window.jQuery)