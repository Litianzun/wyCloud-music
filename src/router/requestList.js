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
  newAlbum: (urlPar) => request("get", "/album/newest", { params: urlPar }),
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
  getUserDetail: (urlPar) => request("get", "/user/detail", { params: urlPar }),
  /**
   * 获取歌单评论
   */
  getAlbumComment: (urlPar) => request("get", "/comment/album", { params: urlPar }),
  /**
   * 获取歌手专辑
   */
  getArtistAlbum: (urlPar) => request("get", "/artist/album", { params: urlPar }),
  /**
   * 我喜欢的音乐
   */
  getMyLike: urlPar => request('get', '/likelist', { params: urlPar }),
  /**
   * 收藏的歌手列表
   */
  getMyArtists: urlPar => request('get', '/artist/sublist', { params: urlPar }),
  /**
   * 收藏的mv列表
   */
  getMyMV: urlPar => request('get', '/mv/sublist', { params: urlPar }),
  /**
   * 我的歌单
   */
  getMyPlayList: urlPar => request('get','/user/playlist', { params: urlPar }),
  /**
   * 获取用户信息及歌单等
   */
  getUserInfo: urlPar => request('get', '/user/subcount', { params: urlPar }),
  /**
   * 获取歌单详情
   */
  getPlayListDetail: urlPar => request('get', '/playlist/detail', { params: urlPar }),
  /**
   * 歌单评论
   */
  getPlaylistComment: urlPar => request('get', '/comment/playlist', { params: urlPar }),
  /**
   * 热门歌单
   */
  getHotPlaylist: urlPar => request('get', '/top/playlist', { params: urlPar })
};

export default list;
