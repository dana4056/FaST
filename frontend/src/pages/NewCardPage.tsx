import React from 'react';
import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle';

import InputPhoto from '../components/NewCard/InputPhoto';
import Tag from '../components/Tag';
import { TagType } from '../types/TagType';
import { NewCardPageProps } from '../types/PagePropsType';

function NewCardPage({
  isModalOpen,
  isLoading,
  handleModalOpen,
  handleModalClose,
  imageUrls,
  handleImageChange,
  handleImageDelete,
  autoTags,
  customTags,
  description,
  handleDescriptionChange,
  handleSubmit,
  customTag,
  handleCustomTagInputChange,
  handleCustomTagAdd,
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
          {customTags.map((tag: TagType) => (
            <Tag
              key={tag.value}
              className={tag.className}
              handleTagDelete={null}
            >
              {tag.value}
            </Tag>
          ))}
          {autoTags.map((tag: TagType) => (
            <Tag
              key={tag.value}
              className={tag.className}
              handleTagDelete={null}
            >
              {tag.value}
            </Tag>
          ))}
          <button
            type="button"
            className="new-card-page__add-tag"
            onClick={handleModalOpen}
          >
            <AiFillPlusCircle className="new-card-page__add-icon" />
            태그 추가하기
          </button>
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
      {isModalOpen ? (
        <div
          className="new-card-page__modal"
          role="presentation"
          onClick={handleModalClose}
        >
          <form
            onSubmit={handleCustomTagAdd}
            role="presentation"
            className="new-card-page__modal-form"
            onClick={(event: React.MouseEvent<HTMLFormElement>) =>
              event.stopPropagation()
            }
          >
            <input
              type="text"
              onChange={handleCustomTagInputChange}
              className="new-card-page__input"
              value={customTag}
            />
            <button type="submit" className="new-card-page__modal-submit card">
              입력
            </button>
          </form>
        </div>
      ) : null}
      {isLoading ? <div className="new-card-page__loading">로딩</div> : null}
    </div>
  );
}

export default NewCardPage;
