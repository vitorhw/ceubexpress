import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx) {
  const { 'ceubexpress-token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://ceubexpress.herokuapp.com/'
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api
}
