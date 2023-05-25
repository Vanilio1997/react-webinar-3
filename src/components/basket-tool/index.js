import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";
import { multiLanguges } from "../../languages";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const select = useSelector(state => ({
    language:state.language.language
  }));
  return (
    <div className={cn()}>
       <div className={cn('link')}>
          <Link  to={'/'}>{multiLanguges[select.language].mainPage}</Link>
        </div>
        <div>
          <span className={cn('label')}>{multiLanguges[select.language].inBacket}:</span>
          <span className={cn('total')}>
            {amount
              ? `${amount} ${plural(amount, {one:'товар', few:'товара', many:'товаров'})} / ${numberFormat(sum)} ₽`
              : multiLanguges[select.language].empty
            }
          </span>
          <button onClick={onOpen}>{multiLanguges[select.language].link}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
