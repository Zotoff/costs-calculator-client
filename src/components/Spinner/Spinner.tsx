import { ISpinnerProps } from "../../types";
import './styles.css';

export const Spinner: React.FC<ISpinnerProps> = ({top, left}: ISpinnerProps) => {
    return (
        <div
        className={`spinner-border main-spinner`}
        style={{top: `${top}px`, left: `${left}px`}}></div>
    )
}