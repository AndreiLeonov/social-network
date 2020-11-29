import {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    usersReducer,
    unfollowSuccess
} from "./usersReducer";

let startState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    followingInProgress: [],
};

beforeEach( () => {
    startState = {
        users: [],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 2,
        isFetching: true,
        followingInProgress: [],
    };
})

test('user should be follow', () => {

    const action = followSuccess(1);

    const endState = usersReducer(startState, action)

    expect(endState["users"].length).toBe(0);

});

test('user should be unfollow', () => {

    const action = unfollowSuccess(1);

    const endState = usersReducer(startState, action)

    expect(endState["users"].length).toBe(0);

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

