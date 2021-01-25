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
        ws.addEventListener( "message", (event: any) => {
            setMessages(JSON.parse(event.data));
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
        <img src={message.photo} alt=""/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr />
    </div>
    );
}

export const AddMessageForm: React.FC = () => {
    return (
        <div>
            <div><textarea></textarea></div>
            <div><button>send</button></div>
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