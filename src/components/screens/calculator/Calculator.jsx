import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ScreenWrapper from '../../common/ScreenWrapper';
import { ActionButton, ActionsWrapper, ActionValue, OutputHistory, OutputTotal, OutputWrapper } from './Calculator.styles';

const buttons = [
  { type: 'action', value: 'AC', clsTxt: 'orange-color' },
  { type: 'action', value: '+/-' },
  { type: 'action', value: '%' },
  { type: 'action', value: '÷', clsBtn: 'circle-button', clsTxt: 'orange-color' },

  { type: 'number', value: '7' },
  { type: 'number', value: '8' },
  { type: 'number', value: '9' },
  { type: 'action', value: 'x', clsBtn: 'circle-button', clsTxt: 'orange-color' },

  { type: 'number', value: '4' },
  { type: 'number', value: '5' },
  { type: 'number', value: '6' },
  { type: 'action', value: '-', clsBtn: 'circle-button', clsTxt: 'orange-color' },

  { type: 'number', value: '1' },
  { type: 'number', value: '2' },
  { type: 'number', value: '3' },
  { type: 'action', value: '+', clsBtn: 'circle-button', clsTxt: 'orange-color' },

  { type: 'number', value: '0' },
  { type: 'number', value: '.' },
  { type: 'action', value: '=', clsBtn: 'double-circle-button', clsTxt: 'orange-color' },
];

function CalculatorScreen() {
  const theme = useSelector((state) => state.settings.theme);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState('');
  const [action, setAction] = useState('+');
  const [prevNumber, setPrevNumber] = useState('');

  const handleActionClick = useCallback((actionValue) => {
    const numberValue = +prevNumber;

    if (actionValue === 'AC') {
      setTotal(0);
      setHistory('');
      setAction('');
      setPrevNumber('');
      return '';
    }
    if (history.length < 1) {
      return '';
    }

    if (actionValue === '+/-' || actionValue === '%') {
      switch (actionValue) {
        case '%':
          const percentResult = numberValue / 100;
          setHistory((prev) => `${prev.trim().replace(new RegExp(`${numberValue}$`), '')}${percentResult} `);
          setPrevNumber(percentResult);
          break;
        case '+/-':
          const signChangeResult = -numberValue;
          setHistory((prev) => `${prev.trim().replace(new RegExp(`${numberValue}$`), '')}${signChangeResult} `);
          setPrevNumber(signChangeResult);
          break;
        default:
          console.log('Error: unexpected action - ', action);
      }
    } else {
      setHistory((prev) => (actionValue === '=' ? prev : `${prev} ${actionValue} `));
      setTotal((prevTotal) => {
        switch (action) {
          case '+':
            return prevTotal + numberValue;
          case '-':
            return prevTotal - numberValue;
          case '÷':
            return prevTotal / numberValue;
          case 'x':
            return prevTotal * numberValue;
          case '%':
            return prevTotal / 100;
          case 'AC':
            return 0;
          default:
            return prevTotal + numberValue;
        }
      });
      setPrevNumber('');
    }

    return setAction(actionValue);
  }, [total, action, prevNumber, history]);

  const handleNumberClick = useCallback((numberValue) => {
    setPrevNumber((prev) => prev + numberValue);
    return setHistory((prev) => prev + numberValue);
  }, [action]);

  return (
    <ScreenWrapper>
      <OutputWrapper>
        <OutputTotal>
          {total}
        </OutputTotal>
        <OutputHistory>
          {history}
        </OutputHistory>
      </OutputWrapper>

      <ActionsWrapper>

        {buttons.map(({ type, value, clsBtn = '', clsTxt = '' }) => ( //TODO FlatList
          <ActionButton
            key={value + theme}
            cls={clsBtn}
            theme={theme}
            onPress={() => (type === 'action' ? handleActionClick(value) : handleNumberClick(value))}
          >
            <ActionValue cls={clsTxt}>
              {value}
            </ActionValue>
          </ActionButton>
        ))}
      </ActionsWrapper>
    </ScreenWrapper>
  );
}

export default CalculatorScreen;
