const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
        username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
        email: {
        type: String,
        unique: true, 
        required: true,
        // match email
        match: [/.+\@.+\..+/]
    },
        // thoughts
        thoughts: [
        {
            type: Schema.Types.ObjectId,
            // referring to thoughts
            ref: 'Thought'
        }
        ],
        friends: [
        {
            type: Schema.Types.ObjectId,
            // referring to user
            ref: 'User'
        }
        ]
    },
{
    toJSON: {
        virtuals: true
    },
    id: false
});

// friend count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;