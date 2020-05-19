import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginator = () => {
  return (
    <Pagination>
      <Pagination.Prev>Previous</Pagination.Prev>
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{8}</Pagination.Item>
      <Pagination.Item>{9}</Pagination.Item>
      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next>Next</Pagination.Next>
    </Pagination>
  );
};

export default Paginator;