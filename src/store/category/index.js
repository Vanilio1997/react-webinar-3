import StoreModule from "../module";

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
      
      // Ниже происходит сортировка по вложенности и добавление дефисов
      const categoriesList = []
      let deepLvlCount = 0
      for(let i = 0; i< arr.length ; i++ ){
        setDeepLvl(arr[i], arr)
        if(arr[i].parent){
          setDeepLvl(arr[i], arr);
          const parentPosition = linearSearch(arr[i].parent?._id, categoriesList);
          const newElementValue = {...arr[i], title: `${setDash(deepLvlCount/2)} ${arr[i].title}`}
          categoriesList.splice(parentPosition + 1, 0 , newElementValue)
          deepLvlCount = 0
        } else{
          categoriesList.push(arr[i])
        }
      }

      // в зависимости от вложенности добавляет дефисы
    function setDash(num){
      let dash = '';
      for(let i = 0; i< num; i++){
       dash = dash + '-';
      }
      return dash
    }
// Эта функция нужна для того чтоб найти родительский элемент в итоговом массиве
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
    

      this.setState({
         ...this.getState(),
         list: categoriesList,
       }, 'Загружен список категорий из АПИ');
   }
}

export default CategoryState;
