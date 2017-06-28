import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipeData } from '../../actions/recipeActions';
import recipesApi from '../../api/mockRecipesApi';
import Recipe from './Recipe';

export class RecipePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe
    };
  }

  componentDidMount() {
    if (typeof(this.state.recipe) == 'undefined') {
      this.props.fetchData(this.props.category, this.props.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const recipe = this.props.recipe;
    if ((typeof(recipe) == 'undefined') || recipe.id != nextProps.recipe.id) {
      this.setState({ recipe: Object.assign({}, nextProps.recipe) });
    }
  }

  render() {
    let recipe = this.state.recipe;
    if (!recipe) {
      return (<div>Loading...</div>);
    }
    return (<Recipe recipe={recipe} key={recipe.id}/>);
  }
}

RecipePage.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recipe: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const category = ownProps.match.params.category;
  const id = ownProps.match.params.id;
  const getCurrentRecipe = (id) => {
    return state.detailedRecipes.instructions.find(recipe => {
      return recipe.id == id;
    });
  };
  const currentRecipe = getCurrentRecipe(id);
  return {
    id,
    category,
    recipe: currentRecipe
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (category, id) => dispatch(fetchRecipeData(category, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
