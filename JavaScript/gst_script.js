$(document).ready(function(){
  $("#calcBtn").click(function(){
    let amt = parseFloat($("#amount").val()) || 0;
    let gstRate = parseFloat($("#gstRate").val()) || 0;

    let gstAmt = (amt * gstRate) / 100;
    let total = amt + gstAmt;

    $("#actual").text(amt.toFixed(2));
    $("#gst").text(gstAmt.toFixed(2));
    $("#total").text(total.toFixed(2));
  });

  $("#resetBtn").click(function(){
    $("#amount").val("");
    $("#gstRate").val("12");
    $("#actual").text("0.00");
    $("#gst").text("0.00");
    $("#total").text("0.00");
  });
});
