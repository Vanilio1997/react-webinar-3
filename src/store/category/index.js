import StoreModule from "../module";
import merge from "lodash.merge";

class CategoryState extends StoreModule {

  initState() {
    return {
      list: []
    };
  }

// Получение данных с сервера
   async load(){
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      const arr = json.result.items;
      let deepLvlCount = 0

      // в зависимости от вложенности добавляет дефисы
    function setDash(num){
      let dash = '';
      for(let i = 0; i< num; i++){
       dash = dash + '- ';
      }
      return dash
    }

  // эта функция смотрит вложенность элемента
    function setDeepLvl(element, arr){ 
        if(element.parent){
          deepLvlCount += 1
          const parentElement =  arr.find(item => item._id === element?.parent?._id);
          if(parentElement.parent){
            setDeepLvl(parentElement, arr);
          }
        }
    }
   
//  Эта функция нужна для того чтоб найти родительский элемент в итоговом массиве
    function linearSearch(id, list) {
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

    let obj = {};
    let categoriesList = [];

    for(let i = 0; i < arr.length; i++){
      setDeepLvl(arr[i], arr);
      arr[i].title = `${setDash(deepLvlCount)} ${arr[i].title}`
      let recurseResult = recurse(arr[i], arr[i]?.parent?._id);
      recurseResult = { [recurseResult.title]: recurseResult};
      obj = merge(obj , recurseResult);
      deepLvlCount = 0;
    }

    // функция для создания объекта с вложенностью
    function recurse(element , parentId){
      if(!parentId){
        return  element;
      } else {
        const parentElementPosition = linearSearch(parentId, arr);
        const parentElement = arr[parentElementPosition];
        parentElement.children = {[element.title]: element};
        return recurse(parentElement , parentElement?.parent?._id);
      }
    }

    // преобразование объекта обратно в массив
    function  objRecurse(obj) {
      getProp(obj);
      function getProp(o) {
          for(let prop in o) {
              categoriesList.push(o[prop]);
              if(o[prop]?.children){
                getProp(o[prop]?.children);
              }
          }
      }
    }

  objRecurse(obj)

    this.setState({
        ...this.getState(),
        list: categoriesList,
      }, 'Загружен список категорий из АПИ');
   }
}

export default CategoryState;
