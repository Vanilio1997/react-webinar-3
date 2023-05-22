import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Head from "../head";
import List from "../list";
import { getSplitedNumber } from "../../utils";

function Card({list, onDelete, onClose, isCardActive,fullPrice}){
  const splitedPrice = getSplitedNumber(fullPrice);
  
  return (
    <div className={ isCardActive ? "Card" : "CardClose"}>
      <div className="CardWrapper">
        <div className="headWrapper">
          <Head title='Корзина'/>
          <button className="cardBtn" onClick={onClose}>Закрыть</button>
        </div>
          { list.length 
          ?
          <>
            <div className="emptyArea" />
            <List list={list} onClick={onDelete} isItModal={true} btnText='удалить' />
          </>
          :
          <div>Корзина пуста</div>
          }
          <div className="finalResult">
            <strong>Итого</strong>
            <strong>{splitedPrice} ₽</strong>
          </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.shape({
   code: PropTypes.number
 })).isRequired,
 isCardActive: PropTypes.bool.isRequired,
 fullPrice: PropTypes.number
};

export default React.memo(Card);
