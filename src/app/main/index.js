import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { multiLanguges } from '../../languages';
import Menu from "../../components/menu";
import MenuToolLayout from '../../components/menu-tool-layout';
import Loader from '../../components/loader';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    size: state.catalog.size,
    language:state.language.language,
    currentPage: state.catalog.currentPage,
    range: state.catalog.range,
    menuItems: state.menu,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы для пагинации
    changePageDataByPagination: useCallback((limit,scip) => store.actions.catalog.changePageByPagination(limit,scip),[store]),
    // Получние информации о товаре
    changeLanguage :useCallback((language)=> store.actions.language.changeLanguage(language),[store]),
    // Изменить страницу
    changePageNumber: useCallback((pageNumber) => store.actions.catalog.changeCurrentPage(pageNumber),[store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} pathLink={`good/${item._id}`} onAdd={callbacks.addToBasket} language={select.language}/>
    }, [callbacks.addToBasket, select.language]),
  };


  useEffect(() => {
    store.actions.catalog.load(select.range, select.currentPage * select.range - select.range);
  }, []);

  return (
    <PageLayout>
      <div>
        <Head title={multiLanguges[select.language].shop}/>
        <div>
          <div onClick={()=>callbacks.changeLanguage("en")}>en</div>
          <div onClick={()=>callbacks.changeLanguage("ru")}>ru</div>
        </div>
      </div>
        <MenuToolLayout>
        <Menu menuItems={select.menuItems} language={select.language} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}
                    language={select.language}
                    />
        </MenuToolLayout>
        {
          select.list.length 
          ?
          <List list={select.list} renderItem={renders.item}/>
          :
          <Loader />
        }
      <Pagination size={select.size} 
                  range={select.range} 
                  changePageNumber={callbacks.changePageNumber} 
                  onChangePage={callbacks.changePageDataByPagination} 
                  currentPage={select.currentPage}
      />
    </PageLayout>

  );
}

export default memo(Main);
