import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Comment } from '../comment/comment';
import { ReloadButton } from '../reload-button/reload-button';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/root-store/root-store-context';
import parse from 'html-react-parser';
import "./story-insides.styles.scss";
import { HeaderComponent } from '../header/header';
import { ReactComponent as TriangleIcon } from '../../assets/triangle.svg';

export const convertTime = (time: number | undefined) => {
    if (time) {
        return new Date(time * 1000);
    }
}

export const StoryInsides= observer(() => {

    const { id } = useParams();

    const { storyStore } = useStore();

    const { storyData, getStoryDataByIdAction, loadingFlag } = storyStore;

    const storyText  = storyData.text;

    const storyUrl = storyData.url; 
    
    const commentsQuantity = storyData.descendants;

    useEffect(() => {
        const fetchData = async () => {
            await getStoryDataByIdAction(id);
        } 
        fetchData();
    }, [])

    const date = convertTime(storyData.time);

    const parser = new DOMParser();
    
    

    return (
        <>
            <HeaderComponent/>
            <div className='insides-container'>
                <Link className='go-back-link' to={`/new`}>go back</Link>
                <div className='story-content'>
                    <div className='story-content-header'>
                        <h4>{storyData?.title}</h4>
                    </div>
                    <div className='story-text'>{storyText ? parse(storyText) : storyUrl ? <a href={storyUrl}>{storyUrl}</a> : '' }</div>
                    <div className='story-content-footer'>
                        <div className="score-container">
                            <TriangleIcon className="vote-arrow"></TriangleIcon>
                            <p className='grey-small'>{storyData?.score || <></>} {storyData?.score !== 1 ? "points" : "point"}</p>
                            <p className='grey-small'>by {storyData?.by}</p> 
                        </div>
                        <div className='grey-small'>{date?.getMonth()}.{date?.getDate()}.{date?.getFullYear()} at: {date?.getHours()}:{date?.getMinutes()}</div>
                    </div>
                </div>
                <div className='comments-upper-container'>
                    <div> {commentsQuantity} comments: </div>
                    <ReloadButton loadingFlag={loadingFlag} updateFunction={getStoryDataByIdAction} id={id}>reload comments</ReloadButton>
                </div>
                <div className='comments-container'>
                    {storyData?.kids?.map((kId : number) => {
                            return <Comment key={crypto.randomUUID()} id={kId}/>
                        })}
                </div>
            </div>
        </>
    )
})