import { useNavigate } from "react-router-dom";
import { auth } from '../../Firebase/config';
import React from "react";
import { Container, Spinner } from "react-bootstrap";

export const AuthContext = React.createContext()
export default function AuthProvider({children}) {
const [user, setUser]=React.useState({});
const [pending, setPending]= React.useState(false)
const navigate = useNavigate()
React.useEffect(()=>{
    setPending(true)
    const unsubcribed = auth.onAuthStateChanged((user)=>{
        // console.log("check user with login fb: ", user);
        if(user){
            const {displayName, email, uid, photoURL} = user;
            setUser({
                displayName, email, uid, photoURL
            })
            setPending(false);
            navigate("/")
            return;
        }
        else {
            setPending(false);
            navigate("/login")
        }
    })
    //clean function
    return()=>{
        unsubcribed();
    }
},[navigate])
    
    return (
        
        <AuthContext.Provider value={ user }>{pending ? 
            <Container className="text-center py-5" style={{height:"30rem"}}>
                <Spinner animation="border" role="status" className="mt-5"/> 
            </Container>
        : children}
        </AuthContext.Provider>
    )
}

