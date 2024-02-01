import classes from './pagination.module.css'

const Pagination = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
     pageNumbers.push(i);
  }
  
  return (
     <div className={classes.paginationContainer}>
        <ul className={classes.pagination}>
           <li onClick={previousPage} className={classes.pageNumber}>
              Prev
           </li>
           {/* {pageNumbers.map((number) => (
              <li
                 key={number}
                 onClick={() => paginate(number)}
                 className="page-number num"
              >
                 {number}
              </li>
           ))} */}
           <li onClick={nextPage} className={classes.pageNumber}>
              Next
           </li>
        </ul>
     </div>
  );
};

export default Pagination;
