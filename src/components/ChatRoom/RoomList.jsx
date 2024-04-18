import React, { useContext, useMemo } from 'react'
import { useState } from 'react'
import { Accordion,Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFirestore from '../../customHooks/useFirestore';
import { AuthContext } from '../Context/AuthProvider';
import { AppContext } from '../Context/AppProvider';
import Modals from '../Modals/Modal';
import { addDocument } from '../../Firebase/services';
export default function RoomList() {
  const {rooms, setSelectedRoomId, setOpenSideBar} = useContext(AppContext);
  const data = useContext(AuthContext);
  const [show, setShow]=useState(false);
  const [openForm, setOpenForm]=useState(false);
  const [roomName,setRoomName]=useState('');
  const handleChooseRoom = (id)=>{
    setSelectedRoomId(id);
    setOpenSideBar(false);
    sessionStorage.setItem("roomId", id)
  }
  const handleOpenForm =()=>{
    setOpenForm(!openForm);
  }
  const handleAddNewRoom = ()=>{
      addDocument('rooms', {
        name: roomName,
        status: 1,
        members:[data.uid]
      })
      setRoomName('');
  }
  return (
    
    <>
        <Accordion defaultActiveKey="0" style={{position:"relative !important", zIndex:"1000 !important"}}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Nhóm Chat &nbsp;<FontAwesomeIcon icon="fa-solid fa-user-group" /></Accordion.Header>
                <Accordion.Body style={{border:"none"}}> 
                {
                  rooms && rooms.length > 0 && rooms.map((room)=>{
                    return(
                      <div className='p-3 room' key={room.id} onClick={()=>handleChooseRoom(room.id)}>{room.name}</div>
                    )
                  })
                }
                <hr />
                <Button variant='dark w-100 mt-2 d-none d-sm-block' onClick={()=>setShow(true)}><FontAwesomeIcon icon="fa-solid fa-square-plus" /> Thêm mới</Button>
                {openForm && 
                <>
                <label>Tên phòng chat:</label>
                <Form.Control value={roomName} onChange={(event)=>setRoomName(event.target.value)}/>
                </>
                }
                {
                  roomName==='' ? 
                  <Button variant='dark w-100 mt-2 d-block d-sm-none' onClick={()=>handleOpenForm()}>
                    {!openForm ? <><FontAwesomeIcon icon="fa-solid fa-chevron-down" /> Thêm mới</>:<><FontAwesomeIcon icon="fa-solid fa-chevron-up" /> Ẩn</>}
                  </Button>:
                  <Button variant='success w-100 mt-2 d-block d-sm-none' onClick={()=>handleAddNewRoom()}><FontAwesomeIcon icon="fa-solid fa-check" /> Đồng ý</Button>
                }
                
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        <Modals show={show} setShow={setShow}/>
    </>
  )
}
