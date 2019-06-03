export const LOGIN_TOKEN = 'LOGIN_TOKEN';
export function loginExists(data) {
return axios.post('http://103.211.216.244/zepro-feet-first/api/web/user/login', data);
}