import { FC, useState } from "react";
import { Comment } from "../comment/comment";
import './show-hide-button.styles.scss';

type ShowHideProps = {
    kidsIds : number[];
}

const getButtonContent = ( flag: boolean ) => {
    if ( flag ) {
        return "Close replies";
    }else {
        return "Open replies";
    }
}

export const ShowHideButton: FC<ShowHideProps> = ({kidsIds}) => {

    const [kidsCommentsFlag, setKidsCommentsFlag] = useState<boolean>(false);

    const kidCommentsSetter = () => { setKidsCommentsFlag(!kidsCommentsFlag) };

    return(
        <div className="button-comments-container">
            <button className="show-hide-button" onClick={kidCommentsSetter}>{getButtonContent(kidsCommentsFlag)}</button>
            {
                kidsCommentsFlag ? kidsIds.map((id) => {
                    return <Comment key={crypto.randomUUID()} id={id} />
                }) : <></>
            }
        </div>
    )
}