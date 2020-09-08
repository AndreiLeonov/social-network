import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC, usersReducer} from "./usersReducer";

let startState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2
};

beforeEach( () => {
    startState = {
        users: [],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 2
    };
})

test('user should be follow', () => {

    const action = followAC(1);

    const endState = usersReducer(startState, action)

    expect(endState["users"].length).toBe(0);

});

test('user should be unfollow', () => {

    const action = unfollowAC(1);

    const endState = usersReducer(startState, action)

    expect(endState["users"].length).toBe(0);

});

test('user should be set', () => {

    const action = setUsersAC();

    const endState = usersReducer(startState, action)

    expect(endState["users"].length).toBe(0);

});

test('page should be current', () => {

    const action = setCurrentPageAC(1);

    const endState = usersReducer(startState, action)

    expect(endState["currentPage"]).toBe(0);

});

test('total user count should be correct', () => {

    const action = setTotalUsersCountAC(1);

    const endState = usersReducer(startState, action)

    expect(endState["totalUsersCount"]).toBe(1);

});

