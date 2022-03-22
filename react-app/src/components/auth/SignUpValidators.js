const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const signupValidators = (username, email, password, repeatPassword, setErrors) => {
    const errors = [];
    if (username.length < 2) errors.push("username: Must be longer than 1 character");
    if (username.length > 40) errors.push("username: Must be no longer than 40 characters");
    if (!validateEmail(email)) errors.push("email: Invalid email address");
    if (password !== repeatPassword) errors.push("password: Passwords don't match");
    setErrors(errors);
};
