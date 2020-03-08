import React from 'react';
import {
  render,
  cleanup,
  fireEvent
} from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import { AddItemForm } from '../AddItemForm';
import { FETCH_ITEMS } from '../../api';

afterAll(cleanup);

const item = {
  item: {
    description: 'cut hair',
    priority: '1',
    is_complete: false
  }
};
global.fetch = jest.fn();
const mockSubmit = jest.fn();
const priorities = [
  { value: 1, label: 'high' },
  { value: 2, label: 'medium' },
  { value: 3, label: 'low' }
];
const setDescription = jest.fn();
const setPriority = jest.fn();
const description = 'cut hair';

const renderComponent = () =>
  render(
    <FetchMock
      mocks={[
        {
          matcher: FETCH_ITEMS,
          method: 'POST',
          response: item
        }
      ]}
    >
      <AddItemForm
        handleSubmit={mockSubmit}
        priorities={priorities}
        setDescription={setDescription}
        setPriority={setPriority}
        description={description}
      />
    </FetchMock>
  );

describe('AddItemForm', () => {
  it('form elements can accept new values', () => {
    const {
      getByTestId,
      getByText,
      getByPlaceholderText
    } = renderComponent();
    const input = getByPlaceholderText('description');
    fireEvent.change(input, {
      target: { value: description }
    });
    expect(input.value).toBe(description);
    const select = getByTestId('priority');
    fireEvent.change(select, { target: { value: '1' } });
    expect(getByText('high')).toBeInTheDocument();
    expect(select.value).toBe('1');
    const submitButton = getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
