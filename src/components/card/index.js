import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Head from "../head";
import List from "../list";
import MainContainer from "../main-container";

function Card({list, onDelete, onClose, isCardActive,fullPrice}){
  return (
    <div className={ isCardActive ? "Card" : "CardClose"}>
      <div className="CardWrapper">
        <div>
          <Head title='Магазин'/>
          <button className="cardBtn" onClick={onClose}>Закрыть</button>
        </div>
        <MainContainer>
          { list.length 
          ?
          <>
            <div className="diveder" />
            <List list={list} onClick={onDelete} isCardActive={isCardActive} btnText='удалить' />
          </>
          :
          <div>Корзина пуста</div>
          }
          <div className="finalResult">
            <strong>Итого</strong>
            <strong>{fullPrice} ₽</strong>
          </div>
        </MainContainer>
      </div>
    </div>
  )
}

Head.propTypes = {
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.shape({
   code: PropTypes.number
 })).isRequired,
 isCardActive: PropTypes.bool.isRequired,
 fullPrice: PropTypes.number
};

export default React.memo(Card);
