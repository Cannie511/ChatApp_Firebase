import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import UserInfo from './UserInfo'
import RoomList from './RoomList'

export default function SideBar() {
    
  return (
    <Container className='side-bar sidebar-active'>
        <Row>
            <Col xs={12}><UserInfo/></Col>
        </Row>
        <hr />
        <Row>
            <Col xs={12}><RoomList/></Col>
        </Row>
    </Container>
  )
}
