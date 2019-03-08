import React from 'react'
import Button from './Button'
const Pagination = (props) => {
  return ( 
    <nav aria-label="Page navigation example" className="d-flex justify-content-end">
      <ul class="pagination inline">
        {props.page > 1 ? (
          <li class="page-item cursor" onClick={() => props.changePage(-1)}>
            <Button text="Previous" classes="btn btn-outline-dark"></Button>
          </li>
        ) : (
          <></>
        )}
        {props.page < 50 ? (
          <li class="page-item cursor" onClick={() => props.changePage(1)}>
            <Button text="Next" classes="btn btn-outline-dark"></Button>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}
 
export default Pagination;