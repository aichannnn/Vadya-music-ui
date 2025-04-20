export const login = (userData) =>{
    return{
        type:'LOGIN',
        playload: userData
    }
}

export const signup = (userData) =>{
    return{
        type: 'SIGNUP',
        playload:userData
    }
}

export const logout = () =>{
    return{
        type: 'LOGOUT'
    }
}
