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
               successfulRequest: true
             }, 'Успешная авторизация');
         } else{
            this.setState({
               ...this.getState(),
               successfulRequest: true,
               errorInfo: json.error.data.issues[0].message
             }, 'Неудачная авторизация');
         }

         console.log(this.getState());
   } 
}

export default LoginState;
