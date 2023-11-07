import axios from "axios";
import { Story } from "../store/storylist-store";


export const getDataById = async (id: number | string ) => (await axios.get<Story>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).data;