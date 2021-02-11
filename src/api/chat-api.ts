

let subcribers = [] as subscriberType[]

let ws: WebSocket

const closeHandler = () => {
    console.log("CLOSE");
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data);
    subcribers.forEach(sub => sub(newMessage))

}

function createChannel() {
    ws?.removeEventListener("close", closeHandler)
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    ws.addEventListener("close", closeHandler)
}


export const chatAPI = {
    subscribe(callback: subscriberType){
        subcribers.push(callback)
        return () => {
            subcribers = subcribers.filter(sub => sub !== callback)
        }
    }
}

//types 
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type subscriberType = (messages: ChatMessageType[]) => void 