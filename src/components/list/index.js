import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({list,onClick,btnText,isItModal}){
  return (
    <div className='List'>
      <div className="diveder" />
      {
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} isItModal={isItModal} onClick={onClick} btnText={btnText}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  onClick: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  isItModal: PropTypes.bool
};

// List.defaultProps = {
//   onDeleteItem: () => {},
//   onSelectItem: () => {},
// }

export default React.memo(List);
