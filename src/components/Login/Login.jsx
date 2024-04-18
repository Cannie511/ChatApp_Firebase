
import {Button, Container,Card,Row,Col, InputGroup, Form} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { auth } from '../../Firebase/config';
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { addDocument } from '../../Firebase/services';
export default function Login(){
    const fbProvider = new FacebookAuthProvider();
    const handleLoginWithFacebook = async() => {
        try {
            const data = await signInWithPopup(auth, fbProvider);
            // console.log("respones: ", data);
            const isNewUser = data._tokenResponse.isNewUser;
            const provider_id = data._tokenResponse;
            const user = data.user;
            if(isNewUser){
                addDocument('users', {
                    displayname: user.displayName,
                    email: user.email,
                    imgUrl: user.photoURL,
                    uid:user.uid,
                    providerId:provider_id.providerId
                })
            }
        } catch (error) {
            console.log(error);
        }
        
    }
   
    return(
        <Container style={{height:"100vh"}}>
            <Row >
                <Col xs={12} className='d-flex justify-content-center p-sm-5 py-5 px-2'>
                <Card className='text-center py-3 mt-5 col-sm-4 col-12'>
                    <Card.Title><h1><strong>Chappy</strong></h1></Card.Title>
                    <Card.Body>
                        <Col>
                        <InputGroup className="my-2">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon="fa-solid fa-user" /></InputGroup.Text>
                            <Form.Control
                            type='text'
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="my-2">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon="fa-solid fa-key" /></InputGroup.Text>
                            <Form.Control
                            type='text'
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <div className='mb-3'>chưa có tài khoản ? <Link to="/register">
                            Đăng ký
                        </Link></div>
                        <Button variant="dark container"><b>Đăng nhập</b> <FontAwesomeIcon icon="fa-solid fa-arrow-right-to-bracket" /></Button>
                        <hr />
                        </Col>
                        <Col>
                            <Button variant="secondary container"><FontAwesomeIcon icon="fa-brands fa-google" /> Đăng nhập với Google</Button>
                            <Button variant="primary container my-1" onClick={()=>handleLoginWithFacebook()}> <FontAwesomeIcon icon="fa-brands fa-facebook"/>  Đăng nhập với Facebook</Button>
                        </Col> 
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}