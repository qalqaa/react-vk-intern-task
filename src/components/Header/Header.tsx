import { useState, useContext, useEffect } from 'react';
import { PrimeReactContext } from 'primereact/api';
import styles from './Header.module.scss';
import { ToggleButton } from 'primereact/togglebutton';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';

const Header = () => {
  const sortOptions = [
    { name: 'По имени', code: 'name' },
    { name: 'По автору', code: 'author' },
  ];
  const [themeChecked, setThemeChecked] = useState(false);
  const [sort, setSort] = useState(sortOptions[0]);

  const { changeTheme } = useContext(PrimeReactContext);

  const handleThemeChange = () => {
    setThemeChecked(!themeChecked);
  };

  useEffect(() => {
    const linkElementId = 'theme-link';
    const linkElement = document.getElementById(linkElementId);
    const lightTheme = 'lara-light-blue';
    const darkTheme = 'lara-dark-blue';
    if (changeTheme && linkElement)
      if (themeChecked) {
        changeTheme(darkTheme, lightTheme, linkElementId);
      } else {
        changeTheme(lightTheme, darkTheme, linkElementId);
      }
  }, [changeTheme, themeChecked]);

  return (
    <header className={styles.header}>
      <a href="/">
        <img src="/vk.svg" alt="" />
      </a>
      <ul className={styles.list}>
        <li>
          <div className="card flex justify-content-center">
            <FloatLabel className="w-full md:w-14rem">
              <Dropdown
                inputId="dd-city"
                value={sort}
                onChange={(e) => setSort(e.value)}
                options={sortOptions}
                optionLabel="name"
                className="w-full"
              />
              <label htmlFor="dd-city">Filter by</label>
            </FloatLabel>
          </div>
        </li>
        <li>
          <ToggleButton
            checked={themeChecked}
            onLabel=""
            aria-label="Toggle theme"
            onIcon="pi pi-sun"
            offIcon="pi pi-moon"
            onChange={() => handleThemeChange()}
          />
        </li>
      </ul>
    </header>
  );
};

export default Header;
