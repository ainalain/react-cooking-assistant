import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/recipeActions';
import Gallery from '../common/Gallery';


export class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const category = this.props.match.params.category;

    if ( this.props.isLoading ) {
         return (<div>Loading...</div>);
    }

    return (<Gallery recipes={props.recipes} category={category} />);
  }
}

HomePage.propTypes = {
  recipes: PropTypes.array,
  isLoading: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.isLoading,
    recipes: state.recipes
  };
};

export default connect(mapStateToProps)(HomePage);
