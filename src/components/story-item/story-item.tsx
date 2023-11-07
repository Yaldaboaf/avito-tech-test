import { useEffect, useState, FC } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ReactComponent as TriangleIcon } from '../../assets/triangle.svg'
import { Story } from "../../store/storylist-store";
import { getDataById } from "../../api/getDataById";
import { LinearProgress } from "@mui/material";
import "./story-item.styles.scss";

 


// Regex.Replace(your String, @"[^0-9a-zA-Z]+", "").
type StoryItemProps = {
    id: number,
    // story: 
    // {
    //     by?: string,
    //     descendants?: number,
    //     id: number,
    //     deleted?: boolean,
    //     kids?: number[],
    //     score?: number,
    //     time?: number,
    //     type?: string,
    //     url?: string,
    //     title?: string,
    //     text?: string,
    //     dead?: boolean,
    //     parent?: number,
    //     poll?: string,
    //     parts?: string,
    // }
}

export const StoryItem: FC<StoryItemProps> = observer(({id}) => {
    // const {title, id, by, score, time} = story;

    const convertTime = ( time: number | undefined) => {
        if( time ){
            return new Date(time * 1000).toLocaleString();
        }
    }

    const [storyData, setStoryData] = useState<Story>();

    const [storyFetchingFlag, setStoryFetchingFlag] = useState(true);

    useEffect(
        () => {
            const fetchId = async () => {
                try {
                    const data = await getDataById(id);
                    if (data) {
                        setStoryFetchingFlag(false);
                        return data;
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            const setFetchedData = async () => {
                setStoryData(await fetchId());
            }
            setFetchedData();
        }, [])

    

    const date = convertTime(storyData?.time);

    return (
        <div className="story-item-container">
            {storyFetchingFlag ? <LinearProgress color="inherit" /> : <></> }
            <div className="header-story-info">
                <TriangleIcon className="vote-arrow"></TriangleIcon>
                <div className="score-container">{storyData?.score ? storyData?.score : <></> }</div>
                <Link className="story-link" to={`/story/${id}`}>{storyData?.title ? storyData?.title : <></>}</Link>
            </div>
            <div className="footer-story-info">
                <div className="author-name-container">by: {storyData?.by ? storyData.by : <></>}</div>
                <div className="time-container">{date ? date : <></>}</div>
            </div>
        </div>
    )
})