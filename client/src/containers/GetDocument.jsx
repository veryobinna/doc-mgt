import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDocument } from '../actions/DocumentActions';
import ShowDocument from '../components/ShowDocument';

class GetDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [{}],
    };
  }

  componentWillMount() {
    this.props.getDocument();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprops',nextProps);
    if (this.props.documents.length !== nextProps.documents.length) {
      console.log(nextProps.documents);
      // const documents =
      this.setState({ documents: nextProps.documents });
      console.log(this.state);
    }
  }


  render() {
    const documents = this.state.documents.map((document) => {
      const items = {
        id: document.id,
        title: document.title,
        content: document.content,
        access: document.access,
      };
      return <ShowDocument key={items.id} {...items} />;
    });
    return (
      <div>
        <h1>Documents</h1>
        <div key={documents.id} className="row">
          {documents}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ getDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documents
});

export default connect(mapStateToProps, mapDispatchToProps)(GetDocument);
