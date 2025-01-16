import { ICardProps } from './card';

export interface IEditDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  item: Pick<ICardProps, 'id' | 'name' | 'ownerName' | 'description'>;
}
