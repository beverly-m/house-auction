const Yup = require("yup");

const formSchema = Yup.object({
    email: Yup.string()
    .required("Email required")
    .email("Invalid email address")
    .max(100, "Email address too long."),
    password: Yup.string()
    .required("Password required")
    .min(6, "Password at least 6 characters")
}) 

const validateForm = (req, res) => {
    const formData = req.body;
    formSchema.validate(formData.vals)
    .catch(err => {
        console.log(err.errors);
        return res.status(422);
    })
    .then(valid => {
        if (valid) {
            console.log("Good to go!");
        }
    })
}

module.exports = validateForm;