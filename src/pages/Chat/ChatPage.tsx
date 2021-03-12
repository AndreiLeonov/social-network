import { Divider } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chat-api";
import { sendMessages, startGetMessages, stopGetMessages } from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
}

export const Chat: React.FC = () => {

    const status = useSelector((state: AppStateType) => state.chat.status)

    // const [wsChannel, setWsChannel] = React.useState<WebSocket | null>(null);

    // React.useEffect(() => {
    //     let ws: WebSocket
    //     const closeHandler = () => {
    //         console.log("CLOSE");
    //         setTimeout(createChannel, 3000)
    //     }

    //     function createChannel() {
    //         ws?.removeEventListener("close", closeHandler)
    //         ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    //         ws.addEventListener("close", closeHandler)
    //         setWsChannel(ws);
    //     }


        const dispatch = useDispatch();
        
        React.useEffect (() => {
            dispatch(startGetMessages());

            return () => {
                dispatch(stopGetMessages());
            }

        },[])
        

    return (
        <div>
            {status === 'error' && <div>SOME ERROR. PLS REFRESH PAGE</div> }
            <>
            <Messages/>
            <AddMessageForm/>
            </>
        </div>
    );

}

export const Messages: React.FC<{}> = ({}) => {

    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = React.useState(false);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        let element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }

    }

    React.useEffect( () => {
        if (isAutoScroll){
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }

    },[messages])

    return (
        <div style={{ height: "400px", overflowY: "auto" }} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
            <div ref={messagesAnchorRef}></div> {/* this ref need for scroll */}
        </div>
    );
}

export const Message: React.FC<{ message: ChatMessageType }> = React.memo (({ message }) => {
    return (<div>
        <img src={message.photo} alt="" style={{ width: "50px" }} /> <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
    );
})

export const AddMessageForm: React.FC<{}> = () => {

    const [message, setMessage] = React.useState("");
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status)


    // React.useEffect(() => {
    //     wsChannel?.addEventListener("open", () => {
    //         setConnectionStatus("ready")
    //     })

    //     return () => {
    //         wsChannel?.removeEventListener("open", () => {
    //             setConnectionStatus("ready")
    //         })
    //     }

    // }, [wsChannel])

    const sendMessageHandler = () => {
        if (!message) {
            return;
        } else {
            // wsChannel?.send(message);
            dispatch(sendMessages(message))
            setMessage("");
        }
    }

    return (
        <div>
            <div><textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
            <div><button disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button></div>
        </div>
    );
}

//for successful download React.lazy in App for ChatPage
export default ChatPage;

//types
