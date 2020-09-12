import {follow, setCurrentPage, setTotalUsersCount, setUsers, unfollow, usersReducer} from "./usersReducer";

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

    const action = follow(1);

    const endState = usersReducer(startState, action)

    expect(endState["users"].length).toBe(0);

});

test('user should be unfollow', () => {

    const action = unfollow(1);

    const endState = usersReducer(startState, action)

    expect(endState["users"].length).toBe(0);

});

test('user should be set', () => {

    const action = setUsers( );

    const endState = usersReducer(startState, action)

    expect(endState.users.length).toBe(1);

});

test('page should be current', () => {

    const action = setCurrentPage(1);

    const endState = usersReducer(startState, action)

    expect(endState["currentPage"]).toBe(0);

});

test('total user count should be correct', () => {

    const action = setTotalUsersCount(1);

    const endState = usersReducer(startState, action)

    expect(endState["totalUsersCount"]).toBe(1);

});

