import { useMutation } from '@apollo/client'
import React, { useState, useContext } from 'react'
import { ADDCOMMENTMUTATION } from '../GraphQl/Mutations'

import { FETCHPOSTS } from '../GraphQl/Queries'
import { AuthContext } from '../Context/Auth';

function Comments({ postId, comments }) {
    const { user } = useContext(AuthContext)
    const [commentBody, setcommentBody] = useState('')

    const [addComment, { loading, error, data }] = useMutation(ADDCOMMENTMUTATION, {
        onError(err) {
            // setErrors(err.graphQLErrors[0]?.extensions.error)
            console.log(err)
        },
        update(result) {
            setcommentBody('')
        }
    })

    function handleComment() {
        addComment({
            variables: {
                postId: postId,
                body: commentBody
            },
            refetchQueries: [FETCHPOSTS]
        })
    }

    return (
        <div>
            <div className="ui comments">
                <h3 className="ui dividing header">Comments</h3>
                {
                    comments.map(comment => (
                        <div className="comment" key={comment.id}>
                            <a className="avatar">
                                <img src="https://semantic-ui.com/images/avatar/small/matt.jpg" />
                            </a>
                            <div className="content">
                                <a className="author">{comment.username}</a>
                                <div className="metadata">
                                    <span className="date">Today at 5:42PM</span>
                                </div>
                                <div className="text">
                                    {comment.body}
                                </div>
                            </div>
                        </div>
                    ))
                }

                {
                    user && (<form className="ui reply form">
                        <div className="field">
                            <input value={commentBody} onChange={(e) => setcommentBody(e.target.value)} />
                        </div>
                        <div className="ui blue labeled submit icon button" onClick={handleComment}>
                            <i className="icon edit"></i> Add Comment
                        </div>
                    </form>)
                }

            </div>
        </div>
    )
}

export default Comments