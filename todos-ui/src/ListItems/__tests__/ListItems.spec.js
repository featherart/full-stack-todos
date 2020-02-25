import React from 'react';
import {
  render,
  cleanup,
  wait
} from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import { ListItems } from '../ListItems';
import { FETCH_ITEMS } from '../../api';
import { items } from '../__mocks__/data.js';

afterAll(cleanup);

const renderComponent = () =>
  render(
    <FetchMock
      mocks={[
        {
          matcher: FETCH_ITEMS,
          method: 'GET',
          response: items
        }
      ]}
    >
      <ListItems />
    </FetchMock>
  );

describe('ListItems', () => {
  it('renders a list of todo items', async () => {
    const { getByText } = renderComponent();
    await wait(() => getByText(/do a little dance/i));
    await wait(() => getByText(/buy shoes/i));
    await wait(() => getByText(/eat chocolate/i));
    await wait(() => getByText(/watch sabrina/i));
    await wait(() =>
      getByText(/swim the english channel/i)
    );
    await wait(() => getByText(/pet the dog/i));
    await wait(() => getByText(/bake bread/i));
  });
});
