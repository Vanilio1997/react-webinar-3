import {memo, useCallback, useEffect, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/layouts/side-layout";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.category.list,
  }));

 

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Получить категории для фильтрации по товару
    getCategories: useCallback(() => store.actions.category.load(),[store]),
    // Фильтрация
    onFilter: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store])
  };


  useEffect(()=>{
    callbacks.getCategories()
  },[])
    const filterCategories = select.categories.map( element => { 
      return {value:element._id , title:element.title}
    })
  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    
    filter: useMemo(() => { 
      return [{value: '', title: 'Все'}, ,...filterCategories] 
    },[select.categories])
  };


  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.filter} value={select.category} onChange={callbacks.onFilter}/> 
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
