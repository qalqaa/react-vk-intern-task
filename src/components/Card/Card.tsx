import { Button } from 'primereact/button';
import styles from './Card.module.scss';

interface CardProps {
  id: number;
  name: string;
  ownerName?: string;
  description: string | null;
  onDelete: () => void;
  onEdit: () => void;
}

const Card = ({
  id,
  name,
  ownerName,
  description,
  onDelete,
  onEdit,
}: CardProps) => {
  return (
    <div className={styles.container} key={id}>
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.author}>Author: {ownerName}</p>
        {description && <p>{description}</p>}
      </div>
      <Button label="Delete" onClick={onDelete} />
      <Button label="Edit" severity="secondary" onClick={onEdit} />
    </div>
  );
};

export default Card;
