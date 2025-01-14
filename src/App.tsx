import styles from './App.module.css';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';

function App() {
  return (
    <>
      <div className={styles.container}>
        <Button label="Submit" />
      </div>
    </>
  );
}

export default App;
