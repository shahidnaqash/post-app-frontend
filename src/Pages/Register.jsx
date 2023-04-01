import React,{useState,useContext} from 'react'
import { Button, Form,Message } from 'semantic-ui-react'
import { useMutation  } from '@apollo/client';
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../Context/Auth';
import {REGISTER_MUTATION} from '../GraphQl/Mutations'

const initialValues = {
  username:'',
  email:'',
  password:'',
  confirmpassword:''
}

function Register(props) {
  
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)
  const [values, setvalues] = useState(initialValues);
  const [errors,setErrors] = useState({})
  
  const [registerMutation, {loading,error,data}] = useMutation(REGISTER_MUTATION,{
    onError(err){
      setErrors(err.graphQLErrors[0]?.extensions.error)
    },
    update(_,result){
      login(result.data.register)
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
    registerMutation({
      variables:{
        registerinput:values
      }
    })

  }
  return (

    <div style={{width:'400px'}} className='center'>
      <h2 className='center' style={{marginTop:'10px', marginBottom:'10px',textAlign:'center',color:'teal'}} >Register</h2>
      <Form onSubmit={handleFormSubmit} loading={loading} noValidate >
      <Form.Input label='Username' type='text' placeholder='username...' name='username' onChange={handlechange} value={values.username} error={errors?.username?true:false}/>
      <Form.Input label='Email' type='text'  placeholder='email...' name='email' onChange={handlechange} value={values.email} error={errors?.email?true:false} />
      <Form.Input label='Password' type='password'  name='password' onChange={handlechange} value={values.password} error={errors?.password?true:false} />
      <Form.Input label='confirm password' type='password' name='confirmpassword' onChange={handlechange} value={values.confirmpassword} error={errors?.confirmpassword?true:false} />
        <Button primary type='submit'>Register</Button>
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



export default Register