const { compareSync } = require("bcrypt");
const admissionInformation = require("../Models/admissionInformation")

const universityAdmission = async (req, res) => {
    try {
        const { courseInput, previousYear, currentYear, ...values } = req.body
        const { universityId } = req.query;

        if (universityId) {

            const admissionData = new admissionInformation({
                ...values,
                universityId
            })
            const response = admissionInformation.create(admissionData)
            if (response) {
                return res.json({
                    code: 200,
                    message: "Successfully Added !!"
                })
            }
        } else {
            return res.json({
                code: 400,
                message: "Something went wrong !!"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { universityAdmission }