import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      profileInfo: {},
    };
  }

// Получение данных с сервера
    async getProfileInfo(token){
         const response =  await fetch('/api/v1/users/self', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'X-Token': token
            }
         });
         const json = await response.json();
         this.setState({
          ...this.getState(),
          profileInfo: json,
        }, 'Загружен список категорий из АПИ');
   } 
}

export default ProfileState;
