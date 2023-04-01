import {gql } from '@apollo/client';

export var FETCHPOSTS = gql`
{
  Posts{
    body
    username
    id
    commentCount
    likeCount,
    comments {
      username
      id
      body
      createdAt
    }
  }
}`

