const universityDetail = require("../Models/universityDetail")
const User = require("../Models/userSchema")

const updateUniversity = async (req, res) => {
    try {
        const value = req.body
        const { userId, universityId } = req.query;

        if (userId) {
            const findUser = universityDetail.findOne({ userId });
            if (findUser) {
                const updateDetails = await universityDetail.findByIdAndUpdate({ _id: universityId }, { $set: { ...value } },
                )
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { updateUniversity }