import { ProgressSpinner } from 'primereact/progressspinner';
import styles from './Callback.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import store from '../../stores/store';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const hasCalled = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code && !hasCalled.current) {
      hasCalled.current = true;
      exchangeCodeForToken(code);
    }
  }, [searchParams]);

  const exchangeCodeForToken = async (code: string) => {
    const formdata = new FormData();
    formdata.append('client_id', import.meta.env.VITE_CLIENT_ID);
    formdata.append('client_secret', import.meta.env.VITE_CLIENT_SECRET);
    formdata.append('code', code);

    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const url =
      'https://corsproxy.io/' +
      encodeURIComponent('https://github.com/login/oauth/access_token'); //!Спорно, но что поделать, нормальные прокси корсы не работают

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
      });

      const data = await response.json();
      const accessToken = data.access_token;

      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        store.setAccessToken(accessToken);

        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  return (
    <div className={styles.spinner}>
      <ProgressSpinner
        style={{ width: '200px', height: '200px' }}
        strokeWidth="4"
        animationDuration="1s"
      />
    </div>
  );
};

export default Callback;
