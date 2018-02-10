!function($) {
    //  用户列表
    $('#userTable').bootstrapTable({
        url: '/admin/userTable',
        toolbar: '#toolbar',
        showRefresh: true,
        showToggle: true,
        search: true,
        showColumns: true,
        pagination: true,
        pageList: [5, 10, 15, 20],
        columns: [{
            checkbox: true
        },{
            field: 'uid',
            title: '用户名',
            align: 'center'
        },{
            field: 'name',
            title: '联系人',
            align: 'center'
        }, {
            field: 'status',
            title: '状态',
            align: 'center',
            formatter: function(value) {
                return value ? '正常' : '停用'
            }
        }, {
            field: 'level',
            title: '角色',
            align: 'center',
            formatter: function(value) {
                if(value < 50)
                    return '普通帐号';
                return '管理员';
            }
        }],
        onDblClickRow: function(row) {
            $('#userModal').on('show.bs.modal', function() {
                $('#uid').val(row.uid);
                $('#password').val(row.password);
                $('#name').val(row.name);
                $('#level').val(row.level);
                $('#status').val(row.status);
                $('#_id').val(row._id);
                $('.settingUser').hide();
                $('.newUser').hide();
                $('.updateUser').show();
            })
            $('#userModal').modal('show');
        }
    });
//  新增打开模态框
    $('#showNewUserModal').click(function() {
        $('#userModal').on('show.bs.modal', function() {
            $('.settingUser').hide();
            $('.updateUser').hide();
            $('.newUser').show();
        })
        $('#userModal').modal('show');
    });
//  新增用户
    $('#newUser').click(function() {
        // 获取表单数据，拼接成json格式
        var data = {};
        var formData = $("#userModal form").serializeArray();
        formData.forEach(function (obj) {
            data[obj.name] = obj.value;
        });
        userUtil.addUser(data);
    });
//  删除用户
    $('#remove').click(function () {
        //  获取被勾选的记录
        var rows = $("#userTable").bootstrapTable('getSelections');
        if(rows === 0) {
            return;
        }
        var _ids = [];
        for(var i = 0; i < rows.length; i++) {
            _ids[i] = rows[i]._id;
        }
        userUtil.removeUser(_ids.join(','));
    });
//  更新用户
    $('#updateUser').click(function() {
        var _id = $('#_id').val();
        var doc = {};
        var formData = $('#userModal form').serializeArray();
        formData.forEach(function(obj) {
            doc[obj.name] = obj.value;
        });
        doc['_id'] = _id;
        userUtil.updateUser(doc);
    });
}(window.jQuery)