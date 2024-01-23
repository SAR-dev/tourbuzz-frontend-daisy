import { CheckIcon, SwatchIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Modal from './Modal';
import { ThemeName, useThemeStore } from '@src/stores/themeStore';

function ThemeSwitcher(): JSX.Element {
    const [show, setShow] = useState(false)
    const toogleShow = () => setShow(!show);
    const { theme, setTheme } = useThemeStore();

    return (
        <div>
            <details className="dropdown">
                <summary className="btn btn-ghost">Theme</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                    {Object.keys(ThemeName).map((key, i) => (
                        <li key={i}>
                            <button onClick={() => setTheme(ThemeName[key as keyof typeof ThemeName])}>
                                {key}
                                {theme === ThemeName[key as keyof typeof ThemeName] && (
                                    <CheckIcon className='h-5 w-5 ml-auto' />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </details>
        </div>
    );
}

export default ThemeSwitcher;
