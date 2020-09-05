import React, {createContext, useState} from 'react'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [login, setLogin] = useState(false)

    const toggleLogin = (login) =>{

         setLogin(!login)

         return login
    }

    return (

        <AuthContext.Provider value={{login, toggleLogin}}>

            {props.children}

        </AuthContext.Provider>
    )
}

export default AuthContextProvider