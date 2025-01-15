import { useState, useContext, useEffect } from 'react';
import { PrimeReactContext } from 'primereact/api';
import styles from './Header.module.scss';
import { ToggleButton } from 'primereact/togglebutton';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import store from '../../stores/store';
import { Sort } from '../../model/store';

const Header = () => {
  const sortOptions: { name: string; code: Sort }[] = [
    { name: 'По кол-ву звезд', code: 'stars' },
    { name: 'По кол-ву forks', code: 'forks' },
    { name: 'По кол-ву issues', code: 'help-wanted-issues' },
    { name: 'По дате обновления', code: 'updated' },
  ];
  const [themeChecked, setThemeChecked] = useState(false);
  const [sort, setSort] = useState(
    sortOptions.find((item) => item.code === store.sort) || sortOptions[0],
  );

  const { changeTheme } = useContext(PrimeReactContext);

  const handleThemeChange = () => {
    setThemeChecked(!themeChecked);
  };

  const handleSort = (event: DropdownChangeEvent) => {
    setSort(event.value);
    store.setSort(sort.code);
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
        <img src="/vk.svg" alt="vk_logo" />
      </a>
      <ul className={styles.list}>
        <li>
          <div className="card flex justify-content-center">
            <FloatLabel>
              <Dropdown
                inputId="dd-city"
                value={sort}
                onChange={(event) => handleSort(event)}
                options={sortOptions}
                optionLabel="name"
                className="w-full"
              />
              <label htmlFor="dd-city">Отсортировать</label>
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
