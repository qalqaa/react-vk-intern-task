import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import styles from './EditDialog.module.scss';
import store from '../../stores/store';
import { ICardProps } from '../../model/card';

interface EditDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  item: ICardProps;
}

const EditDialog = (props: EditDialogProps) => {
  const { visible, setVisible, item } = props;
  const [name, setName] = useState<string>(item.name);
  const [ownerName, setOwnerName] = useState<string>(item.ownerName || '');
  const [description, setDescription] = useState<string>(
    item.description || '',
  );

  const handleSubmit = () => {
    setVisible(false);
    store.updateItem(item.id, {
      name,
      ownerName,
      description,
    });
  };
  return (
    <Dialog
      header="Изменение карточки репозитория"
      visible={visible}
      style={{ width: '30vw' }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className={styles.inputs}>
        <label htmlFor="username">Название репозитория</label>
        <InputText
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="ownerName">Имя владельца</label>
        <InputText
          id="ownerName"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
        <label htmlFor="description">Описание</label>
        <InputText
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={() => handleSubmit()} label="Подтвердить" />
      </div>
    </Dialog>
  );
};

export default EditDialog;
