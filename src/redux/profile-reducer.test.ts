import profileReducer, { actions, InitialStateType } from "./profile-reducer";

let state: InitialStateType;

beforeEach( () => {
    state = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blabla', likesCount: 11},
            {id: 4, message: 'Dada', likesCount: 11}
        ],
        profile: null,
        status: "",
    };
})

it('length of posts should be incremented', () => {
    let newState = profileReducer(state, actions.addPostActionCreator("it-kamasutra.com"));
    expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
    let newState = profileReducer(state, actions.addPostActionCreator("it-kamasutra.com"));
    expect(newState.posts[4].message).toBe("it-kamasutra.com");
});

it('after deleting length of messages should be decrement', () => {
    let newState = profileReducer(state, actions.deletePost(1));
    expect(newState.posts.length).toBe(3);
});

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    let newState = profileReducer(state, actions.deletePost(1000));
    expect(newState.posts.length).toBe(4);
});
