import React from 'react';
import { Pagination } from 'react-bootstrap';

export const AppPagination = ({ active, totalPage, paginationItemClicked }) => {
  let items = [];

  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item
        onClick={() => paginationItemClicked(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return items;
};
