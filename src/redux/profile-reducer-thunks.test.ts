import { follow } from "./users-reducer";
import {usersAPI} from "../api/users-api";
import { APIResponseType, ResultCodeEnum } from "../api/api";

jest.mock("../api/users-api");

const usersAPIMock = usersAPI;

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    data: {},
    messages: [],
}

//@ts-ignore
usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

test ("", async () => {
    const thunk = follow(1);
    const dispatchMock = jest.fn();

    //@ts-ignore
    await thunk(dispatchMock);

    expect(dispatchMock).toBeCalledTimes(3);
})