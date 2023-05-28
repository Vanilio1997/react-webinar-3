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
      size: 0,
      currentPage:1,
      range:10
    }
  }

  async load(limit, scip) {
    const {items , count} = await getStartData(limit, scip);;
    this.setState({
       ...this.getState(),
       list: items,
       size: count,
    }, 'Загружены товары из АПИ');
  }

  async changePageByPagination(limit,scip){
    const list = await getPadinationData(limit, scip);
    this.setState({
      ...this.getState(),
      list: list
    })
  }

  changeCurrentPage(pageNumber){
    this.setState({
      ...this.getState(),
      currentPage: pageNumber
    })
  }

}

export default Catalog;
