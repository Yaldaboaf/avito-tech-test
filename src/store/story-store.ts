import { makeAutoObservable, runInAction, toJS } from "mobx";
import { getDataById } from "../api/getDataById";


export type Story = {
    by?: string,
    descendants?: number,
    id: number,
    deleted?: boolean,
    kids?: number[],
    score?: number,
    time?: number,
    type?: string,
    url?: string,
    title?: string,
    text?: string,
    dead?: boolean,
    parent?: number,
    poll?: string,
    parts?: string, 
}

export class StoryStore {

    commentsData: Story[] = [];

    storyData = {} as Story;

    loadingFlag : boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    getStoryDataByIdAction = async (id: string | undefined) => {
        if (id){
            try {
                this.loadingFlag = true;
                const data = await getDataById(id);
                runInAction(() => {
                    this.loadingFlag = false;
                    this.storyData = data;
                })
                return data;
            } catch (err) {
                console.log(err)
            }
        }
    }
}