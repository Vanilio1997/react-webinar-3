import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import ErrorMessage from "../error-message";
import './style.css';

function Form({items,onSubmit, btnText ,errorMessage}) {
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
   <form className={cn()} onSubmit={handleSubmit}>
      {
         items.map((item)=>(
            <div className="form-example">
               <div>
                  <label for={item.id}>{item.label} </label>
               </div>
               <input type={item.type} name={item.id} id={item.id} required/>
            </div>
         ))
      }
      {
         errorMessage 
         ?
            <ErrorMessage text={errorMessage} />
         :
            null
      }
      <div className="form-example">
         <input type="submit" value={btnText} />
      </div>
   </form>
 
  )
}

Form.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
  })),
  onSubmit: PropTypes.func,
  btnText: PropTypes.string,
  errorMessage: PropTypes.string
}

Form.defaultProps = {
  items: [],
  onSubmit: () => {}
}

export default memo(Form);
