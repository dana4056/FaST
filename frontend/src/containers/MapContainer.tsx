import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { userInfo } from '../atoms/userInfo';
import MapPage from '../pages/MapPage';
import sample1 from '../assets/images/sample-images/sample_1.jpg';
import sample2 from '../assets/images/sample-images/sample_2.jpg';
import sample3 from '../assets/images/sample-images/sample_3.jpg';
import { CardType } from '../types/CardType';

function MapContainer() {
  const params = useParams();
  const [user, setUser] = useRecoilState(userInfo);
  const [userState, setUserState] = useState<any>(params.userId);
  const [isMine, setIsMine] = useState<boolean>(false);

  useEffect(() => {
    if (user.id.toString() === userState.toString()) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, []);

  const [cardsLeft, setCardsLeft] = useState<Array<CardType>>([
    {
      id: 3,
      imageUrls: [sample1],
      nickname: 'abcd1234',
      content: '샘플1',
      regTime: '지금',
      isLike: false,
      numLikes: 123,
      numComments: 12,
      tags: [
        {
          value: 'sample1',
          className: 'tag-2 tag-small',
        },
        {
          value: 'sample2',
          className: 'tag-2 tag-small',
        },
      ],
    },
    {
      id: 4,
      imageUrls: [sample2],
      nickname: 'abcd1234',
      content: '샘플1',
      regTime: '지금',
      isLike: false,
      numLikes: 123,
      numComments: 12,
      tags: [
        {
          value: 'sample1',
          className: 'tag-2 tag-small',
        },
        {
          value: 'sample2',
          className: 'tag-2 tag-small',
        },
      ],
    },
  ]);
  const [cardsRight, setCardsRight] = useState<Array<CardType>>([
    {
      id: 5,
      imageUrls: [sample3],
      nickname: 'abcd1234',
      content: '샘플1',
      regTime: '지금',
      isLike: false,
      numLikes: 123,
      numComments: 12,
      tags: [
        {
          value: 'sample1',
          className: 'tag-2 tag-small',
        },
        {
          value: 'sample2',
          className: 'tag-2 tag-small',
        },
      ],
    },
    {
      id: 6,
      imageUrls: [sample1],
      nickname: 'abcd1234',
      content: '샘플1',
      regTime: '지금',
      isLike: false,
      numLikes: 123,
      numComments: 12,
      tags: [
        {
          value: 'sample1',
          className: 'tag-2 tag-small',
        },
        {
          value: 'sample2',
          className: 'tag-2 tag-small',
        },
      ],
    },
  ]);
  return (
    <MapPage cardsLeft={cardsLeft} cardsRight={cardsRight} isMine={isMine} />
  );
}

export default MapContainer;
