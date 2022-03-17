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

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
