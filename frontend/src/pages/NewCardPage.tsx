import React from 'react';
import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle';

import InputPhoto from '../components/NewCard/InputPhoto';
import Tag from '../components/Tag';
import { NewCardPageProps } from '../types/PagePropsType';
import { ReactComponent as Spin } from '../assets/images/Spinner.svg';

function NewCardPage({
  isModalOpen,
  isLoading,
  isSuccess,
  isFail,
  handleFailModalClose,
  handleModalOpen,
  handleModalClose,
  imageUrls,
  handleImageChange,
  handleImageDelete,
  autoTags,
  customTags,
  textareaRef,
  handleSubmit,
  customTag,
  handleCustomTagInputChange,
  handleCustomTagAdd,
  handleCustomTagDelete,
  handleAutoTagDelete,
  handlePageMove,
  handleTextareaChange,
  tagInputRef,
  errorMessage,
  isNoTags,
  handleNoTagsModalClose,
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
          {autoTags.map((tag: string, i: number) => (
            <Tag
              key={tag}
              className="tag-4"
              handleTagDelete={() => handleAutoTagDelete(i)}
            >
              {tag}
            </Tag>
          ))}
          {customTags.map((tag: string, i: number) => (
            <Tag
              key={tag}
              className="tag-4"
              handleTagDelete={() => handleCustomTagDelete(i)}
            >
              {tag}
            </Tag>
          ))}

          {customTags.length + autoTags.length >= 10 ? null : (
            <button
              type="button"
              className="new-card-page__add-tag"
              onClick={handleModalOpen}
            >
              <AiFillPlusCircle className="new-card-page__add-icon" />
              태그 추가하기
            </button>
          )}
        </div>
        <div className="new-card-page__description card">
          <textarea
            placeholder="추억을 남겨보세요"
            ref={textareaRef}
            maxLength={100}
            rows={1}
            onChange={handleTextareaChange}
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
            className="new-card-page__modal-form card"
            onClick={(event: React.MouseEvent<HTMLFormElement>) =>
              event.stopPropagation()
            }
          >
            <input
              type="text"
              onChange={handleCustomTagInputChange}
              ref={tagInputRef}
              className="new-card-page__input"
              maxLength={15}
              value={customTag}
            />
            <button type="submit" className="new-card-page__modal-submit card">
              입력
            </button>
          </form>
        </div>
      ) : null}
      {isLoading ? (
        <div className="new-card-page__loading">
          <Spin
            style={{ backgroundColor: 'rgba(0,0,0,0)', margin: '0 auto' }}
          />
        </div>
      ) : null}
      {isSuccess ? (
        <div className="new-card-page__modal">
          <div className="new-card-page__success card">
            <div className="new-card-page__success-content">작성 완료</div>
            <button
              type="button"
              className="new-card-page__success-button"
              onClick={handlePageMove}
            >
              닫기
            </button>
          </div>
        </div>
      ) : null}
      {isFail ? (
        <div className="new-card-page__modal">
          <div className="new-card-page__success card">
            <div className="new-card-page__success-content">{errorMessage}</div>
            <button
              type="button"
              className="new-card-page__success-button"
              onClick={handleFailModalClose}
            >
              닫기
            </button>
          </div>
        </div>
      ) : null}
      {isNoTags ? (
        <div className="new-card-page__modal">
          <div className="new-card-page__success card">
            <div className="new-card-page__success-content">{errorMessage}</div>
            <button
              type="button"
              className="new-card-page__success-button"
              onClick={handleNoTagsModalClose}
            >
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NewCardPage;
