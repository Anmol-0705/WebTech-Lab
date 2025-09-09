$(document).ready(function(){
  $("#calcBtn").click(function(){
    let basic = parseFloat($("#basic").val()) || 0;
    let hra = parseFloat($("#hra").val()) || 0;
    let da = parseFloat($("#da").val()) || 0;
    let inc = parseFloat($("#incentive").val()) || 0;

    let gross = basic + hra + da + inc;
    let tax = gross * 0.20; // 20% tax
    let net = gross - tax;

    $("#gross").text(gross.toFixed(2));
    $("#tax").text(tax.toFixed(2));
    $("#net").text(net.toFixed(2));
  });
});
