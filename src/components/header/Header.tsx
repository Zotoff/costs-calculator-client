import { useUnit } from "effector-react";
import { useTheme } from "../../hooks";
import { $username } from "../../context/auth";

export const Header: React.FC = () => {
    const {switchTheme, theme} = useTheme();
    const username = useUnit($username);
    return (
        <>
            <header className="container d-flex justify-content-between align-items-center">
                <h1
                    data-bs-theme={theme}
                >Costs App</h1>
                <div style={{color: 'white'}}>{username.length ? username : ''}</div>
                <button
                    onClick={switchTheme}
                    className={`btn btn-${theme}`}
                    data-bs-theme={theme}
                >
                    Change Theme
                </button>
            </header>
        </>
    )
}