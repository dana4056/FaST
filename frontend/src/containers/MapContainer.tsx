import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MapPage from '../pages/MapPage';
import { CardType } from '../types/CardType';
import { SelectRegionOptionType } from '../types/ComponentPropsType';
import useViewModel from '../viewmodels/ArticleViewModel';
import articleApi from '../api/article';

function MapContainer() {
  const pageEnd = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [userState, setUserState] = useState<any>(params.userId);
  const [isMine, setIsMine] = useState<boolean>(true);
  const { downloadImages, getMyArticles } = useViewModel();

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
  const [area, setArea] = useState<string>('전국');
  const size = 20;
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [isLimit, setIsLimit] = useState<boolean>(false);

  const clickRegion = (e: React.MouseEvent<SVGPathElement>) => {
    const target = (e.target as Element).id;
    setClickedArea(target);
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
    setClicked('after_click');
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
    setArea('전국');
    setClickedArea('');
  };

  const [cardsLeft, setCardsLeft] = useState<Array<CardType>>([]);
  const [cardsRight, setCardsRight] = useState<Array<CardType>>([]);

  const [seoulCnt, setSeoulCnt] = useState<number>(0);
  const [busanCnt, setBusanCnt] = useState<number>(0);
  const [daeguCnt, setDaeguCnt] = useState<number>(0);
  const [incheonCnt, setIncheonCnt] = useState<number>(0);
  const [gwangjuCnt, setGwangjuCnt] = useState<number>(0);
  const [daejeonCnt, setDaejeonCnt] = useState<number>(0);
  const [ulsanCnt, setUlsanCnt] = useState<number>(0);
  const [gyeonggiCnt, setGyeonggiCnt] = useState<number>(0);
  const [gangwonCnt, setGangwonCnt] = useState<number>(0);
  const [northChungcheongCnt, setNorthChungcheongCnt] = useState<number>(0);
  const [southChungcheongCnt, setSouthChungcheongCnt] = useState<number>(0);
  const [northJeollaCnt, setNorthJeollaCnt] = useState<number>(0);
  const [southJeollaCnt, setSouthJeollaCnt] = useState<number>(0);
  const [northGyeongsangCnt, setNorthGyeongsangCnt] = useState<number>(0);
  const [southGyeongsangCnt, setSouthGyeongsangCnt] = useState<number>(0);
  const [jejuCnt, setJejuCnt] = useState<number>(0);
  const [sejongCnt, setSejongCnt] = useState<number>(0);

  const getData = async () => {
    setLoading(true);

    // 지역기반 게시물 데이터
    const mapData: any = await articleApi.getMapArticle(
      userState,
      size,
      offset,
      area
    );

    const mapCntData: any = await articleApi.getMapArticleCnt(userState);

    for (let i = 0; i < mapCntData.data.length; i += 1) {
      if (mapCntData.data[i].area === '서울특별시') {
        setSeoulCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '세종특별자치시') {
        setSejongCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '광주광역시') {
        setGwangjuCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '대전광역시') {
        setDaejeonCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '인천광역시') {
        setIncheonCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '울산광역시') {
        setUlsanCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '대구광역시') {
        setDaeguCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '제주특별자치도') {
        setJejuCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '부산광역시') {
        setBusanCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '충청북도') {
        setNorthChungcheongCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '강원도') {
        setGangwonCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '충청남도') {
        setSouthChungcheongCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '전라북도') {
        setNorthJeollaCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '전라남도') {
        setSouthJeollaCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '경상북도') {
        setNorthGyeongsangCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '경상남도') {
        setSouthGyeongsangCnt(mapCntData.data[i].cnt);
      } else if (mapCntData.data[i].area === '경기도') {
        setGyeonggiCnt(mapCntData.data[i].cnt);
      }
    }

    if (mapData.status === 200) {
      const cardLeftList: any = [];
      const cardRightList: any = [];
      if (mapData.data.length > 0) {
        await Promise.all(
          mapData.data.map(async (article: any, i: number) => {
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
        if (cardLeftList.length > 0) {
          setCardsLeft([
            ...cardLeftList.sort((o1: any, o2: any) => o2.id - o1.id),
          ]);
        } else if (cardLeftList.length === 0) {
          setCardsLeft([]);
        }
        if (cardRightList.length > 0) {
          setCardsRight([
            ...cardRightList.sort((o1: any, o2: any) => o2.id - o1.id),
          ]);
        } else if (cardRightList.length === 0) {
          setCardsRight([]);
        }
      } else {
        setIsLimit(() => true);
      }
    }
    setLoading(false);
  };

  const cntData = {
    seoul_cnt: seoulCnt,
    busan_cnt: busanCnt,
    daegu_cnt: daeguCnt,
    incheon_cnt: incheonCnt,
    gwangju_cnt: gwangjuCnt,
    daejeon_cnt: daejeonCnt,
    ulsan_cnt: ulsanCnt,
    gyeonggi_cnt: gyeonggiCnt,
    gangwon_cnt: gangwonCnt,
    northChungcheong_cnt: northChungcheongCnt,
    southChungcheong_cnt: southChungcheongCnt,
    northJeolla_cnt: northJeollaCnt,
    southJeolla_cnt: southJeollaCnt,
    northGyeongsang_cnt: northGyeongsangCnt,
    southGyeongsang_cnt: southGyeongsangCnt,
    jeju_cnt: jejuCnt,
    sejong_cnt: sejongCnt,
  };

  const [positionData, setPositionData] = useState<any>();
  useEffect(() => {
    const getMapPinData = async () => {
      const pinData: any = await articleApi.getPinData(userState, area);
      setPositionData(pinData.data);
    };
    getMapPinData();
  }, [area]);

  useEffect(() => {
    getData();
  }, [area, offset]);

  const loadMore = () => {
    setOffset((prev: number) => prev + 1);
  };

  useEffect(() => {
    if (!pageEnd.current) return;
    const observer = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting && !loading && !isLimit) {
        loadMore();
      }
    });
    observer.observe(pageEnd.current);
    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, [pageEnd, isLimit, loading]);

  return (
    <MapPage
      cardsLeft={cardsLeft}
      cardsRight={cardsRight}
      isMine={isMine}
      setRef={null}
      isLoaded={false}
      isLimit={isLimit}
      pageEnd={pageEnd}
      cntData={cntData}
      checkClicked={clicked}
      clickRegion={clickRegion}
      clickBack={clickBack}
      selectOption={selectOption}
      positionData={positionData}
      area={area}
    />
  );
}

export default MapContainer;
