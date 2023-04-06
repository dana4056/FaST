import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsBookmarkPlus } from '@react-icons/all-files/bs/BsBookmarkPlus';

import Tag from './Tag';
import { AddPersonalTagProps } from '../types/ComponentPropsType';
import { TagType } from '../types/TagType';
import Modal from './Modal';

function AddPersonalTag({
  tags,
  keyword,
  handleKeywordChange,
  handleSearch,
  handleTagDelete,
  index,
  submit,
}: AddPersonalTagProps) {
  const [openTagModal, setOpenTagModal] = useState<boolean>(false);

  useEffect(() => {
    if (index !== -1) {
      setOpenTagModal(true);
    }
  }, [index]);

  const onClickTagModal = useCallback(() => {
    setOpenTagModal(!openTagModal);
  }, [openTagModal]);
  return (
    <div>
      {openTagModal && submit && (
        <Modal onClickToggleModal={onClickTagModal}>
          <div className="follow_delete_modal">
            <h3 className="follow_delete_text">이미 추가된 태그입니다.</h3>
            <button
              className="follow_delete_btn"
              type="button"
              onClick={() => {
                setOpenTagModal(!openTagModal);
                console.log(openTagModal);
              }}
            >
              확인
            </button>
          </div>
        </Modal>
      )}
      <form className="search-box card" onSubmit={handleSearch}>
        <div className="search-box__search">
          <input
            type="text"
            placeholder="태그 추가"
            className="search-box__input"
            value={keyword}
            onChange={handleKeywordChange}
          />
          <button type="submit" className="add-box__button">
            <BsBookmarkPlus />
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
    </div>
  );
}

export default AddPersonalTag;
