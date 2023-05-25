/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function getVisiblePages(currentPage,lastPage){

  // Если у нас больше 5 страниц
  console.log(currentPage, lastPage);
  if(lastPage > 5){
    if(currentPage < 3){
      return [1,2,3,'...',lastPage];
    } else if(currentPage < 4){
      return [1,2,3,4,'...',lastPage];
    } else if(currentPage > lastPage - 2 ){
      return [1,'...',lastPage - 2, lastPage - 1, lastPage];
    } else if(currentPage > lastPage - 3){
      return [1,'...',lastPage - 3 ,lastPage - 2, lastPage - 1, lastPage];
    } else{
      return [1,'...',currentPage - 1, currentPage, currentPage + 1,'...', lastPage];
    }
  }
  
  // Если у нас мало страниц для пагинации
  const visiblePagesArr = []
  for(let i = 1; i<= lastPage; i++){
    visiblePagesArr.push(i);
  }
  return visiblePagesArr;
} 