import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { GetSingleDocument } from './../../src/containers/GetSingleDocument';


const props = {
  match: {
    params: {

    }
  },
  history: {
    replace: spy(() => new Promise((resolve) => { resolve(); })),
  },
  updateUser: () => {},
  getSingleDocument: () => {},
  status: {},
};

const updateDocumentSpy = spy(GetSingleDocument.prototype, 'updateDocument');
const wrapper = shallow(<GetSingleDocument {...props} />);

describe('Get Single Document Component', () => {
  it('should render the Get Single Document component', () => {
    expect(wrapper.find('ShowSingleDocument').exists()).to.equal(true);
    expect(wrapper.find('div').exists()).to.equal(true);
  });

  it('should route to update document when update document is called', () => {
    wrapper.instance().updateDocument();
    assert.calledOnce(updateDocumentSpy);
    expect(props.history.replace.called).to.equal(true);
  });
});
