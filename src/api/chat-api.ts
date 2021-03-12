import { StatusType } from './../redux/chat-reducer';

let subcribers = {
    'messages': [] as MessagesSubscriberType[],
    'status': [] as StatusSubscriberType[]
}


let ws: WebSocket | null = null;


const closeHandler = () => {
    console.log("CLOSE");
    notifySubsAboutStatusChanged('pending');
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data);
    subcribers['messages'].forEach(sub => sub(newMessage))

}

const openHandler = () => {
    notifySubsAboutStatusChanged('ready');
}

const errorHandler = () => {
    notifySubsAboutStatusChanged('error');
    console.log('TRY TO REFRESH PAGE AND CHECK INTERNET CONNECTION');
    
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
}

const notifySubsAboutStatusChanged = (status: StatusType) => {
    subcribers['status'].forEach(sub => sub(status));
}

function createChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubsAboutStatusChanged('pending');
    ws.addEventListener("close", closeHandler);
    ws.addEventListener("message", messageHandler);
    ws.addEventListener("open", openHandler);
    ws.addEventListener("error", errorHandler);
}


export const chatAPI = {
    subscribe(eventName: EventsNameType, callback: MessagesSubscriberType | StatusSubscriberType) {
        //@ts-ignore
        subcribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subcribers[eventName] = subcribers[eventName].filter(sub => sub !== callback)
        }
    },
    unsubscribe(eventName: EventsNameType, callback: MessagesSubscriberType | StatusSubscriberType) {
        //@ts-ignore
        subcribers[eventName] = subcribers[eventName].filter(sub => sub !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    start() {
        createChannel()
    },
    stop() {
        subcribers.messages = []
        subcribers.status = []
        cleanUp()
        ws?.close()

    }
}

//types 
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type EventsNameType = 'messages' | 'status'
type MessagesSubscriberType = (messages: ChatMessageType[]) => void 
type StatusSubscriberType = (status: StatusType) => void