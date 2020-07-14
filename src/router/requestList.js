import request from "../utils/request";

const list = {
  /**
   * test
   */
  test: (urlPar) => request("get", "test.html", { params: urlPar }),
  /**
   * 首页轮播图
   */
  banner: (urlPar) => request("get", "/banner", { params: urlPar }),
  /**
   * 推荐歌单
   */
  personalized: (urlPar) => request("get", "/personalized", { params: urlPar }),
  /**
   * 推荐新音乐
   */
  personalizedNewsong: (urlPar) => request("get", "/personalized/newsong", { params: urlPar }),
  /**
   * 新碟上架
   */
  newAlbum: (urlPar) => request("get", "/top/album", { params: urlPar }),
  /**
   * 榜单
   */
  toplist: (urlPar) => request("get", "/toplist", { params: urlPar }),
  /**
   * 榜单详情
   */
  toplistDetail: (urlPar) => request("get", "/toplist/detail", { params: urlPar }),
  /**
   * 歌单详情
   */
  playlistDetail: (urlPar) => request("get", "/playlist/detail", { params: urlPar }),
  /**
   * 获取音乐url
   */
  getSongUrl: (urlPar) => request("get", "/song/url", { params: urlPar }),
  /**
   * 专辑信息
   */
  getAlbum: (urlPar) => request("get", "/album", { params: urlPar }),
  /**
   * 搜索
   */
  search: (urlPar) => request("get", "/search", { params: urlPar }),
  /**
   * 获取mv的url
   */
  getMvUrl: (urlPar) => request("get", "/mv/url", { params: urlPar }),
  /**
   * 获取mv信息
   */
  getMv: (urlPar) => request("get", "/mv/detail", { params: urlPar }),
  /**
   * 相关视频
   */
  getRelatedVideo: (urlPar) => request("get", "/related/allvideo", { params: urlPar }),
  /**
   * mv评论
   */
  getMvComment: (urlPar) => request("get", "/comment/mv", { params: urlPar }),
  /**
   * 登录-手机
   */
  loginInPhone: (urlPar) => request("get", "/login/cellphone", { params: urlPar }),
  /**
   * 登录-邮箱
   */
  loginInEmail: (urlPar) => request("get", "/login", { params: urlPar }),
  /**
   * 获取用户详情
   */
  getUserDetail: (urlPar) => request('get', '/user/detail', {params: urlPar})
};

export default list;
