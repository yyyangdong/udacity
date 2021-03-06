function drawLine(data) {

  "use strict";

  // 数据预处理
  var format = d3.time.format("%Y-%m-%d %H:%M:%S");
  // var yearmonth = d3.time.format("%Y-%m");
  // data.forEach(function(d) {
  //   d.date = yearmonth(format.parse(d.LoanOriginationDate));
  //   d.LoanAmount = +d.LoanOriginalAmount;
  //   d.count = 1;
  // });

  var agg_data = data.reduce(function(ad, d) {
    var year = format.parse(d.LoanOriginationDate).getUTCFullYear();
    if (year in ad) {
      ad[year] += (+d.LoanOriginalAmount);
    } else {
      ad[year] = (+d.LoanOriginalAmount);
    }
    return ad;
  }, {})

  var data_array = Object.keys(agg_data).map(function(key) {
    return {
      date: key,
      LoanAmount: agg_data[key]
    };
  });

  // debugger;

  // 创建svg
  var svg = dimple.newSvg("body", 1400, 900);
  svg.append("text")
    .attr("x", (svg[0][0].clientWidth / 2))
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .style("font-weight", "bold")
    .text("Loan Original Amount");

  // 创建chart
  var myChart = new dimple.chart(svg, data_array);
  myChart.setMargins("10%", "10%", "10%", "20%");

  var x = myChart.addTimeAxis("x", "date");
  x.dateParseFormat = "%Y";
  x.tickFormat = "%Y";
  // x.timeInterval = 1;
  x.title = "Loan Origination Date (Month)"
  x.fontSize = 15;
  var y = myChart.addMeasureAxis("y", "LoanAmount");
  y.fontSize = 15;
  y.title = "Loan Original Amount ($)"
  myChart.addSeries(null, dimple.plot.line);
  myChart.addSeries(null, dimple.plot.scatter);
  myChart.draw();

};
