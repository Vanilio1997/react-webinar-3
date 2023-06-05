import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    return {
      isAuthorized:  localStorage.getItem('token') ? true : false,
      token: localStorage.getItem('token') ?  localStorage.getItem('token') : null,
      userName: localStorage.getItem('name') ?  localStorage.getItem('name') : null,
      errorInfo: '',
      successfulRequest: false,
    };
  }

// Получение данных с сервера
    async loginUser(bodyInfo){
         const response =  await fetch('/api/v1/users/sign', {
            method: 'POST',
            body: JSON.stringify(bodyInfo),
            headers: {
               'Content-Type': 'application/json'
            }
         });
         const json = await response.json();
         if(response.status === 200 ||response.status === 304 ){
            localStorage.setItem('token', json.result.token);
            localStorage.setItem('name', json.result.user.profile.name);
            this.setState({
               ...this.getState(),
               token: json.result.token,
               userName: json.result.user.profile.name,
               isAuthorized:true,
               successfulRequest: true,
               errorInfo: null
             }, 'Успешная авторизация');
         } else{
            this.setState({
               ...this.getState(),
               isAuthorized:false,
               successfulRequest: false,
               errorInfo: json.error.data.issues[0].message,
               userName: null,
               token: null,
             }, 'Неудачная авторизация');
         }
   }

   async leaveProfile(){
      const response =  await fetch('/api/v1/users/sign', {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'X-Token': localStorage.getItem('token')
         }
      });
      if(response.status === 200 || response.status === 304){
         localStorage.removeItem('token');
         localStorage.removeItem('name');
         
         this.setState({
            ...this.getState(),
            token: null,
            userName: null,
            isAuthorized:false,
          }, 'Успешный выход из профиля');
      }
   }
}

export default LoginState;
