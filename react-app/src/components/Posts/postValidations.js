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
    if (title.length > 255) errors.push("Title can't be more than 255 characters.");
    if (postType === "text" && description.length < 3) errors.push("Description can't be fewer than 3 characters.");
    if (postType === "text" && description.length > 5000) errors.push("Description can't be more than 5000 characters.");
    if (postType === "image" && !isValidHttpUrl(imageUrl)) errors.push("Image URL is invalid.");
    if (postType === "image" && imageUrl.length > 255) errors.push("Image URL can't be more than 255 characters.");
    setErrors(errors);
};
