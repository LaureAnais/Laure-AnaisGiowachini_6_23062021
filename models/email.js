/* const emailVerifySchema = new emailValidator();
const validateEmail = function(email) {
    let re = ^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
    return re.test(email)
};

// Add properties to it
emailVerifySchema {
    type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/, 'Please fill a valid email address']
};

module.exports = emailVerifySchema; */
