// document.querySelector("#start").addEventListener("click", (e) => {
//   window.location.href = "taotlus.html";
// });

// Nuppude

$("#next_btn_data").click(function () {
  $("#business-tab").trigger("click");
});

$("#next_btn_business").click(function () {
  $("#finance-tab").trigger("click");
});

$("#previous_btn_business").click(function () {
  $("#data-tab").trigger("click");
});

$("#next_btn_finance").click(function () {
  $("#cv-tab").trigger("click");
});

$("#previous_btn_finance").click(function () {
  $("#business-tab").trigger("click");
});

$("#previous_btn_cv").click(function () {
  $("#finance-tab").trigger("click");
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$("#uploadCollapse").click(function () {
  $("#collapse2").collapse("hide");
  $("#collapse1").collapse("show");
});

$("#fillCollapse").click(function () {
  $("#collapse1").collapse("hide");
  $("#collapse2").collapse("show");
});

// Avalduse submit

function validateForm() { // lühiversioon document.ready funktsioonist

  // Tühjendame errorMessages divi
  $("#errorMessages").empty();

  var business_plan_file = document.getElementById("business_plan_file");
  var finance_plan_file = document.getElementById("finance_plan_file");
  var cv_file = document.getElementById("cv_file");

  if (finance_plan_file.files.length == 0) {
    $("#errorMessages").css("border", "solid 1px red");
    $("#errorMessages").css("padding", "1%");
    var fileErrorMessage = $("<h5></h5>").text("Palun lisage finantsprognooside fail");
    $("#errorMessages").append(fileErrorMessage);
    $("#data-tab").trigger("click");
    return;
  }

  if (cv_file.files.length == 0) {
    $("#errorMessages").css("border", "solid 1px red");
    $("#errorMessages").css("padding", "1%");
    var fileErrorMessage = $("<h5></h5>").text("Palun lisage CV fail");
    $("#errorMessages").append(fileErrorMessage);
    $("#data-tab").trigger("click");
    return;
  }

  if (business_plan_file.files.length != 0 && finance_plan_file.files.length != 0 && cv_file.files.length != 0) {
    // triggerib done tab
    $("#result-tab").tab("show");
    $("#cv-li").addClass("d-none");
    $("#finance-li").addClass("d-none");
    $("#business-li").addClass("d-none");
    $("#data-li").addClass("d-none");
    $("#next_btn_data2").attr("hidden",true);
  } else {
    // ainult äriplaani osa väljad
    var div = document.getElementById("collapse2");
    var allInputs = $(div).find("input:text, textarea"); //  Valime ainult input type text ja textarea
    var allLabels = $("#collapse2 label");
    console.log(allInputs.length);
    for (let index = 0; index < allLabels.length; index++) {
      console.log(index + allLabels[index].outerText);
      console.log(index + allInputs[index].name);
    }

    // kasutatud set, sest 1 labeli all võib olla mitu input välja
    var errorMessageArray = new Set();

    // kontrollime igat sisestuse välja
    $.each(allInputs, function (index, value) {
      var originalValue = value.value;
      var trimmedValue = String(originalValue.trim());
      if (trimmedValue.length < 10 && trimmedValue != "Kustuta") {
        if (allInputs[index].name == "business_product_1") {
          errorMessageArray.add(String(allLabels[14].outerText));
        } else if (allInputs[index].name == "business_product_2") {
          errorMessageArray.add(String(allLabels[16].outerText));
        } else if (allInputs[index].name == "business_competitor_5") {
          errorMessageArray.add(String(allLabels[21].outerText));
        } else if (!value.name.includes("cell")) {
          // kui pole tabel-input, siis võtab eelseisva labeli teksti
          var label = $(value).prev("label");
          errorMessageArray.add(label.text());
        } else if (value.name.includes("business_marketing_cell[]")) {
          errorMessageArray.add(String(allLabels[27].outerText));
        } else if (value.name.includes("business_marketing_cell_2[]")) {
          errorMessageArray.add(String(allLabels[28].outerText));
        } else if (value.name.includes("business_action_cell[]")) {
          errorMessageArray.add(String(allLabels[30].outerText));
        } else if (value.name.includes("business_action_cell_2[]")) {
          errorMessageArray.add(String(allLabels[31].outerText));
        } else if (value.name.includes("business_action_cell_3[]")) {
          errorMessageArray.add(String(allLabels[33].outerText));
        } else if (value.name.includes("business_settlement_cell[]")) {
          errorMessageArray.add(String(allLabels[48].outerText));
        } else if (value.name.includes("business_settlement_cell_2[]")) {
          errorMessageArray.add(String(allLabels[49].outerText));
        }
      } // if input liiga lühike lõpp
    }); // foeach input lõpp

    // KAS SUBMIT VÕI MITTE

    if (errorMessageArray.size == 0) {
      //kui korras submitime
      // submiti tegemine käsitsi

      $("#result-tab").tab("show");
      $("#cv-li").addClass("d-none");
      $("#finance-li").addClass("d-none");
      $("#business-li").addClass("d-none");
      $("#data-li").addClass("d-none");

      $("#next_btn_data2").click(function () {
        $("#submit").trigger("click");
      });
      
    } else {
      
      // täidame errorMessages divi
      $("#errorMessages").css("border", "solid 1px red");
      $("#errorMessages").css("padding", "1%");

      var title = $("<h5></h5>").text("Palun vaadake üle:");
      $("#errorMessages").append(title);
      errorMessageArray.forEach((element) => {
        var message = $("<li></li>").text(element);
        $("#errorMessages").append(message);
        $("#data-tab").trigger("click");
      });
      allInputs = [];
      errorMessageArray = [];
    }
  }
} // Avalduse submit lõpp

$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
