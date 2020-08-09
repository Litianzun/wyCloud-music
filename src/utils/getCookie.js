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

export function setCookie(name, value, expiredays) {
  var exdate = new Date();

  exdate.setDate(exdate.getDate() + expiredays);

  document.cookie = name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}
