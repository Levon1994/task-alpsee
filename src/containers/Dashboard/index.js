import React from 'react';
import _ from 'lodash';
import * as mathjs from 'mathjs';
import Datasheet from 'components';

import './style.scss';

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i).toUpperCase());
    }
    return a;
}

const generateState = () => {
  const numbersArr = [1,2,3,4,5,6,7,8,9];
  const lettersArr = genCharArray('a', 'z');

  const state = {};

  lettersArr.forEach((item) => {
    numbersArr.forEach((number) => {
      state[`${item}${number}`] = {
        key: `${item}${number}`,
        value: '',
        expr: '',
      }
    })
  })

  return state;
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.onCellsChanged = this.onCellsChanged.bind(this);
    this.state = generateState();
  }


  generateGrid() {
    return [0,1,2,3,4,5,6,7,8,9].map((row, i) =>
      ['', ...genCharArray('a', 'z')].map((col, j) => {
        if(i == 0 && j == 0) {
          return {readOnly: true, value: ''}
        }
        if(row === 0) {
          return {readOnly: true, value: col}
        }
        if(j === 0) {
          return {readOnly: true, value: row}
        }
        return this.state[col + row]
      })
    )
  }

  validateExp(trailKeys, expr) {
    let valid = true;
    const matches = expr.match(/[A-Z][1-9]+/g) || [];
    matches.map(match => {
      if(trailKeys.indexOf(match) > -1) {
        valid = false
      } else {
        valid = this.validateExp([...trailKeys, match], this.state[match].expr)
      }
    })
    return valid
  }

  computeExpr(key, expr, scope) {
    let value = null;
    if(expr.charAt(0) !== '=') {
      return {className: '', value: expr, expr: expr};
    } else {
      try {
        value = mathjs.evaluate(expr.substring(1), scope)
      } catch(e) {
        value = null
      }

      if(value !== null && this.validateExp([key], expr)) {
        return {className: 'equation', value, expr}
      } else {
        return {className: 'error', value: 'error', expr: ''}
      }
    }
  }

  cellUpdate(state, changeCell, expr) {
    const scope = _.mapValues(state, (val) => isNaN(val.value) ? 0 : parseFloat(val.value))
    const updatedCell = _.assign({}, changeCell, this.computeExpr(changeCell.key, expr, scope))
    state[changeCell.key] = updatedCell

    _.each(state, (cell, key) => {
      if(cell.expr.charAt(0) === '=' && cell.expr.indexOf(changeCell.key) > -1 && key !== changeCell.key) {
        state = this.cellUpdate(state, cell, cell.expr)
      }
    })
    return state
  }

  onCellsChanged(changes) {
    const state = _.assign({}, this.state)
    changes.forEach(({cell, value}) => {
      this.cellUpdate(state, cell, value)
    })
    this.setState(state)
  }

  render() {

    return (
      <div className="Dashboard">
        <Datasheet
          data={this.generateGrid()}
          valueRenderer={(cell) => cell.value}
          dataRenderer={(cell) => cell.expr}
          onCellsChanged={this.onCellsChanged}
        />
      </div>
    )
  }

}
