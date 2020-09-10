import {messagesReducer, sendMessageCreator, updateNewMessageDataCreator} from "./messagesReducer";
import {MessagesPageType} from "./store";

let startState: MessagesPageType;

beforeEach( () => {
    startState = {
        dialogsData: [
            {id: 1, name: 'Sasha'},
            {id: 2, name: 'Pasha'},
            {id: 3, name: 'Dima'},
            {id: 4, name: 'Sveta'},
            {id: 5, name: 'Olya'},
            {id: 6, name: 'Viktor'},
            {id: 7, name: 'Kolya'},
            {id: 8, name: 'Alex'}
        ],
        messagesData: [
            {id: 1, message: 'Yo'},
            {id: 2, message: 'Hi'},
            {id: 3, message: 'how a u?'},
            {id: 4, message: 'ok'},
            {id: 5, message: 'great!'}
        ],
        newMessageData: ''
    };
})

test('message data should be send', () => {

    const action = sendMessageCreator();

    const endState = messagesReducer(startState, action)

    expect(endState["messagesData"].length).toBe(6);

});

test('message data should be update', () => {

    const action = updateNewMessageDataCreator('yoooo1');

    const endState = messagesReducer(startState, action)
    //если убрать endState, то тесть пройдет
    expect(endState["newMessageData"].length).toBe(1);

});