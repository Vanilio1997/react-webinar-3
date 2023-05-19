import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

function BasketInfo({quantity,fullPrice, onOpenCard}){
  return (
    <div className='BasketInfo'>
      <div> В корзине: {quantity} </div>
      <strong>{plural(quantity, {one: 'товар', few: 'товара', many: 'товаров'})}/ {fullPrice} ₽ </strong>
      <button onClick={() => onOpenCard()}>
        Перейти
      </button>
    </div>
  )
}

BasketInfo.propTypes = {
  quantity: PropTypes.number,
  fullPrice: PropTypes.number,
  onOpenCard: PropTypes.func
};

export default React.memo(BasketInfo);