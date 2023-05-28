import StoreModule from "../module";

class  Menu extends StoreModule {
   initState() {
      return (
        [
         {
            text: "mainPage",
            link: "/",
         }
        ]
      )
    }
}

export default Menu