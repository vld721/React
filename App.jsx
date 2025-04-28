import React, { useState, useEffect } from 'react';

const Container = () => {
  const [name, setName] = useState('');
  const [prevName, setPrevName] = useState('');

  const generateRandomName = () => {
    const names = ['Анна', 'Иван', 'Мария', 'Алексей', 'Елена', 'Владимир', 'Ольга', 'Сергей', 'Вика', 'Андрей', 'Вероника'];
    return names[Math.floor(Math.random() * names.length)];
  };

  useEffect(() => {
    const initialName = generateRandomName();
    setName(initialName);
    setPrevName(initialName);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPrevName(name);
      const newName = generateRandomName();
      setName(newName);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [name]);

  return (
    <div>
      <Header />
      <Greeting name={name} prevName={prevName} />
      <Clock />
    </div>
  );
};

const Greeting = ({ name, prevName }) => {
  return (
    <div>
      {name === prevName 
        ? `Привет, ${name}!` 
        : `Привет, у тебя поменялось имя, теперь ты ${name}!`}
    </div>
  );
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();
  const minutes = time.getMinutes();

  return (
    <div>
      <div>Текущее время: {formattedTime}</div>
      <div>Дата: {formattedDate}</div>
      {minutes % 5 === 0 && <div>Время делится на 5</div>}
    </div>
  );
};

const Header = () => {
  return <h1>Это мой первый React. проект!</h1>;
};

export default Container;

