class I18n {

/**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   * @param lang {string}
   * @param translations {object}
   */

   constructor(services, config = {},lang ,translations) {
      this.services = services;
      this.config = config
      this.listeners = []; 
      this.lang =  this.config.lang || 'ru';
      this.translations = this.config.translations;
    }
    translate(lang, text, plural){
      let result = this.translations[lang] && (text in this.translations[lang])
        ? this.translations[lang][text]
        : text;
    
      if (typeof plural !== 'undefined'){
        const key = new Intl.PluralRules(lang).select(plural);
        if (key in result) {
          result = result[key];
        }
      }
    
      return result;
    }


     /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
   this.listeners.push(listener);
   // Возвращается функция для удаления добавленного слушателя
   return () => {
     this.listeners = this.listeners.filter(item => item !== listener);
   }
 }


   /**
   * Установка состояния
   * @param newLang {string}
   */

   setLang(lang){
      this.lang = lang;
      for (const listener of this.listeners) listener(this.lang)
    }

      /**
   * Выбор состояния
   * @returns {string}
      */

   getLang(){
      return this.lang
   }
    
}

export default I18n;
