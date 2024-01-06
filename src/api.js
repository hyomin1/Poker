import axios from "axios";

export const BASE_URL = "http://localhost:8080";

export const axiosWithCredentials = axios.create({
  //쿠키값 주고 받기 위한 withCredentials : true 옵션 전역 설정
  withCredentials: true,
});
