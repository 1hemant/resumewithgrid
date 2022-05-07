$(function () {
  $("#header").load("header.html");
  $("#objective").load("objective.html");
  $("#synopsis").load("synopsis.html");
  $("#skills").load("skills.html");
  $("#projectDetails").load("projectDetails.html");
  $("#footer").load("footer.html");

  // //////////////////// Sticky Header Start //////////////////////
  // ///////////////////////////////////////////////////////////////
  // window.onscroll = function () { myFunction() };

  // var header = document.getElementById("header");
  // var sticky = header.offsetTop;

  // function myFunction() {
  //     if (window.pageYOffset > sticky) {
  //         header.classList.add("sticky");
  //     } else {
  //         header.classList.remove("sticky");
  //     }
  // }
  // //////////////////// Sticky Header End ///////////////////////
  // //////////////////////////////////////////////////////////////

  // //////////////////// Fetch projectDetails JSON Start //////////////////////////
  // ///////////////////////////////////////////////////////////////
  $.getJSON("./js/projectDetails.json", (data) => {
    var header = ["Organization", "Tenure", "Designation/Role"];
    var org = [];
    var ten = [];
    var role = [];

    //   tr.appendChild(fragment);
    //   table.appendChild(tr);
    //////////Loop to get work duration table data start////////////
    ////////////////////////////////////////////////////////////////
    $.each(data, function (key, value) {
      org.push(value.name);
      role.push(value.role);
      var options = { year: "numeric", month: "short" };
      var doj = new Date(
        `${value.doj.mm} ${value.doj.dd} ${value.doj.yyyy}`
      ).toLocaleDateString("en-IN", options);
      if (value.dor.mm != "") {
        var dor = new Date(
          `${value.dor.mm} ${value.dor.dd} ${value.dor.yyyy}`
        ).toLocaleDateString("en-IN", options);
      } else {
        var dor = "Till now";
      }
      ten.push(`${doj} -- ${dor}`);
    });
    /////////Loop to get work duration table data end///////////////
    ////////////////////////////////////////////////////////////////

    // //////////////////// Fetch JSON End //////////////////////
    // ///////////////////////////////////////////////////////////////

    // //////////////////// Load Table data start //////////////////////
    // ///////////////////////////////////////////////////////////////
    var innerHtmlData = "";
    for (var i = 0, x = header.length; i < x; i++) {
      innerHtmlData += `<th>${header[i]}</th>`;
    }
    for (var i = 0, x = org.length; i < x; i++) {
      innerHtmlData += `<tr><td>${org[i]}</td><td>${ten[i]}</td><td>${role[i]}</td></tr>`;
    }
    document.getElementById("workDurationTable").innerHTML = innerHtmlData;
  });
  // //////////////////// Load Table data End //////////////////////
  // ///////////////////////////////////////////////////////////////
  // //////////////////// Fetch Skills JSON Start ////////////////
  // ///////////////////////////////////////////////////////////////
  var skillPrime = document.getElementById("primarySkillsData");
  var skillSecond = document.getElementById("secondarySkillsData");
  var fragment = document.createDocumentFragment();
  var ulPrime = document.createElement("ul");
  var ulSecond = document.createElement("ul");
  
  var primary = [],
    secondary = [];
  $.getJSON("./js/skills.json", (data) => {
    primary = data[0].primary;
    secondary = data[1].secondary;
    var primarySkillFrag = getSkillData(primary);
    ulPrime.appendChild(primarySkillFrag);
    skillPrime.appendChild(ulPrime);
    var SecondarySkillFrag = getSkillData(secondary);
    ulSecond.appendChild(SecondarySkillFrag);
    skillSecond.appendChild(ulSecond);

  });
  function getSkillData(skill){ 
    for(var i = 0, x = skill.length; i < x; i++){
      element = document.createElement('li');
      anchor = document.createElement('a');
      anchor.appendChild(document.createTextNode(skill[i].name));
      anchor.setAttribute("href",skill[i].link);
      anchor.setAttribute("target","_blank");
      element.appendChild(anchor);
      fragment.appendChild(element);
    }
    return fragment;
  }
  // //////////////////// Fetch Skills JSON Start //////////////////
  // ///////////////////////////////////////////////////////////////
}); // Main function
