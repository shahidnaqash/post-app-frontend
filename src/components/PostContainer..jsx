import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client';
import { Grid, Card, Image, Button, Icon, Label, } from 'semantic-ui-react'

import { DELETEPOSTMUTATION, LIKEMUTATION } from '../GraphQl/Mutations'
import Comments from './Comments';
import { AuthContext } from '../Context/Auth';
import { FETCHPOSTS } from '../GraphQl/Queries';
import PostDeleteComponent from './PostDeleteComponent';

function PostContainer({ post }) {
    const { user } = useContext(AuthContext)
    const [toggleComment, settoggleComment] = useState(false)

    const [likeMutation, { loading, error, data }] = useMutation(LIKEMUTATION, {
        onError(err) {
            console.log(err.message)
        },
    });

    function handleLike(id) {
        console.log(id)
        likeMutation({
            variables: {
                postId: id
            }
        })
    }

    return (
        <Grid.Row >
            <Grid.Column   >
                <Card centered className='cardWidth'>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src='https://www.w3schools.com/howto/img_avatar.png'
                        />
                        <Card.Header>{post.username}</Card.Header>
                        <Card.Description>
                            {post.body}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>

                        <Button as='div' labelPosition='right' size='mini'>
                            <Button color='red' size='mini' onClick={e => handleLike(post.id)} >
                                <Icon name='heart' />
                            </Button>
                            <Label as='a' basic color='red' pointing='left'>
                                {post.likeCount}
                            </Label>
                        </Button>

                        <Button as='div' labelPosition='right' size='mini'>

                            <Button color='blue' size='mini' onClick={e => settoggleComment(!toggleComment)}>
                                <i className="comments outline icon"></i>
                            </Button>
                            <Label as='a' basic color='blue' pointing='left'>
                                {post.commentCount}
                            </Label>
                        </Button>
                        {
                            user && post.username == user?.username && <PostDeleteComponent postid ={post.id} />
                        }
                        
                    </Card.Content>
                    {
                        toggleComment && (<div className='p-10'><Comments postId={post.id} comments={post.comments} /> </div>)
                    }


                </Card>
            </Grid.Column>

        </Grid.Row>
    )
}

export default PostContainer