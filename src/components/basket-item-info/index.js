import { memo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { getGoodInfo } from "../../api";
import Loader from "../loader";
import { numberFormat } from "../../utils";
import 'style.css';
import useSelector from "../../store/use-selector";
import { multiLanguges } from "../../languages";

function BasketItemInfo({addGood}){
   const {id} = useParams();
   const [good,setGood] = useState(null);

   const select = useSelector(state => ({
      language:state.language.language
    }));
   useEffect( () => {
      // Решил реализовать так,но могу через store.
      (async () =>{
         const ourGood = await getGoodInfo(id);
         setGood(ourGood);
      })()
   },[id]);

   return (
      <>
      {good ?
      <div className="basketItemContainer">
         <div>{good.description}</div>
         <div>Страна произовдитель: <strong>{good.madeIn.title} ({good.madeIn.code})</strong></div>
         <div>Категория: <strong>{good.category.title}</strong></div>
         <div>Год выпуска: <strong>{good.edition}</strong></div>
         <div className="itemPriceInBasket"><strong>Цена: {numberFormat(good.price)} ₽</strong></div>
         <div><button onClick={()=> addGood(good._id)}>{multiLanguges[select.language].add}</button></div>
      </div>
      :
      <Loader />
      }
      </>
   )
}

BasketItemInfo.PropTypes = {
   addGood: PropTypes.func,
   // good: PropTypes.object.isRequired,
   // getGood: PropTypes.func.isRequired
}


export default memo(BasketItemInfo);