const mongoose = require("mongoose")

const ReactFormDataSchema = new mongoose.Schema({
    cuttoffCourses: {
        type: String
    },
    cuttoffCurrentYear: {
        type: Number
    },
    cuttoffPrevriousYear: {
        type: Number
    }
},
    { timestamps: true }
)


const cutoff = mongoose.model("cutoff", ReactFormDataSchema);
module.exports = cutoff;