import styles from './App.module.css';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import { observer } from 'mobx-react-lite';
import store from './stores/store';
import { fetchData } from './data/api';
import { useEffect } from 'react';

const App = observer(() => {
  useEffect(() => {
    fetchData(1).then((data) => {
      console.log(data);
    });
  });

  return (
    <>
      <div className={styles.container}></div>
    </>
  );
});

export default App;
