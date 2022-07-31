const {Schema, Types} = require('mongoose');
const  moment  = require('moment');

const ReactionSchema = new Schema(
    {
        // ID is used as foreign key to match it with thoughts
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            validate: [({ length }) => length <= 280, 'Cannot be more than 280 characters!']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm:a')
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;