import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { multiLanguges } from "../../languages";

function BasketTool({sum, amount, onOpen,language}) {
  const cn = bem('BasketTool');
  const amountMultiLanguageText = language === "en" ? plural(amount, {one:'good', other:'goods'},"en-En") : plural(amount, {one:'товар', few:'товара', many:'товаров'});
  return (
    <div className={cn()}>
        <div>
          <span className={cn('label')}>{multiLanguges[language].inBasket}:</span>
          <span className={cn('total')}>
            {amount
              ? `${amount} ${amountMultiLanguageText} / ${numberFormat(sum)} ₽`
              : multiLanguges[language].empty
            }
          </span>
          <button onClick={onOpen}>{multiLanguges[language].link}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
