import { FC, useEffect} from "react";
import { StoryItem } from "../story-item/story-item";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/root-store/root-store-context";
import './story-list.styles.scss';


export const StoryList: FC = observer(() => {

    const { listItemsStore } = useStore();

    const { getLatestStoriesIdsAction, storiesIds } = listItemsStore;

    useEffect( () => {
        const fetchStoriesIds = async () => {
            getLatestStoriesIdsAction();
            setInterval(() => {
                getLatestStoriesIdsAction();
            }, 60000)
        };
        fetchStoriesIds();
    }, [])

        

    return (
        <> 
            <div className="stories-container">
                {
                    storiesIds?.map((id: number) => <StoryItem key={id} id={id} />)
                }
            </div>
        </>
    )
})