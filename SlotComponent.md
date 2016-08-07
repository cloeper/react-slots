# SlotComponent
## What is a Slot?
Basically, a slotted component is one where you can swap some of it's children
out for another component of the same type.

Technically, A slot is an element/component that can be overridden declaratively
in the parent code. A slot has a default component that will be rendered if not
overridden by the parent.

## What is SlotComponent?
SlotComponent extends a React component. It is a totally valid, standard React
component. It provides three functions that make up slot functionality:

* `defineSlot(<object>)`: Used to define slots in your component
* `useSlot(<string>)`: Returns the components associated with your define slots
* `hasSlot(<string>)`: Returns true or false if the component has a slot of a
given name

## How does it work?
To enhance your component with slot functionality, you must extend the
SlotComponent class. The two functions you'll use at a minimum are `defineSlots`
and `useSlot`.

`defineSlots` takes an object where the key is the name of slot, and the value
is a React component.

```
class MySlottedComponent extends SlotComponent {
  constructor(props) {
    super(props);

    this.defineSlots({
        'Label': <label>Default Label</label>,
        'Input': <Input placeholder='Default Placeholder' />,
        'Button': <PrimaryButton text='Default Button' />
    });
  }
}
```

Define slots iterates all children passed into the component and replaces any
default components with the children that match both the slot name and
component type. If none match, an error is throw. If no children are passed,
then it will render the default component you declared in `defineSlots`.

`useSlot` is in charge of looking up the slot by name and returning the
component.

```
...
  render() {
    return (
      <div>
        { this.useSlot('Label') }
        { this.useSlot('Input') }
        { this.useSlot('Button') }
      </div>
    );
  }
...
```

As you can see, you can use the slot anywhere in the component you'd like.

## Why would I use it?
There are a number of benefits to using slots, but the main benefit that should
be considered throughly is configuration vs. declaration.

Configuration entails passing `n` number of props to a component and that
component applying whatever logic it needs to based on those props. Components
sometimes can get out of hand quickly in those scenarios, and it can become
difficult to figure out what the right level of abstraction. As a developer, you
should always be looking to strike the right balance, and slots are another tool
to help with that.

Things we want to avoid in general are excessive prop passing to one or more
components. Slots give us a way to cut down on the configuration while making
the component very open to modifications.

## When should I use it?
You could use a slotted component implementation for any of the following:
* Highly variable, high reuse components
* Very large components that have a few slight or significant variations
* Components that have multiple styles or need the ability to easily override
styles

Always use your best judgement when determining to use slots and when not to.

## How do I use it?
Example: You have a component, CoolComp, that has a label and an SvgIcon as
children.

```
class CoolComp extends React.Component {
  render() {
    const { label } = this.props;
    return (
      <div>
        <label className={ styles.labelStyle }>{ label }</label>
        <SvgIcon icon='search' />
      </div>
    )
  }
}
```

Any modifications to how CoolComp is rendered must be made via props as things
stand. Let's say CoolComp is a component that will see high reuse and may have
30 different variations, including text, styles, and which icon to use. The
two options you have are to make everything configurable via props, or use
slots.

We're going to decide to turn CoolComp into a slotted component. It's pretty
easy. All we need to do is `defineSlots` and `useSlots`.

Define slots ALWAYS goes in the constructor method of your component. If your
component does not have a constructor method, create one.

```
import SlotComponent from 'domains/core/classes/SlotComponent/SlotComponent.js';

class CoolComp extends SlotComponent {
  constructor(props) {
    super(props);

    this.defineSlots({
      'Label': <label className={ styles.labelStyle }>{ label }</label>,
      'Icon': <SvgIcon icon='search' />,
    });
  }
  render() {
    const { label } = this.props;
    return (
      <div>
        { this.useSlot('Label') }
        { this.useSlot('Icon') }
      </div>
    )
  }
}
```

That's it! You now have a slotted component. So now what? Well now you can do
all sorts of cool stuff! Let's take a look at what the parent component might do
when implementing CoolComp.

```
class MyParentComp extends React.Component {
  render() {
    return (
      <CoolComp>
        <label slot='Label'>Label Text from Parent!</label>
        <SvgIcon slot='Icon' style={ styles.myParentCompIconStyle } icon='slug' />
      </CoolComp>
    );
  }
}
```

OMG such easy. Now you can essentially 'reach into the guts' of a component and
modify what you need to in any way you need to.

NOTE: You don't have to use _every_ slot defined. You can use only the ones
you want to override.

## IMPORTANT NOTE
If you extend this class and also have a custom `componentWillUpdate` method
in your new component, slot updating will STOP WORKING.

You MUST call `super()` inside of `componentWillUpdate` to ensure that slot
updating will continue to work correctly.
