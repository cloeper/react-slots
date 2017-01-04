import React, { PropTypes } from 'react';
import styles from './ButtonBar.css';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default function ButtonBar({ children }) {
  return (
    <div className={ styles.ButtonBar }>
      { children }
    </div>
  );
}

ButtonBar.propTypes = propTypes;
