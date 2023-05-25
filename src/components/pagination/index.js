import { memo, useEffect, useState } from "react"
import { getVisiblePages } from "../../utils";
import PropTypes from "prop-types";
import 'style.css'

function Pagination({size, onChangePage}){
  
   const [visiblePages, setVisiblePages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1)

   useEffect(()=>{
      setVisiblePages(() => getVisiblePages(1, Math.ceil(size/10)));
   }, [size])


   function changePage(pageNumber){
      if(typeof pageNumber ==='number'){
         setCurrentPage(pageNumber)
         setVisiblePages(() => getVisiblePages(pageNumber, Math.ceil(size/10)));
         onChangePage(10, pageNumber * 10 - 10);
      }
   }

   return(
      <>
         <div className="Pagination">
            <div className="Pagination-wrapper">
               {
                  visiblePages &&  visiblePages.map(item =>(
                  <div key={item} className={ currentPage ===item ? "Pagination-active" : "Pagination-number" } onClick={() => changePage(item)}>{item}</div>  
                  ))
               }
            </div>
         </div>
      </>
   )
}

Pagination.propTypes = {
   size: PropTypes.number.isRequired,
   onChangePage: PropTypes.func.isRequired,
 };

export default memo(Pagination)