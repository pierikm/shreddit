// const CREATE = "comments/CREATE";

// const create = (comment) => ({
//     type: CREATE,
//     comment
// });

// export const loadComments = () => async dispatch => {
//     const response = await fetch(`/api/posts/${postId}/comments`)
//     if (response.ok) {
//         const comments = response.json();
//     }
// }

export const createComment = (payload) => async dispatch => {
    const response = await fetch(`/api/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const comment = response.json();
        // await dispatch(create(comment));
        return comment;
    }
};

export const editComment = (payload, id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const comment = response.json();
        // await dispatch(create(comment));
        return comment;
    }
};

export const deleteComment = (id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const commentId = response.json();
        // await dispatch(create(comment));
        return commentId;
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
