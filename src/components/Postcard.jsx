import React from 'react'
import PostContainer from './PostContainer.';

function Postcard({posts}) {
    return (
        <>
            {
                posts.map(post => (
                    <PostContainer key={post.id} post={post}/>
                ))
            }

        </>
    )
}




export default Postcard