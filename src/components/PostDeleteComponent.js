import React from 'react'
import { DELETEPOSTMUTATION, LIKEMUTATION } from '../GraphQl/Mutations'
import { FETCHPOSTS } from '../GraphQl/Queries';
import { useMutation } from '@apollo/client';
function PostDeleteComponent({postid}) {
    const [likeMutation, { loading, error, data }] = useMutation(DELETEPOSTMUTATION, {
        onError(err) {
            console.log(err)
        },
    });
function handledeleteClick(e,id) {
    e.preventDefault()
    console.log('handle Click')
    likeMutation({
        variables: {
            postId: id
        },
        refetchQueries:[FETCHPOSTS]
    });
    }
  return (
    <i class="large trash alternate icon red End" onClick={e=>handledeleteClick(e,postid)}></i>
  )
}

export default PostDeleteComponent