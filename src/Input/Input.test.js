import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import styles from './Input.css';

import Input from './Input.js';

suite('Input', () => {
  test('renders with placholder text', () => {
    const renderer = TestUtils.createRenderer();
    const onChange = () => {};
    renderer.render(
      <Input placeholder='Placeholder Text' onChange={ onChange } />
    );

    const renderedInput = renderer.getRenderOutput();

    expect(renderedInput).toEqualJSX(
      <div>
        <div className={ styles.Input }>
          <input
            onChange={ onChange }
            placeholder='Placeholder Text'
            className={ styles.InputField }
            type='text'
            value=''
            disabled={ undefined }
          />
        </div>
      </div>
    );
  });
});
