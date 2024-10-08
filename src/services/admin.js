import api from "./api";

export const getMyAccount = async () => {
    return api.get("/admin/myAccount");
}

export const getAllEscorts = async () => {
    return api.get("/admin/getEscorts");
}

export const getEscort = async (id) => {
    return api.get("/admin/getEscort/"+id);
}

export const getAllAgencies = async () => {
    return api.get("/admin/getAgencies");
}

export const getAgency = async (id) => {
    return api.get("/admin/getAgency/"+id);
}

export const suspendEscortAccount = async (data) => {
    return api.post("/admin/suspendEscortAccount", data);
}

export const suspendAgencyAccount = async (data) => {
    return api.post("/admin/suspendAgencyAccount", data);
}

export const activateEscortAccount = async (id) => {
    return api.post("/admin/activeEscortAccount", id);
}

export const activateAgencyAccount = async (id) => {
    return api.post("/admin/activeAgencyAccount", id);
}

export const approveEscortProfile = async (id) => {
    return api.post(`/admin/approveEscortProfile/${id}`);
}

export const rejectEscortProfile = async (id, data) => {
    return api.post(`/admin/rejectEscortProfile/${id}`, data);
}