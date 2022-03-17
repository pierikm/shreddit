const isValidHttpUrl = (string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export const validatePost = (postType, title, description, imageUrl, setErrors) => {
    const errors = [];
    if (title.length < 3) errors.push("Title can't be fewer than 3 characters.");
    if (postType === "text" && description.length < 3) errors.push("Description can't be fewer than 3 characters.");
    if (postType === "image" && !isValidHttpUrl(imageUrl)) errors.push("Image URL is invalid");
    setErrors(errors);
};
