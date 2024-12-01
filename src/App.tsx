import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

interface SortParams {
  sortField: string;
  isReverse: boolean;
}

const getPreparedGoods = (goods: string[], sorter: SortParams) => {
  const { sortField, isReverse } = sorter;
  const prepGoods = [...goods];

  if (sortField === SortType.Alphabet) {
    prepGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SortType.Length) {
    prepGoods.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    prepGoods.reverse();
  }

  return prepGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  const handleReset = () => {
    setIsReverse(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light" ${sortField === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning
            ${isReverse === true ? '' : 'is-light'}`}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
