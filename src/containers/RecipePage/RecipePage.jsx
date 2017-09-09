import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipeData } from '../../actions/recipeActions';
import recipesApi from '../../api/mockRecipesApi';
import Recipe from '../../components/Recipe';

export class RecipePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe,
    };
  }

  componentDidMount() {
    if (!Object.keys(this.state.recipe).length) {
      this.props.fetchData(this.props.category, this.props.id);
    }
  }

  componentWillReceiveProps({ recipe }) {
    const oldRecipe = this.props.recipe;
    if ((typeof oldRecipe === 'undefined') || oldRecipe.id !== recipe.id) {
      this.setState({ recipe });
    }
  }

  render() {
    const recipe = this.state.recipe;
    if (!recipe || !Object.keys(recipe).length) {
      return (<div>Loading...</div>);
    }
    return (<Recipe recipe={recipe} key={recipe.id} />);
  }
}

RecipePage.defaultProps = {
  recipe: {},
  fetchData: undefined,
};

RecipePage.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recipe: PropTypes.object,
  fetchData: PropTypes.func,
};

const recipeSelector = ({ instructions }, id) => (
  instructions.find(recipe => (recipe.id === id))
);

const mapStateToProps = ({ detailedRecipes }, { match }) => ({
  id: match.params.id,
  category: match.params.category,
  recipe: recipeSelector(detailedRecipes, match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (category, id) => dispatch(fetchRecipeData(category, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
