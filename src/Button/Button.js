import React, { PropTypes } from 'react';
import PrimaryButtonStyles from './PrimaryButton.css';
import SecondaryButtonStyles from './SecondaryButton.css';
import BackButtonStyles from './BackButton.css';
import ForwardButtonStyles from './ForwardButton.css';
import TertiaryButtonStyles from './TertiaryButton.css';
import ModalPrimaryStyles from './ModalPrimaryButton.css';
import RedButtonStyles from './RedButton.css';
const buttonFactory = (styles) => {
  const propTypes = {
    text: PropTypes.string.isRequired,
  };

  function Button(props) {
    const { text, ...other } = props;

    return (
      <button className={ styles.Button } { ...other }>
        <label className={ styles.Text }>{ text }</label>
      </button>
    );
  }

  Button.propTypes = propTypes;

  return Button;
};

export const PrimaryButton = buttonFactory(PrimaryButtonStyles);
export const SecondaryButton = buttonFactory(SecondaryButtonStyles);
export const BackButton = buttonFactory(BackButtonStyles);
export const ForwardButton = buttonFactory(ForwardButtonStyles);
export const TertiaryButton = buttonFactory(TertiaryButtonStyles);
export const ModalPrimaryButton = buttonFactory(ModalPrimaryStyles);
export const RedButton = buttonFactory(RedButtonStyles);

export default PrimaryButton;
