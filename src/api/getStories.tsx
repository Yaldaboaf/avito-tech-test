import axios from "axios";

export const getStoriesId = async () => (await axios.get<number[]>("https://hacker-news.firebaseio.com/v0/newstories.json")).data;
            