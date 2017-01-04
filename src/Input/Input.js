import React, { PropTypes } from 'react';
import InputStyles from './Input.css';
import PromoInputStyles from './PromoInput.css';
import ModalInputStyles from './ModalInput.css';
import classNames from 'classnames';

const inputFactory = (styles) => {
  const propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    type: PropTypes.string,
    onChange: PropTypes.func,
    input: PropTypes.shape({
      name: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onDragStart: PropTypes.func,
      onDrop: PropTypes.func,
      onFocus: PropTypes.func,
      value: PropTypes.string,
    }),
  };

  function Input(props) {
    const {
      className = styles.Input,
      type = 'text',
      disabled,
      required,
      placeholder,
      onChange,
      value = '',
      input,
      ...other
    } = props;
    const inputFieldClass = disabled ? styles.InputFieldDisabled : styles.InputField;
    const asteriskClass = classNames({
      [`${styles.InputAsterisk}`]: !displayError && !disabled,
      [`${styles.InputAsteriskError}`]: displayError,
      [`${styles.InputAsteriskDisabled}`]: disabled,
    });
    const inputClass = classNames({
      [`${className}`]: true,
      [`${styles.InputHasError}`]: displayError,
      [`${styles.InputIsDisabled}`]: disabled,
    });
    const safeVal = value === null ? '' : value;

    return (
        <div className={ inputClass }>
          { required && <span className={ asteriskClass }>*</span> }
          <input
            type={ type }
            className={ inputFieldClass }
            placeholder={ placeholder }
            onChange={ onChange }
            value={ safeVal }
            disabled={ disabled }
            { ...input }
            { ...other }
          />
        </div>
    );
  }

  Input.propTypes = propTypes;

  return Input;
};

export const Input = inputFactory(InputStyles);
export const PromoInput = inputFactory(PromoInputStyles);
export const ModalInput = inputFactory(ModalInputStyles);

export default Input;
