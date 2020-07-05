import React, { useState, ChangeEvent } from 'react';
import { MIN_COUNT, MAX_COUNT } from '../config';

interface IProps {
  onSetup: (count?: number) => void;
}

export const Setup = ({ onSetup }: IProps) => {
  const [count, setCount] = useState<number | undefined>(undefined);

  const onSetCount = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setCount(undefined);
      return;
    }

    const round = Math.round(+event.target.value);
    const newValue = round < MIN_COUNT ? MIN_COUNT : round > MAX_COUNT ? MAX_COUNT : round;
    setCount(newValue);
  };

  return <div className='setup-container'>
    <h1 className='setup-title'>Настройка приложения</h1>
    <p className='setup-description'>Введите произвольное число от {MIN_COUNT} до {MAX_COUNT} для генерации случайных прямоугольников.
      Оставьте поле пустым, чтобы сгенерировать случайное количество.</p>
    <label className='setup-label'>Количество прямоугольников:</label>
    <input className='setup-input' type='number' min={MIN_COUNT} max={MAX_COUNT} value={count} onChange={onSetCount} />
    <p><button className='primary-button' onClick={() => onSetup(count)}>Создать</button></p>
  </div>;
};
