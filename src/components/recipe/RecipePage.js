import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipeData } from '../../actions/recipeActions';
import recipesApi from '../../api/mockRecipesApi';
import Recipe from './Recipe';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe
    };
  }

  componentDidMount() {
      this.props.fetchData(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipe.id != nextProps.recipe.id) {
        this.setState({ recipe: Object.assign({}, nextProps.recipe) });
    }
  }

  render() {
    let recipe = this.state.recipe;
    if (!Object.keys(recipe).length) {
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

  return {
    id,
    category,
    recipe: state.currentRecipe
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (id) => dispatch(fetchRecipeData(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
