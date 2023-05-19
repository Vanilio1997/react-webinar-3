import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import BasketInfo from "./components/basket-info";
import Card from "./components/card";
import MainContainer from './components/main-container';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const fullPrice = store.getState().priceForAllGoods;
  const quantity = store.getState().quantityOfGoods;
  const isCardOpen = store.getState().isBacketCardOpen;
  const listInCard = list.filter(good => good.isInBasket);

  const callbacks = {
    onAddGoodToBasket: useCallback((good) =>{
      store.addGoodToBasket(good);
    },[store]),

    onDeleteGoodFromBasket: useCallback((good) =>{
      store.deleteGoodFromBasket(good);
    },[store]),

    onOpenCard: useCallback(() =>{
      store.openCard();
    },[store]),

    onCloseCard: useCallback(() =>{
      store.closeCard();
    },[store]),
  }


  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <MainContainer>
          <BasketInfo fullPrice={fullPrice} quantity={quantity} onOpenCard={callbacks.onOpenCard} />
          <List list={list} isCardActive={isCardOpen} onClick={callbacks.onAddGoodToBasket} btnText={'Добавить'}/>
        </MainContainer>
        <Card list={listInCard} isCardActive={isCardOpen} fullPrice={fullPrice} onClose={callbacks.onCloseCard} onDelete={callbacks.onDeleteGoodFromBasket} />
      </PageLayout>
    </>
  );
}

export default App;
