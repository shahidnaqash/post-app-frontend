import React from 'react';
import { createContext,useReducer } from 'react';
import jwt_decode from "jwt-decode";

const INITIAL_VALUES ={
    user:null,
}

if(localStorage.getItem('jwtToken')){
    var decoded = jwt_decode(localStorage.getItem('jwtToken'));
    console.log(decoded)
    if(decoded && decoded.exp *1000< Date.now()){
        localStorage.removeItem("jwtToken"); 
    }else{
        INITIAL_VALUES.user = decoded
    }

}



const AuthContext = createContext({
    user:null,
    login:(userData)=>{},
    logout:()=>{}
})

const Actions ={
    LOGIN:'LOGIN',
    LOGOUT:'LOGOUT'
}

const ReducerFunction = (state,action)=>{
    switch (action.type) {
        case Actions.LOGIN:
            return {
                ...state,
                user:action.payload
            }
            break;
        case Actions.LOGOUT:
           return {
            ...state,
            user:null
            }
            break;    
        default:
            return {
                ...state
            }
            break;
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(ReducerFunction, INITIAL_VALUES);
    function login(userData){
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type:Actions.LOGIN,
            payload:userData
        })
    }
    function logout(){
        localStorage.removeItem("jwtToken"); 
        dispatch({
            type:Actions.LOGOUT
        })
    }
    return (
        <AuthContext.Provider value={{user:state.user,
        login,logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthProvider,AuthContext}