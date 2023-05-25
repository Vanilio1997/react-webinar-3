import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import { getStartData ,getPadinationData} from "../../api";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      size: 0
    }
  }

  async load() {
    const {items , count} = await getStartData();
    this.setState({
       ...this.getState(),
       list: items,
       size: count
    }, 'Загружены товары из АПИ');
  }

  async changePageByPagination(limit,scip){
    const list = await getPadinationData(limit, scip);
    this.setState({
      ...this.getState(),
      list: list
    })
  }

}

export default Catalog;
