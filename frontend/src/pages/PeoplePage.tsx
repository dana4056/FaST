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
      <CardList cardsLeft={cardsLeft} cardsRight={cardsRight} />
    </div>
  );
}

export default PeoplePage;
