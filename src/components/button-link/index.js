import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";

function ButtonLink({link, text , onClickCallback}) {

  return (
    <Link to={link}>
      <button onClick={ () => onClickCallback() }>
          {text}
      </button>
    </Link>
  )
}

ButtonLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func
};

ButtonLink.defaultProps = {
  onClickCallback: () => null
}

export default memo(ButtonLink);
