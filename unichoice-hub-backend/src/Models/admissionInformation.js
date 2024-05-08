const mongoose = require("mongoose")

const ReactFormDataSchema = new mongoose.Schema({
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "universityDetail"
    },
    aboutAdmission: {
        type: String
    },
    courseName: {
        type: String
    },
    seatIntakes: {
        type: Number
    },
    marksRequired: {
        type: Number
    },
    acceptingExams: {
        type: String
    },
    scholarships: {
        type: String
    },
    totalFees: {
        type: Number
    }
})

const admissionInformation = mongoose.model("admissionInformation", ReactFormDataSchema);
module.exports = admissionInformation;