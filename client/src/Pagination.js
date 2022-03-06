import React from 'react';
import { Pagination } from 'react-bootstrap';

export const AppPagination = ({ active, totalPage, paginationItemClicked }) => {
  let items = [];
  let itemOnPage = 5;
  let startIndex = active - 2;
  if (startIndex < 1) startIndex = 1;
  let endIndex = startIndex + 4;
  if (endIndex > totalPage) endIndex = totalPage;

  for (let number = startIndex; number <= endIndex; number++) {
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

  const handleChange = (e) => {
    console.log(e);
    // this.setState( { [name]: value } );
  };

  return (
    <Pagination
      name="page"
      value={0}
      totalPages={totalPage}
      onChange={handleChange}
    />
    // <Pagination>
    //   {active > 1 && (
    //     <>
    //       <Pagination.First onClick={() => paginationItemClicked(1)} />
    //       <Pagination.Prev onClick={() => paginationItemClicked(active - 1)} />
    //     </>
    //   )}
    //   {items}
    //   {active < totalPage && (
    //     <>
    //       <Pagination.Next onClick={() => paginationItemClicked(active + 1)} />
    //       <Pagination.Last onClick={() => paginationItemClicked(totalPage)} />
    //     </>
    //   )}
    // </Pagination>
  );
};
