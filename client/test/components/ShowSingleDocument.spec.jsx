import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ShowSingleDocument from './../../src/components/ShowSingleDocument';

describe('ShowSingleDocument Component', () => {
  const props = {
    document: {
      title: 'title',
      ownerID: 1,
      createdAt: '2/3/2017'
    },
    updateDocument: sinon.spy(),
    status: {
      user: {
        id: 1,
      }
    }
  };
  const setup = () => shallow(<ShowSingleDocument {...props} />);
  it('should render the ShowSingleDocument component', () => {
    const wrapper = setup();
    const updateButton = wrapper.find('.modal-action');
    expect(wrapper.find('div').length).to.equal(4);
    expect(wrapper.find('.modal-content').text()).to.equal('title');
    // expect(typeof wrapper.find('.card-btn-delete').node.props.onClick)
    // .to.equal('function');
    // expect(wrapper.find('.card-name').text()).to.equal('Optimus Prime');
    updateButton.simulate('click');
    expect(props.updateDocument.called).to.equal(true);
  });
});
