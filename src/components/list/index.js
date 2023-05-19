import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({list,onClick,btnText,isCardActive}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} isCardActive={isCardActive} onClick={onClick} btnText={btnText}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  isCardActive: PropTypes.bool
};

// List.defaultProps = {
//   onDeleteItem: () => {},
//   onSelectItem: () => {},
// }

export default React.memo(List);
