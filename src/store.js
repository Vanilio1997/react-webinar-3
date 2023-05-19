import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  // Добавляем товар в корзину 

  addGoodToBasket(good){
    this.setState({
      ...this.state,
      list: this.state.list.map((item) =>{
        if(good.code === item.code){
          if(item.quantity){
            return {...item , quantity: item.quantity + 1};
          } else{
            return {...item , quantity: 1, isInBasket: true};
          }
        } else{
          return item;
        }
      }),
      quantityOfGoods: good.isInBasket ? this.state.quantityOfGoods: this.state.quantityOfGoods + 1,
      priceForAllGoods: this.state.priceForAllGoods + good.price
    })
  }

  // Удаляем товар из корзины
  deleteGoodFromBasket(good){
    this.setState({
      ...this.state,
      list: this.state.list.map((item) =>{
        if(good.code === item.code){
          return  {...item, isInBasket: false , quantity:0};
        } else {
          return item;
        }
      }),
      quantityOfGoods: this.state.quantityOfGoods - 1,
      priceForAllGoods: this.state.priceForAllGoods - good.price * good.quantity
    })
  }


  // Открываем модальное окно (Мог объединить эту функцию с закрыть модальное окно, но не стал)  
  openCard(){
    this.setState({
      ...this.state,
      isBacketCardOpen: true
    })
  }

  // Закрываем модальное окно
  closeCard(){
    this.setState({
      ...this.state,
      isBacketCardOpen: false
    })
  }
  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Store;
