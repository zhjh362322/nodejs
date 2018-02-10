var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: 'a123456'
    },
    name: String,
    level: Number,
    status: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function(next) {
   if(this.isNew) {
       this.meta.updateAt = this.meta.createAt = Date.now();
   } else {
       this.meta.updateAt = Date.now();
   }
   next()
});

UserSchema.statics = {
    fetch: function(cb) {
        return this.find({}, {meta: 0})
            .sort('meta.createAt')
            .exec(cb);
    },
    findByUid: function(uid, cb) {
        return this.findOne({uid: uid}, {meta: 0})
            .exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}, {meta: 0, password: 0})
            .exec(cb);
    },
    removeMany: function(_ids, cb) {
        return this.remove({_id: {$in: _ids}})
            .exec(cb);
    },
    updateById: function(_id, doc, cb) {
        return this.update({_id: _id}, doc)
            .exec(cb);
    }
};

module.exports = UserSchema;