import { profileReducer, addPostActionCreator } from "./profileReducer";


it('new post should be added and length should be incremented', () => {

    let initialState = {
        postsData: [
            {id: 1, message: 'Hi!!!', likeCounter: 12},
            {id: 2, message: "It's my first post!", likeCounter: 10},
            {id: 3, message: "How a u dudes?", likeCounter: 7}
        ],
    }

    let action = addPostActionCreator('Hi111!!!')

    let newState = profileReducer(initialState,action)

    expect (newState.postsData.length).toBe(4);
    expect (newState.postsData[3].message).toBe('Hi111!!!');

});


