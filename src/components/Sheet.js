import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Sheet extends PureComponent {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

Sheet.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
};

export default Sheet;
