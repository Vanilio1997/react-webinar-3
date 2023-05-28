import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { multiLanguges } from "../../languages";

function Item(props){
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
        <div className={cn('title')}>
          <Link className='link' to={props.pathLink}>{props.item.title}</Link>
        </div>

      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{multiLanguges[props.language].add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  pathLink: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

Item.defaultProps = {
  onAdd: () => {},
  language: PropTypes.string
}

export default memo(Item);
