import { Container, Row, Col, Offcanvas } from "react-bootstrap"
import { useContext, useState } from "react";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import SideBar from "./SideBar";
import ChatWindows from "./ChatWindows";
import { AppContext } from "../Context/AppProvider";
export default function ChatRoom(props){
    const {openSideBar} = useContext(AppContext)
    return(
        <>
            <Container className="m-0 w-100" >
                <Row>
                    {openSideBar ?
                    <Col style={{height:"100vh"}} className="col-sm-3 col-12 d-block"><SideBar/></Col>:
                    <Col style={{height:"100vh"}} className="col-sm-3 col-12 d-none d-sm-block"><SideBar/></Col>
                    }
                    {
                       !openSideBar && <Col className='p-sm-0 col-sm-9 col-12' style={{height:"100vh"}}><ChatWindows/></Col>
                    }
                    
                </Row>
            </Container>
        </>
    )
}