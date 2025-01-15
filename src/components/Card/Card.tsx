import { Button } from 'primereact/button';
import styles from './Card.module.scss';
import EditDialog from '../EditDialog/EditDialog';
import { useState } from 'react';
import { ICardProps } from '../../model/card';

const Card = (props: ICardProps) => {
  const {
    id,
    name,
    ownerName,
    description,
    avatar_url,
    html_url,
    created_at,
    onDelete,
  } = props;
  const [visible, setVisible] = useState(false);
  const formattedDate = created_at
    .toString()
    .split('T')
    .shift()
    ?.split('-')
    .join('/');
  return (
    <div className={styles.container} key={id}>
      <EditDialog visible={visible} setVisible={setVisible} item={props} />
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.author}>
          <img
            className={styles.avatar}
            src={avatar_url}
            alt={ownerName + 'photo'}
          />

          <p>{ownerName}</p>
        </div>
        {description && <p>{description}</p>}
        <p>Создан: {formattedDate}</p>
      </div>
      <div className={styles.actions}>
        <Button
          className={styles.visit}
          label="Перейти на страницу"
          icon="pi pi-github"
          onClick={() => window.open(html_url, '_blank')}
        ></Button>
        <Button
          className={styles.edit}
          label="Изменить"
          icon="pi pi-pencil"
          onClick={() => setVisible(true)}
        />
        <Button
          className={styles.delete}
          icon="pi pi-trash"
          label="Удалить"
          outlined
          severity="danger"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default Card;
