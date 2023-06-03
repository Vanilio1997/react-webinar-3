import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    return {
      token: '',
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
         if(response.status === 200){
            localStorage.setItem('token', json.result.token)
            this.setState({
               ...this.getState(),
               token: json.result.token,
               successfulRequest: true,
               errorInfo: null
             }, 'Успешная авторизация');
         } else{
            this.setState({
               ...this.getState(),
               successfulRequest: true,
               errorInfo: json.error.data.issues[0].message,
               token: null,
             }, 'Неудачная авторизация');
         }

         console.log(this.getState());
   }

   async leaveProfile(){
      const response =  await fetch('/api/v1/users/sign', {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'X-Token': localStorage.getItem('token')
         }
      });
      if(response.status === 200){
         localStorage.removeItem('token')
         this.setState({
            ...this.getState(),
            token: null,
          }, 'Успешная авторизация');
      }
   }
}

export default LoginState;
