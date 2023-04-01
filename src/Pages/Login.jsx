import React,{useState,useContext} from 'react'
import { Button, Form,Message } from 'semantic-ui-react'
import {useMutation  } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/Auth';
import {LOGIN_MUTATION} from '../GraphQl/Mutations'


const initialValues = {
  username:'',
  password:'',
}

function Login(props) {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)
  const [values, setvalues] = useState(initialValues);
  const [errors,setErrors] = useState({})
  
  const [loginMutation, {loading,error,data}] = useMutation(LOGIN_MUTATION,{
    onError(err){
      setErrors(err.graphQLErrors[0]?.extensions.error)
    },
    update(_,result){
      setvalues(initialValues)
      console.log(result.data)
      login(result.data.login)
      navigate("/");
    }
  });
  
  const handlechange = (e)=>{
    setvalues({
      ...values,[e.target.name]:e.target.value
    });
  }
  const handleFormSubmit = (e)=>{
    e.preventDefault()
    loginMutation({
      variables:{
        logininput:values
      }
    })
  }
  return (

    <div style={{width:'400px'}} className='center'>
      <h2 className='center' style={{marginTop:'10px', marginBottom:'10px',textAlign:'center',color:'teal'}} >Login</h2>
      <Form onSubmit={handleFormSubmit} loading={loading} noValidate >
      <Form.Input label='Username' type='text' placeholder='username...' name='username' onChange={handlechange} value={values.username} error={errors?.username?true:false}/>
      <Form.Input label='Password' type='password'  name='password' onChange={handlechange} value={values.password} error={errors?.password?true:false} />
        <Button primary type='submit'>Login</Button>
      </Form>
      
      {
        Object.keys(errors).length>0 && (
          <Message
          warning
          header='Could you check something!'
          list={
          Object.values(errors).map(error=>error)
      }
    />
        )
      }
      
    </div>
  )
}



export default Login