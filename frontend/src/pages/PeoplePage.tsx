import React from 'react';

import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import { HomePageProps } from '../types/PagePropsType';

function PeoplePage({
  tags,
  keyword,
  handleKeywordChange,
  handleSearch,
  handleTagDelete,
  cardsLeft,
  cardsRight,
  isLoaded,
  isLimit,
  setRef,
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
        isMine={false}
        cardsLeft={cardsLeft}
        cardsRight={cardsRight}
        isLoaded={isLoaded}
        isLimit={isLimit}
        setRef={setRef}
      />
    </div>
  );
}

export default PeoplePage;
