import { config } from "./config";

export const login = (body) => {
    return config.post("/auth/login", {...body});
};

export const signup_agency = (body) => {
    return config.post("/auth/signup/agency", {...body});    
}

export const signup_escort = (body) => {
    return config.post("/auth/signup/escort", {...body});    
}

export const signup_member = (body) => {
    return config.post("/auth/signup/member", {...body});
}

export const forgot_password = (body) => {
    return config.post("/auth/forgot-password", {...body});
}

export const reset_password = (body, query) => {
    return config.put(`/auth/reset-password?code=${query?.code}&email=${query?.email}`, {...body});
}


export const verify_account = (query) => {
    return config.get(`/auth/verify-email?code=${query?.code}&email=${query?.email}`);
}