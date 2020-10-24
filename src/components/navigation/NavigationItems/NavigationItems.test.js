import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// import navigation item ca sa caut in navigationItemS daca se afla acolo cu functia find() pe care o are enzyme 
// functia expect este din partea lui jest
configure({adapter:new Adapter() })

describe('<NavigationItems />', () => {
  let wrapper;  
  beforeEach(()=>{
    wrapper = shallow(<NavigationItems />);
    });

     it('should render two <NavigationItems /> if not authenticated', ()=>{
    //    aici iti retureneaza ce componenta vrei sa se afle in componenta din wrapper , poti sa testezi si de cate ori apare sau chiar sa nu apara
       expect(wrapper.find(NavigationItem)).toHaveLength(2);
     });

     it('should render three <NavigationItems /> if authenticated', ()=>{
      // ii se trimite prop doar asa se pune automat ca true
      // wrapper =shallow(<NavigationItems isAuthenticated />);
      wrapper.setProps({isAuthenticated:true});
      expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render three <NavigationItems /> if authenticated', ()=>{
      // ii se trimite prop doar asa se pune automat ca true
      // wrapper =shallow(<NavigationItems isAuthenticated />);
      wrapper.setProps({isAuthenticated:true});
      expect(wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)).toEqual(true);
    });

   }
);


