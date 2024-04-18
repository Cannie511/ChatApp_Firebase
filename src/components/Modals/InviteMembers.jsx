import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Modal, Button, Form, Image, Container, InputGroup, Row, Col, Card, Spinner } from 'react-bootstrap';
import { updateMergeDocument } from '../../Firebase/services';
import { AuthContext } from '../Context/AuthProvider';
import { collection,getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../Context/AppProvider';
const InviteMembers=({show, setShow})=> {
    const [searchValue, setSearchValue] = useState('');
    const [searchListResult, setSearchListResult]=useState([])
    const [users, setUsers]=useState([]);
    const [pending, setPending]=useState(false)
    const [tempUsers, setTempUsers]=useState([])
    const data=useContext(AuthContext);
    const {rooms, selectedRoomId} = useContext(AppContext);
    const selectroom = useMemo(
        ()=> rooms.find((room) => room.id === selectedRoomId),
    [rooms,selectedRoomId]);
    const initUser = async()=>{
      const q = query(collection(db, "users"), where("uid", "!=", data.uid));
      // console.log(q)
      const fetchUsers = await getDocs(q);
      const usersPromises = fetchUsers.docs.map(async (doc) => {
        return doc.data();
      });
      const usersData = await Promise.all(usersPromises);
      if(usersData && usersData.length > 0){
        let filterMember = usersData.filter(user=>!selectroom.members.includes(user.uid))
        setUsers(filterMember);

      }
      // console.log("users: ", users);
    }
    useEffect(()=>{
        initUser()
        setTempUsers([]);
    },[selectedRoomId])
    useEffect(()=>{
      let resultArray = users.filter(user=>user.displayname.toLowerCase().includes(searchValue.toLowerCase()));
      setSearchListResult(resultArray);
      // console.log(searchListResult)
    },[searchValue])  
    const addNewUserToRoom = (user)=>{
      let filterArray  = users.filter(item=>item.uid !== user.uid)
      if(filterArray){
        setUsers(filterArray);
        setTempUsers([...tempUsers, user]);
        // console.log(tempUsers)
      }
    }
    const deleteFromTemp = (user)=>{
      let filterArray  = tempUsers.filter(item=>item.uid !== user.uid)
      if(filterArray){
        setTempUsers(filterArray);
        setUsers([...users, user]);
        // console.log(users);
      }
    }
    const handleAddMemberToFS = async()=>{
      setPending(true);
      const listMember = tempUsers.map(user=>user.uid);
      await updateMergeDocument('rooms', selectedRoomId, 'members', listMember);
      setPending(false);
      setTempUsers([]);
      setShow(false)
    }
    const handleClose =()=>{
        setShow(false);
    }
  return (
    <Modal
        show={show}
        onHide={()=>handleClose()}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm người mới:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label>Chọn người cần thêm</label>
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={searchValue}
          onChange={(event)=>setSearchValue(event.target.value)}
        />
      </InputGroup>

        <Container>
        {
             searchListResult.length === 0 && users && users.map((user)=>{
              return(
                <div className='mt-2 col-12 d-flex align-items-center' key={user.uid}>
                  <Image className='float-start col-2' style={{width:"2rem", height:"2rem"}} src={user.imgUrl ?
                  user.imgUrl:"https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg" } 
                  roundedCircle />
                  <div className='mx-2 col-9'><b>{user.displayname}</b></div>
                  <div className='col-1 float-end'>
                  <Button variant='warning' onClick={()=>addNewUserToRoom(user)} size='sm' style={{width:"2rem", height:"2rem" ,borderRadius:"50%"}}>
                    <FontAwesomeIcon icon="fa-solid fa-user-plus" /></Button>
                  </div>
                </div>
              )
            })
          }
          {
              searchListResult && searchListResult.length > 0 && searchListResult.map((user)=>{
                return(
                  <div className='mt-2 col-12 d-flex align-items-center' key={user.uid}>
                  <Image className='float-start col-2' style={{width:"2rem", height:"2rem"}} src={user.imgUrl ?
                  user.imgUrl:"https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg" } 
                  roundedCircle />
                  <div className='mx-2 col-9'><b>{user.displayname}</b></div>
                  <div className='col-1 float-end'>
                  <Button variant='warning' onClick={()=>addNewUserToRoom(user)} size='sm' style={{width:"2rem", height:"2rem" ,borderRadius:"50%"}}>
                    <FontAwesomeIcon icon="fa-solid fa-user-plus" /></Button>
                  </div>
                </div>
                )
              })
            }
          {
            tempUsers.length > 0 && <hr />
          }
          <Row >
          
            { tempUsers && tempUsers.length > 0 && tempUsers.map((user)=>{
              return(
                <Col sm={3} xs={4} className='p-1'>
                <Card className='p-1 col-12' style={{borderRadius:"30px"}}>
                <Row className='d-flex align-items-center'>
                  <Col xs={1}>
                  <Image className='float-start col-2 ' style={{width:"1rem", height:"1rem"}} src={
                    user.imgUrl ? user.imgUrl : 
                    "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg" } 
                      roundedCircle />
                  </Col>
                  <Col xs={6}><div className='wrap-text' style={{fontSize:".6rem", overflow:"hidden"}}>{user.displayname}</div></Col>
                  <Col xs={2} className='px-3'><div className='' onClick={()=>deleteFromTemp(user)}
                   style={{fontSize:".7rem", cursor:"pointer"}}>
                    <FontAwesomeIcon icon="fa-solid fa-xmark" /></div>
                  </Col>
                </Row>
                </Card>
              </Col>
              )
            })}
            
          </Row>
        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Đóng
          </Button>
          <Button variant="dark" disabled={pending ? true : false} onClick={()=>handleAddMemberToFS()}>{pending ? <Spinner animation="border" size="sm" />:"Xác nhận thêm"}</Button>
        </Modal.Footer>
    </Modal>
  )
}
export default InviteMembers
