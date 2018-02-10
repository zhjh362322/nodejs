var userUtil = {
    addUser: function(user) {
        //  新增用户
        // ajax传输数据到后台
        $.ajax({
            url: '/admin/newUser',
            type: 'post',
            data: user,
            success: function(rst, status) {
                if(status === 'success') {
                    $('#userTable').bootstrapTable('refresh');
                    $('#userModal').modal('hide');
                }
            }
        })
    },
    removeUser: function(_ids) {
        $.ajax({
            url: '/admin/removeUser',
            type: 'post',
            data: {
                _ids: _ids
            },
            success: function(rst, status) {
                if(status === 'success')
                    $('#userTable').bootstrapTable('refresh');
            }
        })
    },
    updateUser: function(doc) {
        $.ajax({
            url: '/admin/updateUser',
            type: 'post',
            data: doc,
            success: function(rst, status) {
                if(status === 'success') {
                    $('#updateUser').modal('hide');
                    $('#userTable').bootstrapTable('refresh');
                }
            }
        })
    }
};