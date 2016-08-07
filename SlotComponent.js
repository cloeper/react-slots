
import React from 'react';
export default class SlotComponent extends React.Component {
  /**
   * componentWillUpdate
   *
   *	@param  {object} nextProps
   *
   *  Here, we use a React lifecycle method to ensure that slots are processed
   *  when a component is updated.
   *
   *  !!!!!!! IMPORTANT NOTE !!!!!!!
   *
   *  If a component that extends this class has a componentWillUpdate method,
   *  it will OVERRIDE this function and break slot updating.
   *
   *  BE SURE to call super() in the componentWillUpdate method of the component
   *  that extends this class.
   */
  componentWillUpdate(nextProps) {
    this.processSlots(nextProps);
  }

  /**
   * defineSlots
   *
   * 	@param  {object} slotsObject
   *
   * 	Takes an object whose key is the name of the slot and whose value is
   * 	a react component.
   */
  defineSlots(slotsObject) {
    this.slots = slotsObject;
    this.processSlots();
  }

  /**
   * defineSlots
   *
   *	@param  {object} props = this.props
   *
   * 	Iterates through all children and matches them to defined slots. If
   * 	a child matches a slot, the child is used instead of the default slot comp.
   */
  processSlots(props = this.props) {
    React.Children.map(props.children, (child) => {
      const hasSlotProp = child.props.hasOwnProperty('slot');
      const slotIsDefined = this.slots.hasOwnProperty(child.props.slot);

      // Child doesn't have a slot prop, throw an error.
      if (!hasSlotProp) {
        const compName = getComponentType(child);
        throw new Error('Supplied a child without a slot. ' +
                        `${compName} does not have a slot property.`);
      }

      // Child has a slot prop but it isn't defined as a slot key, throw error.
      if (!slotIsDefined) {
        throw new Error('You passed in a child component with a slot property of ' +
                        `${child.props.slot} but no slot of that type has been defined.`);
      }

      if (hasSlotProp && slotIsDefined) {
        // Iterate through childre
        Object.keys(this.slots).forEach((key) => {
          const slot = this.slots[key];
          const slotFound = child.props.slot === key;
          const slotMatches = slotAndChildMatch(slot, child);

          /* If we found a slot (the child has a slot prop) and it's value
           * matches a slot name (a key from the slotsObject) then we replace
           * the default component with the child component.
           */
          if (slotFound && slotMatches) {
            this.slots[key] = child;
          }

          // We found a slot, but it doesn't match. Throw and error.
          if (slotFound && !slotMatches) {
            const slotName = getComponentType(slot);
            const childName = getComponentType(child);

            throw new Error('Child component does not correspond to the slot ' +
                            `component type. You passed in ${childName} ` +
                            `but the slot type is ${slotName}`);
          }
        });
      }
    });
  }

  /**
   * hasSlot
   *
   * @param  {string}  slotName
   * @return {Boolean}
   *
   * Returns true or false based on slotName param
   */
  hasSlot(slotName) {
    return this.slots.hasOwnProperty(slotName);
  }

  /**
   * useSlot
   *
   * 	Returns a ReactComponent if the slotName param matches a defined slot.
   *
   * @param  {string} slotName
   * @return {ReactComponent}
   */
  useSlot(slotName) {
    if (!this.slots.hasOwnProperty(slotName)) {
      throw new Error(`The slot '${slotName}' does not exist.`);
    } else {
      return this.slots[slotName];
    }
  }
}

function slotAndChildMatch(slot, child) {
  /**
   * In some components, we make sure a prop exists before rendering out a
   * component. We do this via: prop && <comp />. In the instances where
   * we're using a slot to override a conditional component, the prop used
   * to determine wether or not to display that component does not exist.
   * So when we override a component via slots, the default slot component
   * will not exist. In those cases, we want to display the child component
   * that's meant for a particular slot. In order to do that, we return true
   * here.
   *
   * GOTCHA: You can override any conditional component with any other type
   * of component as a result. You should NOT, but there's no way to determine
   * the type of a conditional component since it will sometimes be null by
   * necessity.
   */
  if (child && !slot) return true;

  const slotType = getComponentType(slot);
  const childType = getComponentType(child);

  return slotType === childType;
}

function getComponentType(component) {
  // For conditional components
  if (!component) {
    return null;
  }

  // For standard HTML element
  if (typeof component.type === 'string') {
    return component.type;
  }

  // For React classes
  if (component.type.hasOwnProperty('displayName')) {
    return component.type.displayName;
  }

  // For stateless functional components
  if (typeof component.type === 'function') {
    return component.type.name;
  }

  return null;
}
