import React from 'react';
import { CardType } from '../types/CardType';
import { ReactComponent as Spin } from '../assets/images/Spinner.svg';

import PhotoCard from './PhotoCard';

function CardList({ isMine, cardsLeft, cardsRight, isLimit, pageEnd }: any) {
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
      {isLimit ? (
        <div className="card-list__page-end">
          <div className="card-list__page-end-mark-container">
            <div className="card-list__page-end-mark" />
            <div className="card-list__page-end-mark" />
            <div className="card-list__page-end-mark" />
          </div>
        </div>
      ) : (
        <div ref={pageEnd} className="card-list__footer">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default CardList;
