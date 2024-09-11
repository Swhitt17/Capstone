import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Paginate.css"


const Paginate = ({recipes,totalResults,itemsPerPage,itemOffset, setItemOffset, handleClick}) =>{
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0);
    // console.log(recipes)

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(recipes.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(totalResults / itemsPerPage)); 
    }, [itemOffset,recipes])
   

  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % totalResults;
      handleClick(newOffset);
      // console.log(
      //   `User requested page number ${event.selected}, which is offset ${newOffset}`
      // );
    
      setItemOffset(newOffset);
    };
    return(
        <div>
            <ReactPaginate
             activeClassName="item active"
             breakClassName=" item break"
             breakLabel="..."
             containerClassName="pagination"
             marginPagesDisplayed={2}
             nextClassName=" item next"
             nextLabel="next >"
             onPageChange={handlePageClick}
             pageCount={pageCount}
             pageClassName="item pagination-page"
             pageRangeDisplayed={5}
             previousClassName=" item previous"
             previousLabel="< previous"
             onClick={() => setItemOffset(itemOffset)}
/>
        </div>
    )

}

export default Paginate;