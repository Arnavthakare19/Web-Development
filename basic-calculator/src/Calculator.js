import React, { Component } from 'react';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    };
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      });
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit
      });
    }
  }

  inputDot() {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      });
    }
  }

  clearDisplay() {
    this.setState({
      displayValue: '0'
    });
  }

  toggleSign() {
    const { displayValue } = this.state;

    this.setState({
      displayValue:
        displayValue.charAt(0) === '-'
          ? displayValue.substr(1)
          : '-' + displayValue
    });
  }

  inputPercent() {
    const { displayValue } = this.state;
    const value = parseFloat(displayValue);

    this.setState({
      displayValue: String(value / 100)
    });
  }

  performOperation(nextOperator) {
    const { value, displayValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      this.setState({
        value: inputValue
      });
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = this.doOperation(currentValue, inputValue, operator);

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  }

  doOperation(leftOperand, rightOperand, operator) {
    switch (operator) {
      case '+':
        return leftOperand + rightOperand;
      case '-':
        return leftOperand - rightOperand;
      case '*':
        return leftOperand * rightOperand;
      case '/':
        return leftOperand / rightOperand;
      default:
        return rightOperand;
    }
  }

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="buttons">
          <button className="button" onClick={() => this.clearDisplay()}>
            AC
          </button>
          <button className="button" onClick={() => this.toggleSign()}>
            ±
          </button>
          <button className="button" onClick={() => this.inputPercent()}>
            %
          </button>
          <button
            className="button operator"
            onClick={() => this.performOperation('/')}
          >
            ÷
          </button>
          <button className="button" onClick={() => this.inputDigit(7)}>
            7
          </button>
          <button className="button" onClick={() => this.inputDigit(8)}>
        8
      </button>
      <button className="button" onClick={() => this.inputDigit(9)}>
        9
      </button>
      <button
        className="button operator"
        onClick={() => this.performOperation('*')}
      >
        ×
      </button>
      <button className="button" onClick={() => this.inputDigit(4)}>
        4
      </button>
      <button className="button" onClick={() => this.inputDigit(5)}>
        5
      </button>
      <button className="button" onClick={() => this.inputDigit(6)}>
        6
      </button>
      <button
        className="button operator"
        onClick={() => this.performOperation('-')}
      >
        -
      </button>
      <button className="button" onClick={() => this.inputDigit(1)}>
        1
      </button>
      <button className="button" onClick={() => this.inputDigit(2)}>
        2
      </button>
      <button className="button" onClick={() => this.inputDigit(3)}>
        3
      </button>
      <button
        className="button operator"
        onClick={() => this.performOperation('+')}
      >
        +
      </button>
      <button
        className="button"
        onClick={() => this.inputDigit(0)}
        style={{ width: '50%' }}
      >
        0
      </button>
      <button className="button" onClick={() => this.inputDot()}>
        .
      </button>
      <button
        className="button operator"
        onClick={() => this.performOperation('=')}
      >
        =
      </button>
    </div>
  </div>
);
}
}

export default Calculator;