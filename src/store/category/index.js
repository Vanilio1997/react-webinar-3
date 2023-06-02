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

      this.setState({
         ...this.getState(),
         list: json.result.items,
       }, 'Загружен список категорий из АПИ');
   }
}

export default CategoryState;
