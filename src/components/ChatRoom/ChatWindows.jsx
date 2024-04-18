import React,    {  createRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import Header from './Header'
import Message from './Message'
import "./ChatRoom.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from '../Context/AppProvider'
import { addDocument } from '../../Firebase/services'
import { AuthContext } from '../Context/AuthProvider'
import useFirestore from '../../customHooks/useFirestore'
import EmojiPicker from 'emoji-picker-react';

 const ChatWindows =()=> {
    const messagesEndRef = useRef(null);
    const inputRef = createRef();
    const [message, setMessage] = useState('')
    const {rooms, selectedRoomId} = useContext(AppContext);
    const [pending, setPending] = useState(false);
    const [openEmoji, setOpentEmoji]=useState(false);
    const [currentCursor, setCurrentCursor] = useState();
    const user = useContext(AuthContext);
    const selectroom = useMemo(
        ()=> rooms.find((room) => room.id === selectedRoomId)
        ,[rooms,selectedRoomId]);
    // console.log(selectroom)
    const {openSideBar, setOpenSideBar} = useContext(AppContext)
    const condition = useMemo(()=>({
        fieldname: 'roomId',
        operator: '==',
        compareValue: selectedRoomId
    }),[selectedRoomId])
    const listMessage = useFirestore('messages', condition);
    useEffect(()=>{
        if (messagesEndRef.current && selectedRoomId) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        };
    },[listMessage])
    useEffect(()=>{
        setTimeout(() => {
            if (messagesEndRef.current && !pending) {
                messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
            }
            }, 10);
        
    },[pending])
    useEffect(()=>{
        setPending(true);
        setTimeout(() => {
            if(listMessage.length>=0){
                setPending(false);
            }
        }, 800);
    },[selectedRoomId])
    const addEmoji =(e, {emoji})=>{
        const ref = inputRef.current;
        if(ref){
            ref.focus();
            const start = message.substring(0, ref.selectionStart);
            const end =  message.substring(ref.selectionStart);
            let emoMess = start + e.emoji + end;
            setCurrentCursor(start.length+e.emoji.length)
            setMessage(emoMess)
            // console.log(currentCursor)
        }
       
    }
    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(currentCursor, currentCursor);
        }
      }, [currentCursor]);
    useEffect(()=>{
        console.log(message);
    },[message])
    // console.log(condition)
    // console.log(listMessage);
    const handleSendMessage = (e)=>{
        e.preventDefault()
        addDocument('messages', {
            text: message,
            uid: user.uid,
            imgUrl: user.photoURL,
            displayName: user.displayName,
            roomId: selectedRoomId
        })
        setMessage('');
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault(); // Ngăn chặn hành động mặc định của Enter
          handleSendMessage(event); // Thực hiện hàm của bạn khi nhấn Enter
        }
      }
  return (
    <>
    {
        selectroom ?
   
    <Container className={openSideBar ? 'p-0 main-active':'p-0 chat-main'}>
        <Row className='' onClick={()=>setOpentEmoji(false)}>
            <Col className='p-0'>
            {selectroom ?
                <Header  name={selectroom.name} status={selectroom.status}/>:
                <Header />
            }
            </Col>
        </Row>
        <Row className='' onClick={()=>setOpentEmoji(false)}>
            <Col ref={messagesEndRef} id='ref' className='p-sm-0 px-3 chat-window d-flex flex-column'  >
                
                {
                    !pending && listMessage.length === 0 && 
                    <div className='text-center py-5'>
                        <h3>Chưa có tin nhắn nào, bắt đầu chat</h3>
                    </div>
                }
                {
                    pending && 
                    <div className='text-center py-5'>
                        <Spinner></Spinner>
                    </div>
                }
                {!pending && listMessage && listMessage.map((message, index)=>{
                    return(
                        <Message key={index} text={message.text} name={message.displayName} imgUrl={message.imgUrl} 
                        time={message.createAt?.seconds} me={message.uid}/>
                    )
                })}
            </Col>
        </Row>
        <Row >
            <Col>
                <Row className='p-0' >
                    <Col xs={10} className='p-0' style={{maxHeight:"10vh"}}>
                    <form onSubmit={(e)=>handleSendMessage(e)}>
                        <textarea ref={inputRef} className='message-input' value={message} onChange={(event)=>setMessage(event.target.value)}
                        placeholder='Nhập tin nhắn ở đây...' onKeyDown={handleKeyDown}/>
                    </form>
                    </Col>
                    <Col xs={1} className='p-0'>
                        <button className='button-send' onClick={()=>setOpentEmoji(!openEmoji)}><FontAwesomeIcon icon="fa-solid fa-face-smile" style={{color: "#FFD43B",}} /></button>
                        <EmojiPicker emojiStyle='google' previewConfig={''} suggestedEmojisMode='recent' theme='light' open={openEmoji} onEmojiClick={addEmoji} className='emoji-picker'/>
                    </Col>
                    <Col xs={1} className='p-0'>
                       <button className='button-send' onClick={(e)=>handleSendMessage(e)}><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></button>
                    </Col>
                </Row>
                
            </Col>
        </Row>
    </Container>:
    <Container className='text-center' style={{height:"30rem"}}>
        <h1 className='p-5 ' style={{marginTop: "10rem"}}>Bạn chưa bắt đầu đoạn chat nào</h1>
        <Container className='m-0 d-block d-sm-none'><Button onClick={()=>setOpenSideBar(true)}>Bắt đầu chat</Button></Container>
    </Container>
     }
    </>
  )
}
export default ChatWindows
