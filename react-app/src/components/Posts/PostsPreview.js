function PostPreview({ post }) {
    return (
        <li>
            <span>{post.score}</span>
            <h2>{post.title}</h2>
            <span>{post.username}</span>
        </li>
    )
}

export default PostPreview
