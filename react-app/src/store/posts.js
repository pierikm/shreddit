const LOAD = 'posts/LOAD';
const CREATE = 'posts/CREATE';
const EDIT = 'posts/EDIT';
const DELETE = 'posts/DELETE';

const load = (posts) => ({
    type: LOAD,
    posts
});

const create = (post) => ({
    type: CREATE,
    post
});

const edit = (post) => ({
    type: EDIT,
    post
});

const del = (id) => ({
    type: DELETE,
    id
});

export const loadPosts = () => async dispatch => {
    const response = await fetch('/api/posts/');
    if (response.ok) {
        const posts = await response.json();
        dispatch(load(posts));
    }
};

export const createPost = (payload) => async dispatch => {
    const response = await fetch('/api/posts/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const post = response.json();
        await dispatch(create(post));
    }
};

export const editPost = (payload, id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const post = response.json();
        await dispatch(edit(post));
    }
}

export const deletePost = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    })
    if (response.ok) {
        const postId = await response.json();
        await dispatch(del(postId));
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return { ...action.posts }
        case CREATE:
            const id = action.post.id;
            const createPost = action.post;
            return { ...state, id: createPost }
        case EDIT:
            const editState = { ...state };
            const editPost = action.post;
            if (editState[editPost.id]) editState[editPost.id] = editPost;
            return editState;
        case DELETE:
            const deleteState = { ...state };
            if (deleteState[action.id]) delete deleteState[action.id];
            return deleteState;
        default:
            return state;
    }
}
