import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";
import { getSplitedNumber } from "../../utils";

function BasketInfo({quantity,fullPrice, onOpenCard}){

  const splitedPrice = getSplitedNumber(fullPrice);
  const splitedQuantity = quantity && getSplitedNumber(quantity);

  return (
    <div className='BasketInfo'>
      <div> В корзине:</div>
      {
      quantity ?
      <strong> {splitedQuantity} {plural(quantity, {one: 'товар', few: 'товара', many: 'товаров'})} / {splitedPrice} ₽ </strong>
      :
      <strong> пусто</strong>
      }
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