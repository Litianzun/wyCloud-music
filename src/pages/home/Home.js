import React, { useEffect, useState, useContext } from "react";
import { Carousel, Card, List, Row, Col } from "antd";
import list from "../../router/requestList";
import "./Home.less";
import { winHeight, winWidth } from "../../utils/common";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import ToplistItem from "../../components/toplistItem/ToplistItem";
import { reducerCtx, store, dispatch } from "../../router/router";
import { getSong } from "../../utils/getSong";

function Home() {
  const [bannerList, setBannerList] = useState([]);
  const [recommend, setRecommend] = useState([]); //推荐歌单
  const [newAlbum, setNewAlbum] = useState([]); //新碟上架
  const [toplist, setToplist] = useState([]); //榜单
  const ctx = useContext(reducerCtx);
  useEffect(() => {
    async function getBanner() {
      let urlPar = {
        type: 0,
      };
      const bannerList = await list.banner(urlPar);
      console.log(bannerList);
      if (bannerList.code == 200) {
        setBannerList(bannerList.banners);
      }
    }
    async function getRecommend() {
      let urlPar = {
        limit: 8,
      };
      const recommend = await list.personalized(urlPar);
      console.log(recommend);
      if (recommend.code == 200) {
        setRecommend(recommend.result);
      }
    }
    async function getNewAlbum() {
      let urlPar = {
        limit: 5,
        offset: 0,
      };
      const newAlbum = await list.newAlbum(urlPar);
      console.log(newAlbum);
      if (newAlbum.code == 200) {
        setNewAlbum(newAlbum.albums);
      }
    }
    async function getTopList() {
      try{
        const toplist = await list.toplist(null);
        console.log(toplist);
        if (toplist.code == 200) {
          setToplist(toplist.list);
        }
      }catch(e){
        console.error(e)
      }
    }
    getBanner();
    getRecommend();
    getNewAlbum();
    getTopList();
  }, []);
  return (
    <reducerCtx.Provider value={{ store, dispatch }}>
      <div className="homeWrapper">
        <section className="bannerBox">
          <Carousel autoplay effect="fade">
            {bannerList.map((item) => (
              <div key={item.encodeId} className='bannerBox-global'>
                <img src={item.imageUrl} className="bannerImg" />
              </div>
            ))}
          </Carousel>
        </section>
        <section className="recommendBox">
          <SectionTitle title="热门推荐" />
          {recommend.map((item) => (
            <div className="recommendCardWrapper" key={item.id}>
              <Card hoverable className="recommendCard" cover={<img src={item.picUrl} alt={item.alg} />}>
                <Card.Meta description={item.name}></Card.Meta>
              </Card>
            </div>
          ))}
        </section>
        <section className="newAlbumBox">
          <SectionTitle title="新碟上架" />
          {newAlbum.map((item) => (
            <div className="newAlbumWrapper" key={item.id}>
              <Card
                hoverable
                className="newAlbumCard"
                cover={
                  <img
                    src={item.picUrl}
                    alt={item.company}
                    onClick={async () => {
                      const info = await list.getAlbum({id: item.id, limit: 30});
                      console.log(info)
                      dispatch({ type: "changeSwitch", payload: { playSwitch: true } });
                      await getSong(info.songs[0], Object.assign(ctx, { dispatch, store }));
                    }}
                  />
                }
              >
                <Card.Meta title={item.name} description={item.artist && item.artist.name} />
              </Card>
            </div>
          ))}
        </section>
        <section className="rankListBox">
          <SectionTitle title="榜单" rightContent="更多 >>" />
          <Row>
            {toplist.slice(0, 3).map((item, index) => (
              <Col span={8} key={index}>
                <ToplistItem {...item} />
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </reducerCtx.Provider>
  );
}

export default Home;
