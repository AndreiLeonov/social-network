import {AddPostActionType, PostsDataType, UpdateNewPostActionType, ProfilePageType} from "./store";
import {ActionsType} from "./usersReducer";
import {messagesReducer, sendMessageCreator} from "./messagesReducer";
import {addPostActionCreator, profileReducer, UpdateNewPostActionCreator} from "./profileReducer";

let startState = {
    postsData: [
        {id: 1, message: 'Hi!!!', likeCounter: 12},
        {id: 2, message: "It's my first post!", likeCounter: 10},
        {id: 3, message: "How a u dudes?", likeCounter: 7}
    ],
    newPostText: 'SOME TEXT'
};

beforeEach( () => {
    startState = {
        postsData: [
            {id: 1, message: 'Hi!!!', likeCounter: 12},
            {id: 2, message: "It's my first post!", likeCounter: 10},
            {id: 3, message: "How a u dudes?", likeCounter: 7}
        ],
        newPostText: 'SOME TEXT'
    };
})

test('post data should be added', () => {

    const action = addPostActionCreator();

    const endState = profileReducer(startState, action)

    expect(endState["postsData"].length).toBe(4);

});

test('new post text should be update', () => {

    const action = UpdateNewPostActionCreator("ananas");

    const endState = profileReducer(startState, action)

    expect(endState["newPostText"]).toBe("ananas");
    //если убрать endState, то тесть пройдет
    expect(endState["newPostText"].length).toBe(2);

});