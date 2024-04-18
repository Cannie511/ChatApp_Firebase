import React, { useContext, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { addDocument } from '../../Firebase/services';
import { AuthContext } from '../Context/AuthProvider';

const Modals=({show, setShow})=> {
    const [form, setForm]=useState();
    const data=useContext(AuthContext);
    const handleClose =()=>{
        setShow(false);
    }
    const handleOK = ()=>{
        console.log("value form: ", form);
        addDocument('rooms', {
            name: form,
            status: 1,
            members:[data.uid]
        })
        setShow(false);
        setForm('')
    }
  return (
    <Modal
        show={show}
        onHide={()=>handleClose()}
        backdrop="static"
        keyboard={false}
        centered
        style={{position:"relative !important", zIndex:"1100 !important"}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo Phòng Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label>Tên Phòng:</label>
         <Form.Control value={form} onChange={(event)=>setForm(event.target.value)}/>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Đóng
          </Button>
          <Button variant="dark" onClick={()=>handleOK()}>Thêm mới</Button>
        </Modal.Footer>
      </Modal>
  )
}
export default Modals
