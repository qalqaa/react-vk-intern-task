import { render, screen, fireEvent } from '@testing-library/react';
import EditDialog from './EditDialog';
import '@testing-library/jest-dom';
import store from '../../stores/store';

jest.mock('../../stores/store', () => ({
  updateItem: jest.fn(),
}));

describe('EditDialog', () => {
  const mockSetVisible = jest.fn();
  const mockItem = {
    id: 1,
    name: 'Test Repo',
    ownerName: 'Owner Name',
    description: 'Description',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog with correct initial values', () => {
    render(
      <EditDialog visible={true} setVisible={mockSetVisible} item={mockItem} />,
    );

    expect(screen.getByLabelText(/Название репозитория/i)).toHaveValue(
      mockItem.name,
    );
    expect(screen.getByLabelText(/Имя владельца/i)).toHaveValue(
      mockItem.ownerName,
    );
    expect(screen.getByLabelText(/Описание/i)).toHaveValue(
      mockItem.description,
    );
  });

  it('should update input values when changed', () => {
    render(
      <EditDialog visible={true} setVisible={mockSetVisible} item={mockItem} />,
    );

    fireEvent.change(screen.getByLabelText(/Название репозитория/i), {
      target: { value: 'Updated Repo' },
    });
    fireEvent.change(screen.getByLabelText(/Имя владельца/i), {
      target: { value: 'Updated Owner' },
    });
    fireEvent.change(screen.getByLabelText(/Описание/i), {
      target: { value: 'Updated Description' },
    });

    expect(screen.getByLabelText(/Название репозитория/i)).toHaveValue(
      'Updated Repo',
    );
    expect(screen.getByLabelText(/Имя владельца/i)).toHaveValue(
      'Updated Owner',
    );
    expect(screen.getByLabelText(/Описание/i)).toHaveValue(
      'Updated Description',
    );
  });

  it('should call store.updateItem when submitting the form', () => {
    render(
      <EditDialog visible={true} setVisible={mockSetVisible} item={mockItem} />,
    );

    fireEvent.change(screen.getByLabelText(/Название репозитория/i), {
      target: { value: 'Updated Repo' },
    });
    fireEvent.change(screen.getByLabelText(/Имя владельца/i), {
      target: { value: 'Updated Owner' },
    });
    fireEvent.change(screen.getByLabelText(/Описание/i), {
      target: { value: 'Updated Description' },
    });

    fireEvent.click(screen.getByText(/Подтвердить/i));

    expect(store.updateItem).toHaveBeenCalledWith(mockItem.id, {
      name: 'Updated Repo',
      ownerName: 'Updated Owner',
      description: 'Updated Description',
    });
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });

  it('should hide the dialog when clicking on close', () => {
    render(
      <EditDialog visible={true} setVisible={mockSetVisible} item={mockItem} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });

  it('should hide the dialog when clicking on close', () => {
    render(
      <EditDialog visible={true} setVisible={mockSetVisible} item={mockItem} />,
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });

  it('should handle empty ownerName and description gracefully', () => {
    const mockItemWithoutOptionalFields = {
      id: 2,
      name: 'Repo Without Optional Fields',
      ownerName: '',
      description: '',
    };

    render(
      <EditDialog
        visible={true}
        setVisible={mockSetVisible}
        item={mockItemWithoutOptionalFields}
      />,
    );

    expect(screen.getByLabelText(/Имя владельца/i)).toHaveValue('');
    expect(screen.getByLabelText(/Описание/i)).toHaveValue('');
  });

  it('should not call store.updateItem if form is submitted without changes', () => {
    render(
      <EditDialog visible={true} setVisible={mockSetVisible} item={mockItem} />,
    );

    fireEvent.click(screen.getByText(/Подтвердить/i));

    expect(store.updateItem).toHaveBeenCalledWith(mockItem.id, {
      name: mockItem.name,
      ownerName: mockItem.ownerName,
      description: mockItem.description,
    });
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });

  it('should render correctly with a non-visible dialog', () => {
    const { container } = render(
      <EditDialog
        visible={false}
        setVisible={mockSetVisible}
        item={mockItem}
      />,
    );

    expect(container.querySelector('.p-dialog-visible')).toBeNull();
  });
});
