const LOAD = 'posts/LOAD';
const LOAD_SINGLE = 'posts/LOAD_SINGLE';
const CREATE = 'posts/CREATE';
const EDIT = 'posts/EDIT';
const DELETE = 'posts/DELETE';

const load = (posts) => ({
    type: LOAD,
    posts
});

const loadSingle = (post) => ({
    type: LOAD_SINGLE,
    post
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

export const loadSinglePost = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`);
    if (response.ok) {
        const post = await response.json();
        dispatch(loadSingle(post));
    }
};

export const createPost = (payload) => async dispatch => {
    const response = await fetch('/api/posts/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const post = await response.json();
        await dispatch(create(post));
        return post;
    }
};

export const editPost = (payload, id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const post = await response.json();
        await dispatch(edit(post));
    }
};

export const deletePost = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    })
    if (response.ok) {
        const postId = await response.json();
        await dispatch(del(postId));
    }
};

export const createVote = (payload, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const post = await response.json();
        await dispatch(edit(post));
        return post;
    }
};

export const editVote = (payload, id) => async dispatch => {
    const response = await fetch(`/api/votes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const post = await response.json();
        await dispatch(edit(post));
        return post;
    }
};

export const deleteVote = (id) => async dispatch => {
    const response = await fetch(`/api/votes/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const post = await response.json();
        await dispatch(edit(post));
        return post;
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return { ...action.posts }
        case LOAD_SINGLE:
            const singleState = { ...state };
            const singlePost = action.post;
            singleState[singlePost.id] = singlePost;
            return singleState;
        case CREATE:
            const id = action.post.id;
            const createPost = action.post;
            const createState = { ...state };
            createState[id] = createPost
            return createState;
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
