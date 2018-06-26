import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder ingredients={null} initIngredients={() => {}}/>);
  });

  it('should render <Spinner /> if no ingredients received', () => {
    expect(wrapper.contains(<Spinner />)).toEqual(true);
  });

  it('should render one <BuildControls /> if ingredients received', () => {
    wrapper.setProps({ingredients: {salad: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});