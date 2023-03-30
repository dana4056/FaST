import React, { useState, useEffect } from 'react';

function Heart() {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = (event: any) => {
    console.log('liked');
    event.stopPropagation();
    setLiked(!liked);
  };
  useEffect(() => {
    console.log(liked);
  }, [liked]);
  return (
    <div onClick={handleLikeClick} role="presentation">
      <button
        className={`like-button ${liked ? ' liked' : ''}`}
        // onClick={handleLikeClick}
        type="button"
      >
        <div className="like-wrapper">
          <div className="ripple" />
          <svg
            className={`heart ${liked ? ' liked' : ''}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
          <div
            className="particles"
            style={{ '--total-particles': 6 } as React.CSSProperties}
          >
            <div
              className="particle"
              style={{ '--i': 1, '--color': '#7642F0' } as React.CSSProperties}
            />
            <div
              className="particle"
              style={{ '--i': 2, '--color': '#AFD27F' } as React.CSSProperties}
            />
            <div
              className="particle"
              style={{ '--i': 3, '--color': '#DE8F4F' } as React.CSSProperties}
            />
            <div
              className="particle"
              style={{ '--i': 4, '--color': '#D0516B' } as React.CSSProperties}
            />
            <div
              className="particle"
              style={{ '--i': 5, '--color': '#5686F2' } as React.CSSProperties}
            />
            <div
              className="particle"
              style={{ '--i': 6, '--color': '#D53EF3' } as React.CSSProperties}
            />
          </div>
        </div>
      </button>
    </div>
  );
}

export default Heart;
