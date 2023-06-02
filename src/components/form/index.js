import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';

function Form({items,onSubmit}) {
  const cn = bem('Form');


  const handleSubmit = (event) => {
   event.preventDefault()
   const fields = Array.prototype.slice.call(event.target)
      .filter(el => el.name)
      .reduce((form, el) => ({
        ...form,
        [el.name]: el.value,
      }), {})
      onSubmit(fields)
 }
  return (
   <form class="form-example" onSubmit={handleSubmit}>
      {
         items.map((item)=>(
            <div className="form-example">
               <label for={item.id}>{item.label} </label>
               <input type={item.type} name={item.id} id={item.id} required/>
            </div>
         ))
      }
      <div className="form-example">
         <input type="submit" value="Subscribe!" />
      </div>
   </form>
 
  )
}

Form.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
  })),
  onSubmit: PropTypes.func
}

Form.defaultProps = {
  items: [],
  onNavigate: () => {}
}

export default memo(Form);
