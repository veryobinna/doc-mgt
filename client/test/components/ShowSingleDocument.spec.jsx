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

  const wrapper = shallow(<ShowSingleDocument {...props} />);
  const updateButton = wrapper.find('.modal-action');
  it('should render the ShowSingleDocument component', () => {
    expect(wrapper.find('.show-document').exists()).to.equal(true);
    expect(wrapper.find('div').length).to.equal(4);
    expect(wrapper.find('.modal-content').text()).to.equal('title');
  });

  it('should call the update document function on update-button click', () => {
    updateButton.simulate('click');
    expect(props.updateDocument.called).to.equal(true);
  });
});
