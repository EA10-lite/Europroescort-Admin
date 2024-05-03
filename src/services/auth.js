import client from "./client";

export const adminLogin = (data)=> {
    return client.post("/auth/admin/login", data);
}
