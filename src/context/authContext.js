import React, {createContext, useState} from 'react'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [login, setLogin] = useState(false)

    return (

        <AuthContext.Provider value={{login}}>

            {props.children}

        </AuthContext.Provider>
    )
}

export default AuthContextProvider