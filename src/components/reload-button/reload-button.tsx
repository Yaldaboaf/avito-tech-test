import { observer } from 'mobx-react-lite';
import { ButtonHTMLAttributes, FC } from 'react';
import { ReactComponent as ReloadIcon } from '../../assets/reload-icon.svg'
import './reload-button.styles.scss';

type reloadButtonProps = {
    updateFunction: (id?: string | undefined) => void;
    loadingFlag: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ReloadButton: FC<reloadButtonProps> = observer(({ updateFunction, loadingFlag, children }) => {

    return(
        <button disabled={loadingFlag} className="reload-button-container" onClick={() => { updateFunction(); }}>
            <ReloadIcon className="reload-button-icon" />{children}
        </button>
    )
})