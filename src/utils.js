const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export const generateNewCode = (state) => {
  let maxCode = 0;
  state.forEach(element => {
    if (element.code > maxCode) {
      maxCode = element.code;
    }
  })
  return maxCode + 1;
}

export const getClickText = (number) => {
  if (number > 1 & number < 5) {
    return `Выделяли ${number} разa`
  } else {
    return `Выделяли ${number} раз`
  }
}