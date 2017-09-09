import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';
import Gallery from '../../components/Gallery';


export class CategoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: this.props.match.params.category,
      recipes: this.props.recipes,
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextCategory = nextProps.match.params.category;
    this.setState({ category: nextCategory.slice() }, () => {
      const recipes = store.getState().recipes;
      const newRecipes = recipes.filter(recipe => (
        recipe.category.toLowerCase() === this.state.category
      ));
      this.setState({ recipes: newRecipes });
    });
  }

  render() {
    const props = this.props;
    const category = this.state.category;
    if (props.isLoading) {
      return (<div>Loading...</div>);
    }
    return (<Gallery recipes={this.state.recipes} category={category} />);
  }
}

CategoryPage.defaultProps = {
  recipes: [],
  isLoading: false,
  match: {},
};

CategoryPage.propTypes = {
  recipes: PropTypes.array,
  isLoading: PropTypes.number, // eslint-disable-line
  match: PropTypes.object,
};

const recipesSelector = (recipes, category) => (
  recipes.filter(recipe => (
    recipe.category.toLowerCase() === category
)));

const mapStateToProps = ({ recipes, isLoading }, { match }) => ({
  recipes: recipesSelector(recipes, match.params.category),
  isLoading,
});

export default connect(mapStateToProps)(CategoryPage);
