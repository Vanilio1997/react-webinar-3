import { memo, useEffect, useState } from "react"
import { getVisiblePages } from "../../utils";
import PropTypes from "prop-types";
import 'style.css'

function Pagination({size, onChangePage,range,changePageNumber,currentPage}){
  
   const [visiblePages, setVisiblePages] = useState([]);

   useEffect(()=>{
      setVisiblePages(() => getVisiblePages(1, Math.ceil(size/10)));
   }, [size]);

   function changePage(pageNumber){
      if(typeof pageNumber ==='number'){
         changePageNumber(pageNumber)
         setVisiblePages(() => getVisiblePages(pageNumber, Math.ceil(size/range)));
         onChangePage(range, pageNumber * range - range);
      }
   }

   return(
      <>
         <div className="Pagination">
            <div className="Pagination-wrapper">
               {
                  visiblePages &&  visiblePages.map((item,index) =>(
                  <div key={index}
                     className={ currentPage === item ? "Pagination-active" : "Pagination-number" } 
                     onClick={() => changePage(item)}
                  >
                     {item}
                  </div>  
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
   range: PropTypes.number,
   changePageNumber: PropTypes.func.isRequired,
   currentPage: PropTypes.number
 };

export default memo(Pagination)