import React from 'react'
import { Input,Container } from 'semantic-ui-react'
import {useQuery, gql, useMutation  } from '@apollo/client';
import {FETCHPOSTS} from '../GraphQl/Queries'
import {CREATEPOST_MUTATION} from '../GraphQl/Mutations'

const initialValues = {
    body:''
}

function AddPost() {
    const [postValue, setPostValue] = React.useState('')
    const [addPostMutation, {loading,error,data}] = useMutation(CREATEPOST_MUTATION,{
        update(){
          setPostValue('')
        }
    });

    function handleClick(e){
        e.preventDefault()
        console.log(postValue)
        addPostMutation({
            variables:{
                body:postValue
            },
           refetchQueries:[{query:FETCHPOSTS}]      
            })
    }
  return (
    <Container>
        <div className="ui  input adjustInput">
        <input type="text" placeholder="Search..." tabIndex={'0'} value={postValue} onChange={(e)=>setPostValue(e.target.value)} />
        <button className="ui primary button addBtn" onClick={handleClick}>Add</button>
        </div>
  </Container>
  )
}



export default AddPost
