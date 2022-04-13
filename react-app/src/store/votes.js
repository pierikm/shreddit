// const LOAD = "votes/LOAD";
// const CREATE = "votes/CREATE";
// const DELETE = "votes/DELETE";

// const load = (votes) => ({
//     type: LOAD,
//     votes
// });

// const create = (vote, postId) => ({
//     type: CREATE,
//     vote,
//     postId
// });

// const del = (postId) => ({
//     type: DELETE,
//     postId
// });


// export const loadVotes = () => async dispatch => {
//     const response = await fetch(`/api/votes/`)
//     if (response.ok) {
//         const votes = await response.json();
//         await dispatch(load(votes));
//         return votes;
//     }
// };

// export const createVote = (payload, postId) => async dispatch => {
//     const response = await fetch(`/api/posts/${postId}/votes`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//     });
//     if (response.ok) {
//         const vote = await response.json();
//         await dispatch(create(vote, postId));
//         return vote;
//     }
// };


// export const deleteVote = (id) => async dispatch => {
//     const response = await fetch(`/api/votes/${id}`, {
//         method: "DELETE"
//     });
//     if (response.ok) {
//         const postId = await response.json();
//         await dispatch(del(postId));
//         return postId;
//     }
// };

// const initialState = {};

// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case LOAD:
//             const loadState = { ...action.votes };
//             return loadState;
//         case CREATE:
//             return { ...state, ...action.vote }
//         case DELETE:
//             const deleteState = { ...state };
//             if (deleteState[action.postId]) delete deleteState[action.postId];
//             return deleteState;
//         default:
//             return state;
//     }
// }
