import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { multiLanguges } from '../../languages';
import { language } from '../../store/exports';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language:state.language.language
  }));

  
  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket  closeModal={callbacks.closeModal} 
                          item={item} 
                          pathLink={`good/${item._id}`}
                          onRemove={callbacks.removeFromBasket}
                          language={select.language}
              />
    }, [callbacks.removeFromBasket, select.language]),
  };

  return (
    <ModalLayout title={multiLanguges[select.language].basket} language={select.language} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} language={select.language}/>
    </ModalLayout>
  );
}

export default memo(Basket);
