import axios from "axios";

export const getApi = (url, lastword) => {
    return axios.get(url + lastword).then((res) => { return res.data })
}
export const postApi = (url, lastword, data) => {
    return axios.post(url + lastword, data).then((res) => { return res.data })
}
export const deleteApi = (url, lastword, id) => {
    return axios.delete(url + lastword + id);
}
export const putApi = (url, lastword, id,data) => {
    return axios.put(url + lastword + id , data).then((res) => { return res.data })
}