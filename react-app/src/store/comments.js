const LOAD = "comments/LOAD";
const CREATE = "comments/CREATE";
const EDIT = "comments/EDIT";
const DELETE = "comments/DELETE";

const load = (comments) => ({
    type: LOAD,
    comments
});

const create = (comment) => ({
    type: CREATE,
    comment
});

const edit = (comment) => ({
    type: EDIT,
    comment
});

const del = (id) => ({
    type: DELETE,
    id
});

export const postLoadComments = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/comments`)
    if (response.ok) {
        const comments = await response.json();
        await dispatch(load(comments));
        return comments;
    }
};

export const userLoadComments = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/comments`)
    if (response.ok) {
        const comments = await response.json();
        await dispatch(load(comments));
        return comments;
    }
};

export const createComment = (payload) => async dispatch => {
    const response = await fetch(`/api/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const comment = await response.json();
        await dispatch(create(comment));
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
        const comment = await response.json();
        await dispatch(edit(comment));
        return comment;
    }
};

export const deleteComment = (id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const commentId = response.json();
        await dispatch(del(commentId));
        return commentId;
    }
};

export const createVote = (payload, commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}/votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const comment = await response.json();
        await dispatch(edit(comment));
        return comment;
    }
};

export const editVote = (payload, id) => async dispatch => {
    const response = await fetch(`/api/comment_votes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const comment = await response.json();
        await dispatch(edit(comment));
        return comment;
    }
};

export const deleteVote = (id) => async dispatch => {
    const response = await fetch(`/api/comment_votes/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const comment = await response.json();
        await dispatch(edit(comment));
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            const loadState = { ...action.comments };
            return loadState;
        case EDIT:
            const editState = { ...state };
            if (editState[action.comment.id]) editState[action.comment.id] = action.comment;
            return editState;
        case DELETE:
            const deleteState = { ...state };
            if (deleteState[action.id]) delete deleteState[action.id];
            return deleteState;
        default:
            return state;
    }
}
