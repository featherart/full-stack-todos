import React, { useState, useEffect } from 'react';
import { Item } from '../Item';
import { Plus } from 'react-feather';
import { FETCH_ITEMS } from '../api';
import './list-items.css';

const priorities = [
  { value: 1, label: 'high' },
  { value: 2, label: 'medium' },
  { value: 3, label: 'low' }
];

export const ListItems = () => {
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(FETCH_ITEMS);
      const json = await res.json();
      setItems(json.data);
    };
    fetchItems();
  }, []);

  return (
    <div className="list-items-container">
      <div className="title">Todos</div>
      <div className="form">
        <form>
          <input type="text" placeholder="description" />
          <select name="priority">
            {priorities.map((priority, j) => {
              return (
                <option key={j} value={priority.value}>
                  {priority.label}
                </option>
              );
            })}
          </select>
          <button className="submit-button" type="submit">
            <Plus className="plus-icon" />
          </button>
        </form>
      </div>
      {items && items.map((item, i) => {
        let priority = priorities.find(priority => {
          if (priority.value === item.priority)
            return priority.label;
        });
        return (
          <Item
            key={i}
            description={item.description}
            priority={priority.label}
            complete={item.is_complete}
          />
        );
      })}
    </div>
  );
};
