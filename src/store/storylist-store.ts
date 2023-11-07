import { makeAutoObservable, runInAction} from "mobx";
import { getStoriesId } from "../api/getStories";
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
    title?:string,
    text?: string,
    dead?: boolean,
    parent?: number,
    poll?: string,
    parts?: string,
}

export class ListItemsStore {

    storiesData: Story[] = [];

    storiesIds: number[] = [];

    storyData = {} as Story;

    loadingFlag = false;

    storyCommentsQuantity = 0;

    constructor() {
        makeAutoObservable(this);
    }

    getLatestStoriesIdsAction = async () => {
        try{
            this.loadingFlag = true;
            const res = await getStoriesId().then((res) => res.splice(0, 100));
            // const promises = res.map( async (element) => (getDataById(element)))
            // const data = await Promise.all(promises);
            runInAction(() => {
                this.loadingFlag = false;
                this.storiesIds = res;
            })
        } catch {
            console.log("Data Action Error")
        }
    }

}