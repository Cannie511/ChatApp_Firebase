import React, { useContext } from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { AuthContext } from '../Context/AuthProvider'
import { formatRelative } from 'date-fns';

export default function Message({text, name, time, imgUrl, me}) {
  const currentUser = useContext(AuthContext);
  // console.log("cr us ", currentUser);
  const formatDateTime=(seconds)=>{
    let formatTime = '';
    if(seconds){
      formatTime = formatRelative(new Date(seconds * 1000), new Date());
      formatTime = formatTime.charAt(0).toUpperCase() + formatTime.slice(1);
    }
    return formatTime;
  }
  return (
    <>
    {currentUser.uid !== me ? 
    <Row className='p-2'>
      <Col xs={1} className='p-0'> 
        <Image className='float-end' style={{width:"2.7rem", height:"2.7rem"}} 
        src={imgUrl ? imgUrl : "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"} roundedCircle />
      </Col>
      <Col xs={11}>
      <div>{name}</div>
        <Card className='message-box'>
          <Card.Body className='py-2'>
            <div className='message-text'>{text}</div>
            <div className='mt-1 text-end' style={{fontSize:".6rem", color:"gray"}}>{formatDateTime(time) ? formatDateTime(time) : "Đang gửi..."}</div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    :
    <Row className='p-2 '>
      <Col>
        
        <Card className='message-box float-end' style={{backgroundColor:"rgb(212, 229, 250)"}} >
          <Card.Body className='py-2'>
            <div className='message-text'>{text}</div>
            <div className='mt-1 text-start' style={{fontSize:".6rem", color:"gray"}}>{formatDateTime(time)}</div>
          </Card.Body>
          
        </Card>
      </Col>
    </Row>
      }
    </>
  )
}
