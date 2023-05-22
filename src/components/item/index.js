import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural, splitedNumber} from "../../utils";
import "./style.css";
import { getSplitedNumber } from "../../utils";

function Item({item, onClick,btnText,isItModal}){
  function addElement(code){
    onClick(code);
  }

 const splitedPrice = getSplitedNumber(item.price);
 const splitedQuantity = item.quantity && getSplitedNumber(item.quantity);

  return (
    <div className={'Item'}>
      <div className="itemInfo">
        <div className='Item-code'>{item.code}</div>
        <div>{item.title}</div>
      </div>
      <div className="itemInfo">
        <div className="itemInfoContainer">
          <div className="itemInfoElement">{splitedPrice} ₽</div>
          {
            isItModal 
            ?
            <div className="itemInfoElement"> {splitedQuantity} шт</div>
            :
            null
          }
        </div>
        <div className='Item-actions'>
          <button onClick={() => addElement(item.code)}>
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
  isItModal: PropTypes.bool
};

// Item.defaultProps = {
//   onDelete: () => {},
//   onSelect: () => {},
// }

export default React.memo(Item);
