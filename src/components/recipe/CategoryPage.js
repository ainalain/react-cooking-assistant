import React from 'react';
import PropTypes from 'prop-types';


class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const category = this.props.match.params.category;
    return (
      <div>
      This is {category} page
      </div>);
  }
}

CategoryPage.propTypes = {

};

export default CategoryPage;
