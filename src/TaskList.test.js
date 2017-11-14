import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TaskList from './TaskList';
import Task from './Task';

describe('<TaskList />', () => {

    Enzyme.configure({ adapter: new Adapter()});

    it('should render two Task components', () => {
        const wrapper = shallow(<TaskList />);
        expect(wrapper.find(Task)).to.have.length(1);
    });
});