import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { Route, Routes } from 'react-router-dom';
import BasketItemInfo from '../../components/basket-item-info';
import HomePage from '../../page/home-page';
import { useLocation } from 'react-router-dom';
import { multiLanguges } from '../../languages';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);


  const {pathname} = useLocation();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    size: state.catalog.size,
    language:state.language.language
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы для пагинации
    changePageDataByPagination: useCallback((limit,scip) => store.actions.catalog.changePageByPagination(limit,scip),[store]),
    // Получние информации о товаре
    // getGoodData: useCallback( id => store.actions.good.load(id), [store]),
    changeLanguage :useCallback((language)=>store.actions.language.changeLanguage(language),[store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };
  


  return (
    <PageLayout>
      <div>
        <Head title={pathname === '/' ? multiLanguges[select.language].shop: multiLanguges[select.language].productName} />
        <div>
          <div onClick={()=>callbacks.changeLanguage("en")}>en</div>
          <div onClick={()=>callbacks.changeLanguage("ru")}>ru</div>
        </div>
      </div>
      <div className='mainBasketHead'>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </div>
      <Routes>
        <Route path="/" element={ <HomePage 
                                  list={select.list} 
                                  renderItem={renders.item} 
                                  size={select.size} 
                                  onChangePage={callbacks.changePageDataByPagination}
                                  />} 
        />
        <Route path="good/:id" element={<BasketItemInfo addGood={callbacks.addToBasket}/>} />
      </Routes>
    </PageLayout>

  );
}

export default memo(Main);
