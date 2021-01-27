import React from "react";

//connection
const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
}

export const Chat: React.FC = () => {

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );

}

export const Messages: React.FC = () => {

    const [messages, setMessages] = React.useState<ChatMessageType[]>([]);

    React.useEffect( () => {
        ws.addEventListener( "message", (event: MessageEvent) => {
            let newMessage = JSON.parse(event.data);
            //this is not working in useEffect coz !!!CLOSURE!!! - setMessages([...messages, ...newMessage]);
            setMessages( (prevMessages) => [...prevMessages, ...newMessage]);
        })
    }, [] );

    return (
        <div style={ {height:"400px", overflowY: "auto"} }>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    );
}

export const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return (<div>
        <img src={message.photo} alt="" style={{width:"50px"}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr />
    </div>
    );
}

export const AddMessageForm: React.FC = () => {

    const [message, setMessage] = React.useState("");
    const [connectionStatus, setConnectionStatus] = React.useState<"pending" | "ready">("pending");

    React.useEffect( () => {
        ws.addEventListener("open", () => {
            setConnectionStatus("ready")
        })

    }, [])

    const sendMessage = () => {
        if (!message) {
            return;
        } else {
            ws.send(message);
            setMessage("");
        }
    }

    return (
        <div>
            <div><textarea onChange={ (e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
            <div><button disabled={connectionStatus !== "ready"} onClick={sendMessage}>send</button></div>
        </div>
    );
}

//for successful download React.lazy in App for ChatPage
export default ChatPage;

//types
type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
  }