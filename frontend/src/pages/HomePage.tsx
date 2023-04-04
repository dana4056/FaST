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
  isLoaded,
  isLimit,
  pageEnd,
}: any) {
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
        isLoaded={isLoaded}
        isLimit={isLimit}
        pageEnd={pageEnd}
      />
    </div>
  );
}

export default HomePage;
