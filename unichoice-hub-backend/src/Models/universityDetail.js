const mongoose = require("mongoose")

const ReactFormDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    aboutUniversity: {
        type: String,
    },
    totalFaculty: {
        type: Number,
    },
    totalSeats: {
        type: Number,
    },
    totalStudents: {
        type: Number,
    },
    researchOutput: {
        type: String,
        enum: ['Medium', 'High', 'VeryHigh']
    },
    totalCourses: {
        type: Number,
    },
    universityStatus: {
        type: String,
        enum: ['Public', 'Private']
    },
    universityName: {
        type: String,
    },
    universityWebsite: {
        type: String,

    }, universityImage: {
        type: String,

    }, universityLogo: {
        type: String,

    },
},
    { timestamps: true }
)

const universityDetail = mongoose.model("universityDetail", ReactFormDataSchema);
module.exports = universityDetail;