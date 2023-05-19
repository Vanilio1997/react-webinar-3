import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import "./style.css";

function Item({item, onClick,btnText,isCardActive}){
  function addElement(element){
    onClick(element);
  }

  return (
    <div className={'Item'}>
      <div className="itemInfo">
        <div className='Item-code'>{item.code}</div>
        <div>{item.title}</div>
      </div>
      <div className="itemInfo">
        <div className="itemInfoContainer">
          <div>{item.price} Р</div>
          {
            isCardActive 
            ?
            <div> {item.quantity} шт</div>
            :
            null
          }
        </div>
        <div className='Item-actions'>
          <button onClick={() => addElement(item)}>
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  btnText: PropTypes.string .isRequired,
  isCardActive: PropTypes.bool
};

// Item.defaultProps = {
//   onDelete: () => {},
//   onSelect: () => {},
// }

export default React.memo(Item);
