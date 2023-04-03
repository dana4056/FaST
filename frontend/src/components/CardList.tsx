import React from 'react';
import { CardType } from '../types/CardType';
import { CardListProps } from '../types/ComponentPropsType';

import PhotoCard from './PhotoCard';

function CardList({ isMine, cardsLeft, cardsRight, scrollRef }: CardListProps) {
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
      <div ref={scrollRef} className="card-list__footer">
        스크롤sssssssssss
      </div>
    </div>
  );
}

export default CardList;
