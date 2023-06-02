import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";

function ButtonLink({link, text}) {

  return (
    <button>
      <Link to={link}>
         {text}
      </Link>
    </button>
  )
}

ButtonLink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
};

export default memo(ButtonLink);
