import { Divider, message } from "antd";
import React from "react";

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
    const messages = [1,2,3,4];
    return (
        <div style={ {height:"400px", overflowY: "auto"} }>
            {messages.map((m: any) => <Message />)}
        </div>
    );
}

export const Message: React.FC = () => {
    const message = {
        url: "https://lh3.googleusercontent.com/proxy/B1t2Z8InOP050SvMK7JvdYm3ux3ulCrHp9CjNBKc10lfcFlKui3kzJQ1vAYNdc_3LOOH_5GhWEVUWYMvncPyhOX8plYm18izj2XHOph2GiLvTVZx8feYTVQ4RFtB",
        userName: 'Test',
        text: 'Hello!!!' 
    }
    return (<div>
        <img src={message.url} alt=""/> <b>message.userName</b>
        <br/>
        {message.text}
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