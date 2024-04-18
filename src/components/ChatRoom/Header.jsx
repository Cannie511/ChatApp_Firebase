import React, { useContext, useMemo, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InviteMembers from '../Modals/InviteMembers'
import { AppContext } from '../Context/AppProvider';
export default function Header({name, status}) {
  const [show, setShow]=useState(false);
  const {setOpenSideBar} = useContext(AppContext)
  const {rooms, selectedRoomId} = useContext(AppContext);
    const selectroom = useMemo(
        ()=> rooms.find((room) => room.id === selectedRoomId),
    [rooms,selectedRoomId]);
    // console.log(selectroom.members)
  return (
    <div className='m-0 sticky-top' style={{borderBottom:"1px solid lightgray"}}>
        <Container>
            <Row className='pt-1 px-sm-0 d-flex flex-columns justify-content-center align-items-center' >
                  <Col className='py-2 col-sm-1 col-3 d-flex flex-columns justify-content-center align-items-center'>
                    <div className='me-2 d-block d-sm-none' onClick={()=>setOpenSideBar(true)}><FontAwesomeIcon icon="fa-solid fa-chevron-left" /></div>
                  <Image className='float-end' style={{width:"2.7rem", height:"2.7rem"}} src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-group-chat-icon-image_1330951.jpg" roundedCircle />
                </Col>
                <Col className='col-sm-8 col-5 px-0'>
                    <Row className='wrap-text px-0'><div><h5><b>{name}</b></h5></div></Row>
                    <Row><div><i>{status ? 
                    <>
                      <Row className='p-0'>
                        <Col className='col-sm-3 col-12 d-flex justify-content-start align-items-center'>{selectroom.members.length} thành viên &nbsp;<div className='status p-0' style={{backgroundColor:"green"}}></div></Col>
                      </Row>
                    </>
                   : <>
                   <Row className='p-0'>
                     <Col xs={3} className='d-flex justify-content-center align-items-center'>Đã tắt &nbsp;<div className='status p-0' style={{backgroundColor:"gray"}}></div></Col>
                   </Row>
                   </>}
                   </i></div>
                   </Row>
                </Col>
                <Col className='py-2 col-sm-3 col-4'><Button variant='light float-end me-3' style={{border:"1px solid black"}}
                onClick={()=>setShow(true)}><FontAwesomeIcon icon="fa-solid fa-user-plus" /> Mời</Button></Col>
            </Row>
        </Container>
        <InviteMembers show={show} setShow={setShow} />
    </div>
  )
}
