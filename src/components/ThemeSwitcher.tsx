import { CheckIcon, SwatchIcon } from '@heroicons/react/24/solid';
import { ThemeName, useThemeStore } from '@src/stores/themeStore';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div>
            <details className="dropdown">
                <summary className="btn btn-ghost">
                    <SwatchIcon className='h-5 w-5' />
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                    {Object.keys(ThemeName).map((key, i) => (
                        <li key={i}>
                            <button className='theme-controller' onClick={() => setTheme(ThemeName[key as keyof typeof ThemeName])}>
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
