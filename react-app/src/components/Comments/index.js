function Comment({ comment }) {

    return (
        <>
            <div>{comment.user.username}</div>
            <p>{comment.content}</p>
        </>
    )
}

export default Comment;
