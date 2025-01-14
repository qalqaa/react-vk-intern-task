import styles from './App.module.css';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import { observer } from 'mobx-react-lite';
import store from './stores/store';

const App = observer(() => {
  return (
    <>
      <div className={styles.container}>
        <span>Cont:{store.count}</span>
        <Button onClick={() => store.decrement(1)} label="-" />
        <Button onClick={() => store.increment(1)} label="+" />
      </div>
    </>
  );
});

export default App;
