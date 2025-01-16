import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { ICardProps } from '../../model/card';

describe('Card Component', () => {
  const mockProps: ICardProps = {
    id: 1,
    name: 'Test Card',
    ownerName: 'John Doe',
    description: 'This is a test card',
    avatar_url: 'https://example.com/avatar.jpg',
    html_url: 'https://example.com',
    created_at: new Date('2022-11-16T05:58:46Z'),
    onDelete: jest.fn(),
  };

  it('should correctly format and display the creation date in "YYYY/MM/DD" format', () => {
    render(<Card {...mockProps} />);
    const formattedDate = screen.getByText('Создан: 16/11/2022');
    expect(formattedDate).toBeInTheDocument();
  });

  it('should make the EditDialog visible when the Edit button is clicked', () => {
    render(<Card {...mockProps} />);
    const editButton = screen.getByLabelText('Изменить');
    fireEvent.click(editButton);
    const editDialog = screen.getByRole('dialog');
    expect(editDialog).toBeVisible();
  });

  it('should open the provided URL in a new tab when the Visit button is clicked', () => {
    const mockWindowOpen = jest.fn();
    window.open = mockWindowOpen;

    render(<Card {...mockProps} />);
    const visitButton = screen.getByText('Перейти на страницу');
    fireEvent.click(visitButton);

    expect(mockWindowOpen).toHaveBeenCalledWith(mockProps.html_url, '_blank');
  });

  it('should call the onDelete function when the Delete button is clicked', () => {
    render(<Card {...mockProps} />);
    const deleteButton = screen.getByText('Удалить');
    fireEvent.click(deleteButton);

    expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
  });
});
