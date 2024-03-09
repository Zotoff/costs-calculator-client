import { useEffect, useState } from "react"

export const useTheme = () => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme') as string) || 'dark');

    const darkTheme = 'dark';
    const lightTheme = 'light';

    const switchTheme = () => {
        const inverseMode = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', JSON.stringify(inverseMode))
        setTheme(inverseMode);
    }

    useEffect(() => {
        const htmlRootElement = document.querySelector('html') as HTMLElement;
        htmlRootElement.getAttribute('data-bs-theme') === lightTheme ?  htmlRootElement.setAttribute('data-bs-theme', darkTheme) : htmlRootElement.setAttribute('data-bs-theme', lightTheme);
    }, [theme]);

    return {switchTheme, theme};
}