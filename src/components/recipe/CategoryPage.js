import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';
import Gallery from '../common/Gallery';


export class CategoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: this.props.match.params.category,
      recipes: this.props.recipes
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextCategory = nextProps.match.params.category;
    this.setState({ category: nextCategory.slice()}, () => {
      const recipes = store.getState().recipes;
      let newRecipes = recipes.filter(recipe => {
        return recipe.category.toLowerCase() == this.state.category;
      });
      this.setState({ recipes: newRecipes });
    });
  }

  render() {
    const props = this.props;
    const category = this.state.category;

    if ( this.props.isLoading ) {
         return (<div>Loading...</div>);
    }
    return (<Gallery recipes={this.state.recipes} category={category} />);
  }
}

CategoryPage.propTypes = {
  recipes: PropTypes.array,
  isLoading: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  const category = ownProps.match.params.category;
  const getCategorizedRecipes = (category) => {
    return state.recipes.filter(recipe => {
      return recipe.category.toLowerCase() == category;
    });
  };
  const recipes = getCategorizedRecipes(category);
  return {
    isLoading: state.isLoading,
    recipes: recipes
  };
};

export default connect(mapStateToProps)(CategoryPage);
