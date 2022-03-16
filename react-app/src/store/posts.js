const LOAD = 'posts/LOAD';
const CREATE = 'posts/CREATE';

const load = (posts) => ({
    type: LOAD,
    posts
});

const create = (post) => ({
    type: CREATE,
    post
})

export const loadPosts = () => async dispatch => {
    const response = await fetch('/api/posts/');
    if (response.ok) {
        const posts = await response.json();
        dispatch(load(posts));
    }
}

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
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return { ...action.posts }
        case CREATE:
            const id = action.post.id;
            const post = action.post;
            return { ...state, id: post }
        default:
            return state;
    }
}
