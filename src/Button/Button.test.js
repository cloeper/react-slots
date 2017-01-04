import 'testUtils/windowSetup.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import styles from './PrimaryButton.css';

import PrimaryButton from './Button.js';

suite('Button', () => {
  test('renders with text', () => {
    const renderer = TestUtils.createRenderer();

    renderer.render(
      <PrimaryButton text='Button Text' />
    );

    const renderedButton = renderer.getRenderOutput();

    expect(renderedButton).toEqualJSX(
      <button className={ styles.Button }>
        <label className={ styles.Text }>
          Button Text
        </label>
      </button>
    );
  });
});
