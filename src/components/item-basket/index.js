import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import './style.css';
import { multiLanguges } from '../../languages';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div onClick={() => props.closeModal()} className={cn('title') }>
        <Link className='link' to={props.pathLink}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {multiLanguges[props.language].item}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{multiLanguges[props.language].delete}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  closeModal:propTypes.func,
  pathLink: PropTypes.string.isRequired,
  language: PropTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
