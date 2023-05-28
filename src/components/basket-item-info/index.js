import { memo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { getGoodInfo } from "../../api";
import Loader from "../loader";
import { numberFormat } from "../../utils";
import 'style.css';
import { multiLanguges } from "../../languages";

function BasketItemInfo({addGood,basketItem,language}){

   return (
      <>
      {basketItem ?
      <div className="basketItemContainer">
         <div>{basketItem.description}</div>
         <div>{multiLanguges[language].madeIn}: <strong>{basketItem.madeIn.title} ({basketItem.madeIn.code})</strong></div>
         <div>{multiLanguges[language].category}: <strong>{basketItem.category.title}</strong></div>
         <div>{multiLanguges[language].yearOfIssue}: <strong>{basketItem.edition}</strong></div>
         <div className="itemPriceInBasket"><strong>{multiLanguges[language].price}: {numberFormat(basketItem.price)} ₽</strong></div>
         <div><button onClick={()=> addGood(basketItem._id)}>{multiLanguges[language].add}</button></div>
      </div>
      :
      <Loader />
      }
      </>
   )
}

BasketItemInfo.PropTypes = {
   addGood: PropTypes.func,
   basketItem:PropTypes.object.isRequired,
   language: PropTypes.string.isRequired
}


export default memo(BasketItemInfo);