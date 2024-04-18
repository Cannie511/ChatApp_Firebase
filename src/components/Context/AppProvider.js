import { useNavigate } from "react-router-dom";
import { auth } from '../../Firebase/config';
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import useFirestore from "../../customHooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext()
export default function AppProvider({children}) {
    const data = useContext(AuthContext);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [openSideBar, setOpenSideBar]=useState(false);
    const roomsCondition = useMemo(()=>{
        return({
          fieldname: 'members',
          operator:'array-contains',
          compareValue: data.uid
        })
      },[data.uid])
      const rooms = useFirestore("rooms", roomsCondition)
    useEffect(()=>{
      if(sessionStorage.getItem("roomId")){
        setSelectedRoomId(sessionStorage.getItem("roomId"))
      }
    },[])
    return (
        
        <AppContext.Provider value={ {rooms, selectedRoomId, setSelectedRoomId, openSideBar, setOpenSideBar} }>
             {children}
        </AppContext.Provider>
    )
}

