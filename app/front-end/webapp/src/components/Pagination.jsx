import './Pagination.css';

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) => {

  const pages = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  for (let i=1; i <= Math.ceil(totalPages); i++)
    pages.push(i);

  return (
    <div className="pagination">
      <button onClick={() => setCurrentPage(Math.max(1, currentPage-1))}>&lt;</button>
      {pages.map(number => (
        number==currentPage ? (
          <button key={number} onClick={() => setCurrentPage(number)} className="active">{number}</button>
        ) : (
          <button key={number} onClick={() => setCurrentPage(number)}>{number}</button>
        )
      ))}
      <button onClick={() => setCurrentPage(Math.min(currentPage+1, totalPages))}>&gt;</button>
    </div>
  )
}

export default Pagination;