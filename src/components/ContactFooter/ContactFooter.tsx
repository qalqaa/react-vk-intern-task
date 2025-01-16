import styles from './ContactFooter.module.scss';

const ContactFooter = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Сделал: <a href="https://github.com/qalqaa">qalqa</a>
      </p>
      <a href="https://vk.com/qalqaa">Мой вк</a>
      <a href="https://t.me/qalqaa">Мой тг</a>
      <p></p>
    </footer>
  );
};

export default ContactFooter;
