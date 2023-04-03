import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { userInfo } from '../atoms/userInfo';
import MapPage from '../pages/MapPage';
import { CardType } from '../types/CardType';
import { SelectRegionOptionType } from '../types/ComponentPropsType';
import useViewModel from '../viewmodels/ArticleViewModel';
import articleApi from '../api/article';
import useIntersect from '../utils/useIntersect';

function MapContainer() {
  const [user, setUser] = useRecoilState(userInfo);
  const params = useParams();
  const [userState, setUserState] = useState<any>(params.userId);
  const [isMine, setIsMine] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { downloadImages } = useViewModel();

  const [articleData, setArticleData] = useState<any>();

  const cntData = {
    seoul_cnt: 4,
    busan_cnt: 1,
    daegu_cnt: 3,
    incheon_cnt: 2,
    gwangju_cnt: 1,
    daejeon_cnt: 1,
    ulsan_cnt: 4,
    gyeonggi_cnt: 0,
    gangwon_cnt: 1,
    northChungcheong_cnt: 3,
    southChungcheong_cnt: 4,
    northJeolla_cnt: 5,
    southJeolla_cnt: 1,
    northGyeongsang_cnt: 2,
    southGyeongsang_cnt: 4,
    jeju_cnt: 3,
    sejong_cnt: 6,
  };

  const seoulOptions = {
    center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
    level: 9,
  };
  const busanOptions = {
    center: new window.kakao.maps.LatLng(35.1795543, 129.0756416),
    level: 10,
  };
  const daeguOptions = {
    center: new window.kakao.maps.LatLng(35.8214354, 128.601445),
    level: 10,
  };
  const incheonOptions = {
    center: new window.kakao.maps.LatLng(37.4562557, 126.5052062),
    level: 11,
  };
  const gwangjuOptions = {
    center: new window.kakao.maps.LatLng(35.1595454, 126.8526012),
    level: 10,
  };
  const daejeonOptions = {
    center: new window.kakao.maps.LatLng(35.1595454, 126.8526012),
    level: 10,
  };
  const ulsanOptions = {
    center: new window.kakao.maps.LatLng(35.52534995, 129.22244165),
    level: 10,
  };
  const gyeonggiOptions = {
    center: new window.kakao.maps.LatLng(37.5864315, 127.0462765),
    level: 12,
  };
  const gangwonOptions = {
    center: new window.kakao.maps.LatLng(37.8304115, 128.2260705),
    level: 12,
  };
  const northChungcheongOptions = {
    center: new window.kakao.maps.LatLng(36.628503, 127.929344),
    level: 12,
  };
  const southChungcheongOptions = {
    center: new window.kakao.maps.LatLng(36.5184, 126.8),
    level: 12,
  };
  const northJeollaOptions = {
    center: new window.kakao.maps.LatLng(35.7442238, 127.1079532),
    level: 11,
  };
  const southJeollaOptions = {
    center: new window.kakao.maps.LatLng(34.8194, 126.893113),
    level: 12,
  };
  const northGyeongsangOptions = {
    center: new window.kakao.maps.LatLng(36.248647, 128.664734),
    level: 12,
  };
  const southGyeongsangOptions = {
    center: new window.kakao.maps.LatLng(35.259787, 128.664734),
    level: 12,
  };
  const jejuOptions = {
    center: new window.kakao.maps.LatLng(33.364805, 126.542671),
    level: 11,
  };
  const sejongOptions = {
    center: new window.kakao.maps.LatLng(36.5040736, 127.2494855),
    level: 12,
  };

  // 클릭 이벤트
  const [selectOption, setSelectOption] =
    useState<SelectRegionOptionType>(seoulOptions);
  const [clicked, setClicked] = useState('before_click');

  const [clickedArea, setClickedArea] = useState<string>('');
  const [area, setArea] = useState<string>('서울특별시');
  const size = 20;
  const offset = 0;

  const clickRegion = (e: React.MouseEvent<SVGPathElement>) => {
    const target = (e.target as Element).id;

    if (target === 'seoul') {
      setSelectOption(seoulOptions);
    } else if (target === 'busan') {
      setSelectOption(busanOptions);
    } else if (target === 'daegu') {
      setSelectOption(daeguOptions);
    } else if (target === 'incheon') {
      setSelectOption(incheonOptions);
    } else if (target === 'gwangju') {
      setSelectOption(gwangjuOptions);
    } else if (target === 'daejeon') {
      setSelectOption(daejeonOptions);
    } else if (target === 'ulsan') {
      setSelectOption(ulsanOptions);
    } else if (target === 'gyeonggi') {
      setSelectOption(gyeonggiOptions);
    } else if (target === 'gangwon') {
      setSelectOption(gangwonOptions);
    } else if (target === 'northChungcheong') {
      setSelectOption(northChungcheongOptions);
    } else if (target === 'southChungcheong') {
      setSelectOption(southChungcheongOptions);
    } else if (target === 'northJeolla') {
      setSelectOption(northJeollaOptions);
    } else if (target === 'southJeolla') {
      setSelectOption(southJeollaOptions);
    } else if (target === 'northGyeongsang') {
      setSelectOption(northGyeongsangOptions);
    } else if (target === 'southGyeongsang') {
      setSelectOption(southGyeongsangOptions);
    } else if (target === 'jeju') {
      setSelectOption(jejuOptions);
    } else if (target === 'sejong') {
      setSelectOption(sejongOptions);
    }
    console.log(target, selectOption);
    setClickedArea(() => target);
    setClicked('after_click');
    console.log(clickedArea);
  };

  useEffect(() => {
    if (clickedArea === 'seoul') {
      setArea('서울특별시');
    } else if (clickedArea === 'busan') {
      setArea('부산광역시');
    } else if (clickedArea === 'daegu') {
      setArea('대구광역시');
    } else if (clickedArea === 'incheon') {
      setArea('인천광역시');
    } else if (clickedArea === 'gwangju') {
      setArea('광주광역시');
    } else if (clickedArea === 'daejeon') {
      setArea('대전');
    } else if (clickedArea === 'ulsan') {
      setArea('울산');
    } else if (clickedArea === 'gyeonggi') {
      setArea('경기도');
    } else if (clickedArea === 'gangwon') {
      setArea('강원도');
    } else if (clickedArea === 'northChungcheong') {
      setArea('충청북도');
    } else if (clickedArea === 'southChungcheong') {
      setArea('충청남도');
    } else if (clickedArea === 'northJeolla') {
      setArea('전라북도');
    } else if (clickedArea === 'southJeolla') {
      setArea('전라남도');
    } else if (clickedArea === 'northGyeongsang') {
      setArea('경상북도');
    } else if (clickedArea === 'southGyeongsang') {
      setArea('경상남도');
    } else if (clickedArea === 'jeju') {
      setArea('제주특별자치도');
    } else if (clickedArea === 'sejong') {
      setArea('세종시');
    }
  }, [clickedArea]);

  const clickBack = (e: React.MouseEvent<SVGPathElement>) => {
    setClicked('before_click');
  };
  useEffect(() => {
    const getData = async () => {
      // 지역 기반 데이터 조회
      const mapData: any = await articleApi.getMapArticle(
        userState,
        size,
        offset,
        area
      );
      setArticleData(mapData.data);
    };
    getData();
  }, [area]);

  // console.log(articleData);

  const [cardsLeft, setCardsLeft] = useState<Array<CardType>>([]);
  const [cardsRight, setCardsRight] = useState<Array<CardType>>([]);

  useEffect(() => {
    const setData = async () => {
      const cardLeftList: any = [];
      const cardRightList: any = [];
      if (articleData?.length > 0) {
        await Promise.all(
          articleData.map(async (article: any, i: number) => {
            if (i % 2 === 0) {
              const leftArticleTags: any = [];
              article.tags.map((tag: any) =>
                leftArticleTags.push({
                  value: tag.tagName,
                  className: 'tag-2 tag-small',
                })
              );
              const imageUrls = await downloadImages(
                article.imgPath.split(',')
              );
              cardLeftList.push({
                id: article?.id,
                imageUrls,
                nickname: article?.nickName,
                content: '',
                regTime: article?.createTime,
                isLike: article?.likeCheck,
                numLikes: article?.likeCount,
                numComments: article?.commentCount,
                tags: leftArticleTags,
              });
            } else {
              const rightArticleTags: any = [];
              await Promise.all(
                article.tags.map((tag: any) =>
                  rightArticleTags.push({
                    value: tag.tagName,
                    className: 'tag-2 tag-small',
                  })
                )
              );
              const imageUrls = await downloadImages(
                article.imgPath.split(',')
              );
              cardRightList.push({
                id: article?.id,
                imageUrls,
                nickname: article?.nickName,
                content: '',
                regTime: article?.createTime,
                isLike: article?.likeCheck,
                numLikes: article?.likeCount,
                numComments: article?.commentCount,
                tags: rightArticleTags,
              });
            }
          })
        );
      }
      if (cardLeftList.length > 0) {
        setCardsLeft([
          ...cardLeftList.sort((o1: any, o2: any) => o2.id - o1.id),
        ]);
      }
      if (cardRightList.length > 0) {
        setCardsRight([
          ...cardRightList.sort((o1: any, o2: any) => o2.id - o1.id),
        ]);
      }
    };
    setData();
  }, [articleData]);
  return (
    <MapPage
      cardsLeft={cardsLeft}
      cardsRight={cardsRight}
      isMine={isMine}
      setRef={null}
      isLoaded={false}
      isLimit={false}
      cntData={cntData}
      checkClicked={clicked}
      clickRegion={clickRegion}
      clickBack={clickBack}
      selectOption={selectOption}
    />
  );
}

export default MapContainer;
