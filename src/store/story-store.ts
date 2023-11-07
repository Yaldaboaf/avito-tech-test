import { makeAutoObservable, runInAction } from "mobx";
import { getCommentsQuantityById } from "../api/getCommentsQuantityById";
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
    
    commentsQuantity: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    getStoryDataByIdAction = async (id: string | undefined) => {
        if (!id) {
            return;
        } else {
            try {
                this.loadingFlag = true;
                const data = await getDataById(id);
                runInAction(() => {
                    this.loadingFlag = false;
                    this.storyData = data;
                    return data;
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    getCommentsQuantityByIdAction = async (story: Story) => {
        try{ 
            const overallQuantity = await getCommentsQuantityById(story);
            this.setCommentQuantity(overallQuantity)
        } catch (err) {
            console.log(err)
        }
    }

    setCommentQuantity = (quantity : number) => {
            this.commentsQuantity = quantity;
    }
}