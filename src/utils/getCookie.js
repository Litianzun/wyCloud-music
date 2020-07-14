export function getcookie(keys) {
  var arr = document.cookie.split(";");

  for (var i = 0; i < arr.length; i++) {
    var ass = arr[i].split("=");

    if (ass[0].trim() == keys) {
      return ass[i];
    }
  }

  return false;
}
