import React, { useState,useContext } from 'react'
import { Button, Image, Spinner } from 'react-bootstrap'
import "./ChatRoom.scss"
import { auth } from '../../Firebase/config'
import { AuthContext } from '../Context/AuthProvider';
export default function UserInfo() {
  const [pending, setPending]=useState(false);
  const handleLogout=async()=>{
    setPending(true);
    await auth.signOut();
  }
  const dataUser = useContext(AuthContext);
  // console.log(dataUser.uid)
  return (
    <div className='py-2 mt-3 mt-sm-0'>
        <div>
        <Image className='float-start' style={{width:"2rem", height:"2rem"}} src={dataUser.photoURL ?dataUser.photoURL:"https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg" } roundedCircle />
        <div className='float-start p-1' style={{ width: '9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{dataUser.displayName}</div>
        <Button variant='dark' className='float-end' onClick={()=>handleLogout()}>{!pending ? "Đăng xuất": <Spinner animation="border" size="sm" />} </Button>
        </div>
        
    </div>
  )
}
