import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: '',
      },
      count: 0,
      waiting: false
    }
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('category')) validParams.category = urlParams.get('category');
    await this.setParams({...this.initState().params, ...validParams, ...newParams}, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = {...this.initState().params, ...newParams};
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = {...this.getState().params, ...newParams};

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params,
      waiting: true
    }, 'Установлены параметры каталога');

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    let apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };

    if(params.category){
      apiParams = { ...apiParams,  'search[category]': params.category }
    }

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    const filtredArr = [];
    let deepLvlCount = 0;
    // let dateSortArr = jsonNewFetch.result.items;
    let dateObj = {};
    //   dateSortArr.forEach( (element) =>{
    //   deepLvlCount = 0;
    //   if(element.parent){
    //     // const newValue = setDeepLvl(element, jsonNewFetch.result.items)
    //     filtredArr.push(setDeepLvl(element, jsonNewFetch.result.items))
    //   } else{
    //     filtredArr.push({...element, deepLvl:0, textValueInOption: element.title})
    //   }
    // })



    // dateSortArr.sort((a,b) => {
    //   // console.log(a,b);
    //   const firstElementIsParent = checkIsParent(b, a, dateSortArr);
    //   const secondElementisParent = checkIsParent(a, b, dateSortArr);
    //   // console.log(a, b, firstElementIsParent, secondElementisParent);
    //   if( secondElementisParent || a.parent?._id === b.parent?._id){
    //     if(b._id === a.parent?._id){
    //       console.log(a,b);
    //       return 1;
    //     }
    //   } else {
    //     return -1
    //   }
    // })


    function checkIsParent(child, parent, arr){
      if(!child.parent){
        return false
      } else if(parent._id === child.parent._id){
        return true
      } else if(child.parent && parent._id !== child.parent._id){
       const indexOfElement = linearSearch(child.parent._id , arr);
        return checkIsParent(arr[indexOfElement], parent, arr);
      } else{
        return false
      }
    }
  
    // for(var i = 0; i < dateSortArr.length; i++){
    //   if(dateSortArr[i].parent){
    //     const parentElement = linearSearch(dateSortArr[i].parent._id, dateSortArr);
    //     
    //     dateSortArr.splice(parentElement + 1, 0, dateSortArr[i]);
    //   
    //     dateSortArr.splice(i , 1);
    //   } else{
    //     console.log('noooooooooooo');
    //   }
    // }
    // console.log(dateSortArr);
// console.log(dateSortArr);

//     function setDeepLvl(element, arr){ 
//         const parentElement = arr.find(item => item._id === element.parent._id);
//         if(parentElement.parent){
//           deepLvlCount++
//           setDeepLvl(parentElement, arr)
//           // debugger
//         } else {
//           deepLvlCount++
//           return {...element , deepLvl:deepLvlCount, textValueInOption: `-${element.title}`};
//         }
//     }

    function linearSearch(id, list) {
      // console.log(id, list);
      let found = false;
      let position = -1;
      let index = 0;
      while(!found && index < list.length) {
          if(list[index]._id == id) {
              found = true;
              position = index;
          } else {
              index += 1;
          }
      }
      return position;
  }

// console.log(filtredArr);

    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }
}

export default CatalogState;