import React from 'react';

import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import { HomePageProps } from '../types/PagePropsType';

function HomePage({
  isMine,
  tags,
  keyword,
  cardsLeft,
  cardsRight,
  handleKeywordChange,
  handleSearch,
  handleTagDelete,
  scrollRef,
}: HomePageProps) {
  return (
    <div className="main-page">
      <SearchBox
        tags={tags}
        keyword={keyword}
        handleKeywordChange={handleKeywordChange}
        handleSearch={handleSearch}
        handleTagDelete={handleTagDelete}
      />
      <CardList
        isMine={isMine}
        cardsLeft={cardsLeft}
        cardsRight={cardsRight}
        scrollRef={scrollRef}
      />
    </div>
  );
}

export default HomePage;
