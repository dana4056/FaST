import React from 'react';
import { CardType } from '../types/CardType';
import { CardListProps } from '../types/ComponentPropsType';
import { ReactComponent as Spin } from '../assets/images/Spinner.svg';

import PhotoCard from './PhotoCard';

function CardList({
  isMine,
  cardsLeft,
  cardsRight,
  isLoaded,
  isLimit,
  setRef,
}: CardListProps) {
  return (
    <div className="card-list">
      <div className="card-list__column">
        {cardsLeft.map((card: CardType) => (
          <PhotoCard isMine={isMine} card={card} key={card.id} />
        ))}
      </div>
      <div className="card-list__column">
        {cardsRight.map((card: CardType) => (
          <PhotoCard isMine={isMine} card={card} key={card.id} />
        ))}
      </div>
      {isLoaded || isLimit ? null : (
        <div ref={setRef} className="card-list__footer">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default CardList;
