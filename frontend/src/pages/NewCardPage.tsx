import React from 'react';

import InputPhoto from '../components/NewCard/InputPhoto';
import Tag from '../components/Tag';
import { TagType } from '../types/TagType';
import { NewCardPageProps } from '../types/PagePropsType';

function NewCardPage({
  imageUrls,
  handleImageChange,
  handleImageDelete,
  tags,
  description,
  handleDescriptionChange,
  handleSubmit,
}: NewCardPageProps) {
  return (
    <div className="new-card-page">
      <form className="new-card-page__form" onSubmit={handleSubmit}>
        <InputPhoto
          imageUrls={imageUrls}
          handleImageChange={handleImageChange}
          handleImageDelete={handleImageDelete}
        />
        <div className="new-card-page__tags card">
          {tags.map((tag: TagType) => (
            <Tag
              key={tag.value}
              className={tag.className}
              handleTagDelete={null}
            >
              {tag.value}
            </Tag>
          ))}
        </div>
        <div className="new-card-page__description card">
          <textarea
            placeholder="추억을 남겨보세요"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="new-card-page__row">
          <button type="submit" className="new-card-page__submit card">
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCardPage;
