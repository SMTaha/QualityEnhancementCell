const   
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    identity = 'Surveys',
    survey = {
        id: Number, 
        selection: String, 
        value: Number,
        type: {type: String, default: 'direct'}
    },
    surveySchema = new Schema({
        created: { type: Schema.Types.Date, default: Date.now },
        evaluation: { type: String, maxlength: 30, trim: true },
        target: { type: String, maxlength: 30, trim: true },
        survey: [survey]

    },{collection: identity})
    model = mongoose.model(identity, surveySchema);

module.exports = model;