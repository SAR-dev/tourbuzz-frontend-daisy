import { SwatchIcon } from '@heroicons/react/24/solid';
import { ThemeName, useThemeStore } from '@src/stores/themeStore';
import DropdownSelect from './DropDownSelect';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div>
            <DropdownSelect
                button={<button className='btn btn-square btn-ghost'><SwatchIcon className='h-5 w-5' /></button>}
                options={Object.keys(ThemeName).map(key => {
                    return {
                        text: key, 
                        value: ThemeName[key as keyof typeof ThemeName], 
                        handleClick: () => setTheme(ThemeName[key as keyof typeof ThemeName])
                    }
                })}
                selectedValue={theme}
            />
        </div>
    );
}

export default ThemeSwitcher;
