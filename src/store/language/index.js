import StoreModule from "../module";

class Language extends StoreModule {
   initState() {
      return {
        language:"ru"
      }
    }

    async changeLanguage(language) {
      this.setState({
         language:language
      });
    }
}

export default Language