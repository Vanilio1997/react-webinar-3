import StoreModule from "../module";
import { getGoodInfo } from "../../api";


class Good extends StoreModule {
   initState() {
      return {
        good: {}
      }
    }

    async load(id) {
      const good = await getGoodInfo();
      this.setState({
         good:good
      });
    }
}

export default Good