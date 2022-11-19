import axios from "axios"

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL
}from "../constants/authConstants"

// login
export const login= (correo, clave)=> async (dispatch) => {
    try{
    dispatch( {type: LOGIN_REQUEST})
    
    const config={
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.post('/api/login',{correo, clave},config)

    dispatch({
        type:LOGIN_SUCCESS,
        payload: data.user
    })
}
catch(error){
    dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message
    })

}

}

//registrar usuario
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config={
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/usuario/registro', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear error 
export const clearErrors= () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}    