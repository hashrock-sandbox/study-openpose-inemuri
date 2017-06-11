function toParts(item) {
  //TODO 耳の距離を利用して正規化する
  //var eardist = item[3 * 15] - item[3 * 16]

  //左耳と右耳のy座標の平均を取る
  var yheikin = (item[3 * 15 + 1] + item[3 * 16 + 1]) / 2
  //鼻のy座標と上記平均値との差を取る
  var utumuki = item[1] - yheikin
  //xピクセル以上差があれば、うつむいているとみなす
  var threshold = 5
  //結果イメージと座標がずれてしまっているので調整…
  var ratio = 1.61

  return {
    center: {
      x: item[0] * ratio,
      y: item[1] * ratio
    },
    rear: {
      x: item[3 * 15] * ratio,
      y: item[3 * 15 + 1] * ratio,
    },
    lear: {
      x: item[3 * 16] * ratio,
      y: item[3 * 16 + 1] * ratio,
    },
    state: utumuki > threshold ? "ねてる？" : ""
  }
}

new Vue({
  el: "#app",
  data: {
    msg: "test",
    result: [

    ]
  },
  mounted: function () {
    var url = "./sleep.json"
    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      this.result = json.people.map((item) => {
        return toParts(item.body_parts)
      })
    });
  }
})