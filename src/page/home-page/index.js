import PropTypes from 'prop-types';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import { memo } from 'react';

function HomePage ({list,renderItem,size,onChangePage}){
   return (
     <>
       <List list={list} renderItem={renderItem}/>
       <Pagination size={size} range={10} onChangePage={onChangePage} />
     </>
   )
 }


 HomePage.PropTypes = {
   list: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
   })).isRequired,
   renderItem: PropTypes.func,
   size: PropTypes.number.isRequired,
   onChangePage: PropTypes.func.isRequired,
 }
 export default memo(HomePage)