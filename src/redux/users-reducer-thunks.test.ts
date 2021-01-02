import { actions, follow, unfollow } from "./users-reducer";
import {usersAPI} from "../api/users-api";
import { APIResponseType, ResultCodeEnum } from "../api/api";

jest.mock("../api/users-api");

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    data: {},
    messages: [],
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

beforeEach ( () => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.follow.mockClear();
    usersAPIMock.unfollow.mockClear();
})

test ("follow thunk should be success", async () => {
    const thunk = follow(1);
    
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1) )
})

test ("unfollow thunk should be success", async () => {
    const thunk = unfollow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1) )
})