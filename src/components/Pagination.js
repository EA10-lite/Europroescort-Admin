import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPage, setPageIndex, currentPageIndex, setCurrentPageItems, pageItems }) => {
    const itemsPerPage = 20;
    const pageCount = Math.ceil(totalPage / itemsPerPage);

    const currentItems = pageItems?.slice(
        currentPageIndex * itemsPerPage,
        (currentPageIndex + 1) * itemsPerPage
    );
    setCurrentPageItems(currentItems)

    const handlePageClick = (event) => {
        setPageIndex(event.selected);
    };


    return (
        <>
            <div className="search-pagination justify-center py-16 mdbelow:hidden md:flex">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    forcePage={currentPageIndex}
                />
            </div>

            <div className="search-pagination justify-center py-16 md:hidden flex">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    pageRangeDisplayed={1}
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    forcePage={currentPageIndex}
                />
            </div>
        </>
    )
}


export default Pagination;