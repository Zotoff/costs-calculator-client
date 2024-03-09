import { useTheme } from "../../hooks";

export const Header: React.FC = () => {
    const {switchTheme, theme} = useTheme();
    return (
        <>
            <header className="container d-flex justify-content-between align-items-center">
                <h1
                    data-bs-theme={theme}
                >Costs App</h1>
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