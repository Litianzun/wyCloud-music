/**
 * 获取浏览器窗口大小
 */
let winWidth = 0,
  winHeight = 0;
if (window.innerWidth) {
  winWidth = window.innerWidth;
} else if (document.body && document.body.clientWidth) {
  winWidth = document.body.clientWidth;
}

if (window.innerHeight) {
  winHeight = window.innerHeight;
} else if (document.body && document.body.clientHeight) {
  winHeight = document.body.clientHeight;
}

if (
  document.documentElement &&
  document.documentElement.clientHeight &&
  document.documentElement.clientWidth
) {
  winHeight = document.documentElement.clientHeight;
  winWidth = document.documentElement.clientWidth;
}

/**
 * 数字量化
 */
function formatCount(num){
  return num/100000 >=1 ? Math.floor(num/10000) + '万' : num
}

export { winWidth, winHeight, formatCount };
