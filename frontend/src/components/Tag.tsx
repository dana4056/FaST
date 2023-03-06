import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { TagProps } from '../types/ComponentPropsType';

function Tag({ children, className, handleTagDelete }: TagProps) {
  return (
    <div className={`tag ${className}`}>
      <div className="tag__content">
        {children}
        {handleTagDelete ? (
          <button
            type="button"
            className="tag__button"
            onClick={() => handleTagDelete(children)}
          >
            <AiOutlineClose />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Tag;
