import {instance} from "./api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data);
    }
}

type GetCaptchaUrlResponseType = {
    url: string
}