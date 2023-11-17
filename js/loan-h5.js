var client_id = "",
  isScroll = false,
  isDownLoad = true,
  current_ip = "",
  androidId = null;

function getIpByIpify() {
  $.ajax({
    url: "https://api.ipify.org/?format=json",
    type: "GET",
    data: {},
    dataType: "json",
    success: function (o) {
      current_ip = o.ip;
    },
    error: function () {},
  });
}

function sendBackData() {
  let data = {
    androidId,
    clientId: client_id,
    clientUserAgent: navigator.userAgent,
    clientIpAddress: current_ip,
    eventSourceUrl: location.href,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  };
  if (getQueryVariable("utm_source")) {
    data["utmSource"] = getQueryVariable("utm_source");
  }
  if (getQueryVariable("utm_medium")) {
    data["utmMedium"] = getQueryVariable("utm_medium");
  }
  if (getQueryVariable("utm_campaign")) {
    data["utmCampaign"] = getQueryVariable("utm_campaign");
  }
  ajaxPost("/api/diversion/channelObtain", data, function (data) {
    console.log(data);
  });
}
function sendTrackEvent(o) {
  gtag("event", o);
  fbq("track", o);
}
function getCookie(o) {
  o = ("; " + document.cookie).split(`; ${o}=`);
  if (2 === o.length) return o.pop().split(";").shift();
}
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
function downLoadApp() {
  console.log(
    `https://handycash.onelink.me/UjoE?af_xp=custom&pid=${
      getQueryVariable("utm_source") || ""
    }&vid=${androidId}`
  );
  console.log(androidId, "**** uuid");
  location.href = `https://handycash.onelink.me/UjoE?af_xp=custom&pid=${
    getQueryVariable("utm_source") || ""
  }&vid=${androidId}`;
}

$(function () {
  getIpByIpify();
  gtag("get", "G-DQXMSRPC72", "client_id", (o) => {
    client_id = o;
  });
  console.log("page_view_Handy");
  $("#Pending-App")[0].style.display = "none";
  sendTrackEvent("page_view_Handy");
  $("#Download-App").on("click", function () {
    if (!isDownLoad) return;
    androidId = generateUUID();
    $("#Download-App")[0].style.display = "none";
    $("#Pending-App")[0].style.display = "";
    isDownLoad = false;
    setTimeout(() => {
      isDownLoad = true;
      $("#Download-App")[0].style.display = "";
      $("#Pending-App")[0].style.display = "none";
    }, 5000);
    sendTrackEvent("click_install_Handy");
    sendBackData();
    downLoadApp();
  });
  // 滚动事件发生时执行的代码
  $(document).ready(function () {
    $(window).scroll(function () {
      if (!isScroll) {
        isScroll = true;
        console.log(isScroll, "page_scroll_Handy");
        sendTrackEvent("page_scroll_Handy");
      }
    });
  });
});

function getQueryVariable(o) {
  var e = location.href.split("?");
  try {
    for (var n = e[1].split("&"), t = 0; t < n.length; t++) {
      var a = n[t].split("=");
      if (a[0] == o) return a[1];
    }
  } catch (o) {}
  return !1;
}
