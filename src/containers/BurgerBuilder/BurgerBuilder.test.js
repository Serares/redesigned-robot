import React from 'react';


import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import navigation item ca sa caut in navigationItemS daca se afla acolo cu functia find() pe care o are enzyme 
// functia expect este din partea lui jest
configure({adapter:new Adapter() })

describe('<BurgerBuilder />', ()=>{
   let wrapper;
   beforeEach(()=>{
    wrapper = shallow(<BurgerBuilder initIngredients={()=>{}} />);
   }) 

   it('should render <BuildControls /> when receiving ingredients', ()=>{
       wrapper.setProps({ingr:{salad:0}});
       expect(wrapper.find(BuildControls)).toHaveLength(1);
   })

})