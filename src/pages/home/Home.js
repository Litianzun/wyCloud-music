import React, { useEffect, useState } from "react";
import { Carousel, Card, Row, Col } from "antd";
import list from "../../router/requestList";
import "./Home.less";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import ToplistItem from "../../components/toplistItem/ToplistItem";
import { object } from "prop-types";

function Home(props) {
  const [bannerList, setBannerList] = useState([]);
  const [recommend, setRecommend] = useState([]); //推荐歌单
  const [newAlbum, setNewAlbum] = useState([]); //新碟上架
  const [toplist, setToplist] = useState([]); //榜单
  useEffect(() => {
    async function getBanner() {
      const urlPar = {
        type: 0,
      };
      const bannerList = await list.banner(urlPar);
      if (bannerList.code == 200) {
        setBannerList(bannerList.banners);
      }
    }
    async function getRecommend() {
      const urlPar = {
        limit: 8,
      };
      const recommend = await list.personalized(urlPar);
      if (recommend.code == 200) {
        setRecommend(recommend.result);
      }
    }
    async function getNewAlbum() {
      const newAlbum = await list.newAlbum(null);
      if (newAlbum.code == 200) {
        setNewAlbum(newAlbum.albums.slice(0, 5));
      }
    }
    async function getTopList() {
      try {
        const toplist = await list.toplist(null);
        if (toplist.code == 200) {
          setToplist(toplist.list);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getBanner();
    getRecommend();
    getNewAlbum();
    getTopList();
  }, []);
  function handleBannerCallback(item) {
    if (item.targetType === 1) {
      props.history.push(`/song/${item.targetId}`);
    } else if(item.targetType === 3000) {
      window.open(item.url);
    } else {
      console.log(item)
    }
  }
  return (
    <div className="homeWrapper">
      <section className="bannerBox">
        <Carousel autoplay effect="fade">
          {bannerList.map((item) => (
            <div
              key={item.encodeId}
              className="bannerBox-global"
              onClick={() => handleBannerCallback(item)}
            >
              <img src={item.imageUrl} className="bannerImg" />
            </div>
          ))}
        </Carousel>
      </section>
      <section className="recommendBox">
        <SectionTitle title="热门推荐" />
        {recommend.map((item) => (
          <div
            className="recommendCardWrapper"
            key={item.id}
            onClick={() => {
              props.history.push(`/playlist/${item.id}`);
            }}
          >
            <Card
              hoverable
              className="recommendCard"
              cover={<img src={item.picUrl} alt={item.alg} />}
            >
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
                    // const info = await list.getAlbum({id: item.id, limit: 30});
                    // console.log(info)
                    // dispatch({ type: "changeSwitch", payload: { playSwitch: true } });
                    // await getSong(info.songs[0], Object.assign(ctx, { dispatch, store }));
                    props.history.push({ pathname: `/album/${item.id}` });
                  }}
                />
              }
            >
              <Card.Meta
                title={item.name}
                description={item.artist && item.artist.name}
              />
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
  );
}

export default Home;

Home.propTypes = {
  history: object,
};
