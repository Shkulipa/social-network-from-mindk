export default function Article({post}) {
    return (
        <>
            {post.map(({description, user_id, post_id}) => (
                <div>
                    Article ID: {post_id}<br/><br/>
                    Post of user ID: {user_id}<br/><br/>
                    Description: {description}
                </div>
            ))}
        </>
    );
}

