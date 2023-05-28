import { memo, useCallback, useEffect } from "react"
import Head from "../../components/head"
import BasketTool from "../../components/basket-tool"
import { multiLanguges } from '../../languages';
import useSelector from "../../store/use-selector";
import BasketItemInfo from "../../components/basket-item-info";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import PageLayout from "../../components/page-layout";
import Menu from "../../components/menu";
import MenuToolLayout from "../../components/menu-tool-layout";

function BasketItem(){

   const store = useStore();
   const {id} = useParams();
   useEffect(() => {
      store.actions.good.load(id);
    }, []);

   const select = useSelector(state => ({
      amount: state.basket.amount,
      sum: state.basket.sum,
      language:state.language.language,
      goodInfo: state.good.goodInfo,
      menuItems: state.menu
    }));
    const callbacks = {
      // Добавление в корзину
      addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
      // Открытие модалки корзины
      openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      // Смена языка
      changeLanguage :useCallback((language)=>store.actions.language.changeLanguage(language),[store]),
    }

   return (
      <PageLayout>
         <Head title={multiLanguges[select.language].productName} />
         <MenuToolLayout>
            <Menu  menuItems={select.menuItems} language={select.language}/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                        sum={select.sum}
                        language={select.language}
                        />
            </MenuToolLayout>
         <BasketItemInfo addGood={callbacks.addToBasket} basketItem={select.goodInfo} language={select.language} />
      </PageLayout>
   )
}

export default memo(BasketItem)