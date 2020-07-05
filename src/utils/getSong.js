import list from '../router/requestList'

export async function getSong(songInfo, ctx) {
  const params = {
    id: songInfo.id,
  };
  const res = await list.getSongUrl(params);
  if (res.code === 200) {
    ctx.dispatch({
      type: "setSong",
      payload: { song: res.data && res.data.length > 0 ? Object.assign({}, res.data[0], songInfo) : null },
    });
  } else {
    console.log("获取歌曲信息失败!");
  }
}
