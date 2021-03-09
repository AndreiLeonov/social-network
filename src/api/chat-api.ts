import {StatusType} from '../redux/chat-reducer'

let subcribers = {
    'messages': [] as MessagesSubscriberType[],
    'status': [] as StatusSubscriberType[]
}


let ws: WebSocket | null = null;


const closeHandler = () => {
    console.log("CLOSE");
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data);
    subcribers['messages'].forEach(sub => sub(newMessage))

}

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
}


export const chatAPI = {
    subscribe(eventName: EventsNameType, callback: MessagesSubscriberType) {
        subcribers[eventName].push(callback)
        return () => {
            subcribers[eventName] = subcribers[eventName].filter(sub => sub !== callback)
        }
    },
    unsubscribe(callback: MessagesSubscriberType) {
        subcribers = subcribers.filter(sub => sub !== callback)
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