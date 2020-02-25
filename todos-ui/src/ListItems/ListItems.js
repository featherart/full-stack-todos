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
  let [ priority, setPriority ] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(FETCH_ITEMS);
      const json = await res.json();
  
      const { data } = json;    
      setItems(
        [ ...data ].sort((a, b) => a.priority - b.priority)
      );
    };
    fetchItems();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!priority) priority = 1;
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
        return setItems([ json.data, ...items ].sort((a, b) => a.priority - b.priority));
      })
      .catch(error => console.error(error));
  };

  const handleDelete = id => {
    fetch(`${FETCH_ITEMS}/${id}`, { method: 'DELETE' })
      .then(res => {
        const newItems = items.filter(
          item => item.id !== id
        );
        setItems([ ...newItems ]);
      })
      .catch(error => console.error(error));
  };

  const toggleComplete = (id, complete) => {
    const data = { item: { is_complete: !complete } };
    fetch(`${FETCH_ITEMS}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        items.forEach((item, i) => {
          if (item.id === id) {
            item.is_complete = !complete
            setItems([ ...items ]);
          }
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="list-items-container">
      <div className="title">Todos</div>
      <div className="form">
        <AddItemForm
          description={description}
          handleSubmit={handleSubmit}
          priorities={priorities}
          setPriority={setPriority}
          setDescription={setDescription}
        />
      </div>
      {items &&
        items.map((item, i) => {
          let priority = priorities.find(priority => {
            if (priority.value === item.priority)
              return priority.label;
          });
          const { id, description, is_complete } = item;
          return (
            <Item
              complete={is_complete}
              description={description}
              handleDelete={handleDelete}
              id={id}
              key={i}
              priority={priority.label}
              toggleComplete={toggleComplete}
            />
          );
        })}
    </div>
  );
};
