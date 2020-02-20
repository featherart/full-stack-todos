import React, { useState, useEffect } from 'react';
import { Item } from '../Item';
import { FETCH_ITEMS } from '../api';
import { AddItemForm } from '../AddItemForm';
import './list-items.css';

const priorities = [
  { value: 1, label: 'high' },
  { value: 2, label: 'medium' },
  { value: 3, label: 'low' }
];

export const ListItems = () => {
  const [ items, setItems ] = useState([]);
  const [ description, setDescription ] = useState('');
  const [ priority, setPriority ] = useState(3);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(FETCH_ITEMS);
      const json = await res.json();
      setItems(json.data);
    };
    fetchItems();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      item: { description, priority, is_complete: false }
    };

    fetch(FETCH_ITEMS, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        setDescription('');
        return setItems([ ...items, json.data ]);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="list-items-container">
      <div className="title">Todos</div>
      <div className="form">
        <AddItemForm
          setPriority={setPriority}
          priorities={priorities}
          setDescription={setDescription}
          description={description}
          handleSubmit={handleSubmit}
        />
      </div>
      {items &&
        items.map((item, i) => {
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
