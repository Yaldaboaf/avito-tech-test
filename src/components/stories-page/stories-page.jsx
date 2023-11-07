import { useStore } from "../../store/root-store/root-store-context";
import { HeaderComponent } from "../header/header"
import { ReloadButton } from "../reload-button/reload-button"
import { StoryList } from "../story-list/story-list"
import './stories-page.scss';

export const StoriesPage = () => { 

    const { listItemsStore } = useStore();

    const { getLatestStoriesIdsAction, loadingFlag } = listItemsStore;

    return (
        <>
            <HeaderComponent />
                <div className="stories-list">
                    <div className="stories-controls">
                    <ReloadButton loadingFlag={loadingFlag} updateFunction={getLatestStoriesIdsAction}>reload news</ReloadButton>
                    </div>  
                <StoryList/>
            </div>
        </>
    )
}

