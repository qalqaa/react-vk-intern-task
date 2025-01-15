import React, { useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import store from './stores/store';
import styles from './App.module.scss';
import { Toast, ToastMessage } from 'primereact/toast';
import { Skeleton } from 'primereact/skeleton';
import Card from './components/Card/Card';
import Header from './components/Header/Header';

const App = observer(() => {
  const listRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<Toast>(null);

  const debouncedHandleScroll = debounce(() => {
    if (listRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = listRef.current;
      const bottom = scrollHeight - 50 <= scrollTop + clientHeight;

      if (bottom && !store.loading) {
        store.fetchItems();
      }
    }
  }, 200);

  useEffect(() => {
    if (!store.items.length && !store.loading) {
      store.fetchItems();
    }
  }, []);

  useEffect(() => {
    const ref = listRef.current;
    if (ref) {
      ref.addEventListener('scroll', debouncedHandleScroll);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('scroll', debouncedHandleScroll);
      }
      debouncedHandleScroll.cancel();
    };
  }, [debouncedHandleScroll]);

  const useToast = (
    severity: ToastMessage['severity'],
    state: string | null,
    ref: React.RefObject<Toast | null>,
  ) => {
    if (state && ref.current && severity) {
      ref.current.show({
        severity: severity,
        summary: severity.charAt(0).toUpperCase() + severity.slice(1),
        detail: state,
      });
    }
  };

  useEffect(() => {
    useToast('error', store.error, toastRef);
  }, [store.error]);

  return (
    <>
      <Header />
      <Toast ref={toastRef} />

      <div ref={listRef} className={styles.container}>
        <ul className={styles.list}>
          {store.items.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              avatar_url={item.owner.avatar_url}
              created_at={item.created_at}
              html_url={item.html_url}
              ownerName={item.owner.login}
              description={item.description}
              onDelete={() => store.removeItem(item.id)}
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
