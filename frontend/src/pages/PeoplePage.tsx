import React from 'react';

import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';

function PeoplePage({
  tags,
  keyword,
  handleKeywordChange,
  handleSearch,
  handleTagDelete,
  cardsLeft,
  cardsRight,
  scrollRef,
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
        isMine={false}
        cardsLeft={cardsLeft}
        cardsRight={cardsRight}
        scrollRef={scrollRef}
      />
    </div>
  );
}

export default PeoplePage;
