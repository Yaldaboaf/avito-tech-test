import { useEffect, useState, FC } from "react"
import { getDataById } from "../../api/getDataById";
import { Story } from "../../store/storylist-store";
import { ShowHideButton } from "../show-hide-button/show-hide-button";
import parse from 'html-react-parser';
import "./comment.styles.scss";
import { convertTime } from "../story-insides/story-insides";
import { LinearProgress } from "@mui/material";


type CommentProps = {
    id: number;
}


export const Comment:FC<CommentProps> = ({id}) => {

    const [commentData, setCommentData] = useState<Story>();

    const [storyFetchingFlag, setStoryFetchingFlag] = useState(true);

    useEffect(  
        () => {
            const fetchId = async () => {
                try{
                    const data = await getDataById(id);
                    if(data){
                        setStoryFetchingFlag(false)
                        return data;
                    }
                }catch(err){
                    console.log(err);
                }
            }
            const setFetchedData = async () => {
                setCommentData( await fetchId());
            }
            setFetchedData();
        }, [])

    // const textGetter = () => 
    const date = convertTime(commentData?.time);


    return (
        
        <div className="comment-container">
            {storyFetchingFlag ? <LinearProgress color="inherit"/> : <></>}
            <h4>{commentData?.by ? commentData?.by : <></>}</h4>
            <>{commentData?.text ? parse(commentData?.text) : <></>}</>
            <div className="footer-container">
                <div>
                    {
                        commentData?.kids ? <ShowHideButton kidsIds = {commentData.kids} /> : <></>
                    }
                </div>
                <div className="date-container">{date?.getDate()}</div>
            </div>
        </div>
    )
}   