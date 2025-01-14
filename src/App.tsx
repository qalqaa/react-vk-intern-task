import styles from './App.module.scss';
import { Toast, ToastMessage } from 'primereact/toast';
import { observer } from 'mobx-react-lite';
import store from './stores/store';
import { RefObject, useEffect, useRef } from 'react';
import { Skeleton } from 'primereact/skeleton';
import Card from './components/Card/Card';
import Header from './components/Header/Header';

const App = observer(() => {
  const listRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    if (!store.items.length && !store.loading) {
      store.fetchItems();
    }
  }, []);

  useEffect(() => {
    useToast('error', store.error, toastRef);
  }, [store.error]);

  const useToast = (
    severity: ToastMessage['severity'],
    state: string | null,
    ref: RefObject<Toast | null>,
  ) => {
    if (state && ref.current && severity) {
      ref.current.show({
        severity: severity,
        summary: severity.slice(0, 1).toUpperCase() + severity.slice(1),
        detail: state,
      });
    }
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = listRef.current;
      const bottom = scrollHeight === scrollTop + clientHeight;
      if (bottom && !store.loading) {
        store.fetchItems();
      }
    }
  };

  return (
    <>
      <Header />
      <Toast ref={toastRef} />
      <div ref={listRef} onScroll={handleScroll} className={styles.container}>
        <ul className={styles.list}>
          {store.items.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              ownerName={item.owner.login}
              description={item.description}
              onDelete={() => store.removeItem(item.id)}
              onEdit={() =>
                store.updateItem(item.id, { ...item, name: 'Updated' })
              }
            />
          ))}
          {store.loading &&
            Array.from({ length: store.itemsPerPage }, (_, index) => (
              <Skeleton
                height="250px"
                className={styles.skeleton}
                key={index}
              />
            ))}
        </ul>
      </div>
    </>
  );
});

export default App;
