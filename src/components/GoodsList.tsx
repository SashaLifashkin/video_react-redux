import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as goodsActions } from '../features/goods';
import { fetchGoods } from '../services/api';
import { Loader } from './Loader';

export const GoodsList = () => {
  const [newGood, setNewGood] = useState('');
  const dispatch = useAppDispatch();
  const { goods, loading, error } = useAppSelector(state => state.goods);

  const addGood = (goodToAdd: string) => dispatch(goodsActions.add(goodToAdd));
  const removeGood = (goodToRemove: string) => dispatch(goodsActions.take(goodToRemove));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newGood) {
      return;
    }

    addGood(newGood);
    setNewGood('');
  };

  useEffect(() => {
    dispatch(goodsActions.setLoading(true));

    fetchGoods()
      .then(goodsFromServer => {
        dispatch(goodsActions.set(goodsFromServer));
      })
      .catch(() => {
        dispatch(goodsActions.setError('Something went wrong'));
      })
      .finally(() => {
        dispatch(goodsActions.setLoading(false));
      })
  }, []);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className="goods">
      <h2>Goods:</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newGood}
          onChange={e => setNewGood(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul>
        {goods.map(good => (
          <li key={good}>
            <button
              onClick={() => removeGood(good)}
              className="delete"
            />

            {good}
          </li>
        ))}
      </ul>
    </section>
  );
};
