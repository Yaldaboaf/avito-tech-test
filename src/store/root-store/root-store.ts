import { StoryStore } from "../story-store";
import {ListItemsStore} from "../storylist-store";

export class RootStore {
    listItemsStore = new ListItemsStore();
    storyStore = new StoryStore();
}