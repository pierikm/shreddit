const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const signupValidators = (username, email, password, repeatPassword, setErrors) => {
    const errors = [];
    if (username.length < 1) errors.push("Please provide a username.");
    else if (username.length < 2) errors.push("Username must be at least 2 characters.");
    if (username.length > 40) errors.push("Username must be no longer than 40 characters.");
    if (email.length < 1) errors.push("Please provide an email address.");
    else if (!validateEmail(email)) errors.push("Invalid email address.");
    if (password.length < 1) errors.push("Please provide a password.");
    if (password !== repeatPassword) errors.push("Passwords don't match.");
    setErrors(errors);
};

export const safeData = (data) => {
    const newData = [];

    data.forEach(ele => {
        const split = ele.split(" : ");
        // console.log(ele.split(" : "));
        newData.push(split[1]);
    })



    return newData
}
