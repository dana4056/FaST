import React from 'react';
import { BsSearch } from 'react-icons/bs';

import Tag from './Tag';
import { SearchBoxProps } from '../types/ComponentPropsType';
import { TagType } from '../types/TagType';

function SearchBox({
  tags,
  keyword,
  handleKeywordChange,
  handleSearch,
  handleTagDelete,
}: SearchBoxProps) {
  return (
    <form className="search-box card" onSubmit={handleSearch}>
      <div className="search-box__search">
        <input
          type="text"
          placeholder="태그 검색"
          className="search-box__input"
          value={keyword}
          onChange={handleKeywordChange}
        />
        <button type="submit" className="search-box__button">
          <BsSearch />
        </button>
      </div>
      <div className="search-box__tags">
        {tags.map((tag: TagType) => (
          <Tag
            key={tag.value}
            className={tag.className}
            handleTagDelete={handleTagDelete}
          >
            {tag.value}
          </Tag>
        ))}
      </div>
    </form>
  );
}

export default SearchBox;
