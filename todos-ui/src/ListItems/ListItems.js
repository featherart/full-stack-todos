import React, {useState, useEffect } from 'react';
import { Item } from '../Item';
import { Plus } from 'react-feather';
import './list-items.css';

const priorities = [
  { value: 1, label: 'high' },
  { value: 2, label: 'medium' },
  { value: 3, label: 'low' }
];

const items = [
  {
    description: 'build electron app',
    priority: 1,
    is_complete: false
  },
  {
    description: 'do a funky dance',
    priority: 2,
    is_complete: false
  },
  {
    description: 'learn elixir',
    priority: 1,
    is_complete: false
  },
  {
    description: 'take out compost',
    priority: 3,
    is_complete: false
  }
];

const sortedItems = items.sort((a, b) => a.priority - b.priority);

export const ListItems = () => {
  const [items, setItems] = useState([])
  const url = 'http://localhost:4000/api/items';
  const options = { type: 'GET'};

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(url, options);
      const json = await res.json();
      setItems(json);
    }
    fetchItems();
  }, []);

  console.log('items', items)
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
      {sortedItems.map((item, i) => {
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
