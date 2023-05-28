import StoreModule from "../module";
import { getGoodInfo } from "../../api";


class Good extends StoreModule {
   initState() {
      return {
        goodInfo: null,
      }
    }

    async load(id) {
      this.setState({
        goodInfo:null
      });
      const good = await getGoodInfo(id);

      this.setState({
        goodInfo:good
      });
    }
}

export default Good