import {gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
mutation Login($logininput: LoginInput) {
  login(logininput: $logininput) {
    username
    token
    id
  }
}
`

export const REGISTER_MUTATION = gql`
mutation Register($registerinput: RegisterInput) {
  register(registerinput: $registerinput) {
    email
    token
    username
    id
    createdAt
  }
}
`
export const CREATEPOST_MUTATION = gql`
mutation CreatePost($body: String!) {
    createPost(body: $body) {
      body
    }
  }
`
export const LIKEMUTATION =gql`
mutation AddLike($postId: String!) {
    addLike(postId: $postId) {
        likeCount
    }
}
`

export const ADDCOMMENTMUTATION = gql`
mutation AddComment($postId: String!, $body: String!) {
  addComment(postId: $postId, body: $body) {
    comments {
      username
      body
    }
  }
}
`
export const DELETEPOSTMUTATION = gql`
mutation DeletePost($postId: String!) {
  deletePost(postId: $postId){
    msg
  }
}`