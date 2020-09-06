import React, {createContext, useState, useReducer} from 'react'

export const AuthContext = createContext();


const initialstate = {login: false, type: 'login'}

function reducer(state, action) {

    const logValue = action.type

    switch (logValue) {

      case 'login':
        return {...state, type:'login', login: false };

      case 'logout':
        return {...state, type:'logout', login: true};
    }
  }

const AuthContextProvider = (props) => {

    const [login, setLogin] = useReducer(reducer, initialstate)

    const toggleLogin = () =>{

        if (login.type === 'login')
        
            {setLogin({type: 'logout'})
    
            return}

        else {setLogin({type: 'login'})

            return}

    }

    return (

        <AuthContext.Provider value={{login: login.login, toggleLogin}}>

            {props.children}

        </AuthContext.Provider>
    )
}

export default AuthContextProvider