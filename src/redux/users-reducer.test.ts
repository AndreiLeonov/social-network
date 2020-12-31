import usersReducer, { actions, InitialStateType } from "./users-reducer"

let state: InitialStateType;

beforeEach( () => {
    state = {
        users: [
            {id:0, name:"Test_0", followed: false, photos: {small: null, large: null}, status: "test_0"},
            {id:1, name:"Test_1", followed: false, photos: {small: null, large: null}, status: "test_1"},
            {id:2, name:"Test_2", followed: true, photos: {small: null, large: null}, status: "test_2"},
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };
})

test ("followSuccess", () => {
    
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy; 
    expect(newState.users[1].followed).toBeTruthy; 

});

test ("unfollowSuccess", () => {
    
    const newState = usersReducer(state, actions.unfollowSuccess(2))

    expect(newState.users[0].followed).toBeFalsy; 
    expect(newState.users[1].followed).toBeFalsy; 
    expect(newState.users[2].followed).toBeFalsy; 

})