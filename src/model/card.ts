export interface ICardProps {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: Date;
  ownerName?: string;
  avatar_url: string;

  onDelete: () => void;
}
