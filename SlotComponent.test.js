import React from 'react';
import 'testUtils/windowSetup.js';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import SlotComponent from './SlotComponent.js';
import TestUtils from 'react-addons-test-utils';

import Input from 'components/Input/Input.js';
import PrimaryButton from 'components/Button/Button.js';

expect.extend(expectJSX);
suite('SlotComponent', () => {
  class MockSlotComp extends SlotComponent {
    constructor(props) {
      super(props);

      this.defineSlots({
        Label: <label>Default Label</label>,
        Input: <Input placeholder='Default Placeholder' />,
        Button: <PrimaryButton text='Default Button' />,
      });
    }

    render() {
      return (
        <div>
          { this.useSlot('Label') }
          { this.useSlot('Input') }
          { this.useSlot('Button') }
        </div>
      );
    }
  }

  test('SlotComponent uses default components', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <MockSlotComp />
    );

    const renderResult = renderer.getRenderOutput();

    expect(renderResult).toEqualJSX(
      <div>
        <label>Default Label</label>
        <Input placeholder='Default Placeholder' />
        <PrimaryButton text='Default Button' />
      </div>
    );
  });

  test('SlotComponent overrides default components', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <MockSlotComp>
        <label slot='Label'>Slot Override Label</label>
        <Input slot='Input' placeholder='Slot Override Placeholder' />
        <PrimaryButton slot='Button' text='Slot Override Button' />
      </MockSlotComp>
    );

    const renderResult = renderer.getRenderOutput();

    expect(renderResult).toEqualJSX(
      <div>
        <label slot='Label'>Slot Override Label</label>
        <Input slot='Input' placeholder='Slot Override Placeholder' />
        <PrimaryButton slot='Button' text='Slot Override Button' />
      </div>
    );
  });

  test('SlotComponent throws error if child does not have a slot prop', () => {
    const renderer = TestUtils.createRenderer();

    const renderFunc = () => {
      renderer.render(
        <MockSlotComp>
          <label>Slot Override Label</label>
          <Input slot='Input' placeholder='Slot Override Placeholder' />
          <PrimaryButton slot='Button' text='Slot Override Button' />
        </MockSlotComp>
      );
    };
    expect(renderFunc).toThrow(/Supplied a child without a slot./);
  });

  test('SlotComponent throws error if child has a slot prop value for a slot that has not been defined', () => {
    const renderer = TestUtils.createRenderer();

    const renderFunc = () => {
      renderer.render(
        <MockSlotComp>
          <label slot='UndefinedSlotName'>Slot Override Label</label>
          <Input slot='Input' placeholder='Slot Override Placeholder' />
          <PrimaryButton slot='Button' text='Slot Override Button' />
        </MockSlotComp>
      );
    };
    expect(renderFunc).toThrow(/no slot of that type has been defined/);
  });

  test('SlotComponent throws error if child has a valid slot prop but the component type does not match defined slot', () => {
    const renderer = TestUtils.createRenderer();

    const renderFunc = () => {
      renderer.render(
        <MockSlotComp>
          <h1 slot='Label'>Slot Override Label</h1>
          <Input slot='Input' placeholder='Slot Override Placeholder' />
          <PrimaryButton slot='Button' text='Slot Override Button' />
        </MockSlotComp>
      );
    };
    expect(renderFunc).toThrow(/Child component does not correspond to the slot component type./);
  });
});
