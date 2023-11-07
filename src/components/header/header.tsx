import { ReactComponent as CombinatorLogo } from '../../assets/y18.svg';
import './header.styles.scss'

export const HeaderComponent = () => {


    return (
        <header>
            <div className="stories-list-header">
                <CombinatorLogo className="Logo"></CombinatorLogo>
                <h2>Hacker News</h2>
            </div>
        </header>
    )
}