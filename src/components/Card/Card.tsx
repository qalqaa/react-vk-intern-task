import { Button } from 'primereact/button';
import styles from './Card.module.scss';

interface ICardProps {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: Date;
  ownerName?: string;
  avatar_url: string;

  onDelete: () => void;
  onEdit: () => void;
}

const Card = ({
  id,
  name,
  ownerName,
  description,
  avatar_url,
  html_url,
  created_at,
  onDelete,
  onEdit,
}: ICardProps) => {
  const formattedDate = created_at
    .toString()
    .split('T')
    .shift()
    ?.split('-')
    .join('/');
  return (
    <div className={styles.container} key={id}>
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
        <p>Created: {formattedDate}</p>
      </div>
      <div className={styles.actions}>
        <Button
          className={styles.visit}
          label="Visit Repository"
          icon="pi pi-github"
          onClick={() => window.open(html_url, '_blank')}
        ></Button>
        <Button
          className={styles.edit}
          label="Edit"
          icon="pi pi-pencil"
          onClick={onEdit}
        />
        <Button
          className={styles.delete}
          icon="pi pi-trash"
          label="Delete"
          outlined
          severity="danger"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default Card;
