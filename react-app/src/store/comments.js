const CREATE = "comments/CREATE";

const create = (comment) => ({
    type: CREATE,
    comment
});

export const createComment = (payload) => async dispatch => {
    const response = await fetch(`/api/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const comment = response.json();
        await dispatch(create(comment));
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:

        case CREATE:
            const id = action.comment.id;
            const createComment = action.comment;
            const createState = { ...state, id: createComment };
            return
        case EDIT:

        case DELETE:

        default:
            return state;
    }
}
