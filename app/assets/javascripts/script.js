var totalCount = 10;
var fixtotalcount = 10;
var storestr = "";
var storephrase = "";
var debugtext = "";
var debug = false
$(document).ready(function(){
  if(debug==false){
    $("#debug").hide();
  }
  debugs("shown = " + getCookie("shown"));
  if(getCookie("shown")!=""){
    storestr = getCookie("shown");
    storephrase = getCookie("shownphrase");
    var arr = storephrase.split(",");

    for(var i=0;i<arr.length;i++){
      getNewPhrase(arr[i]);
    }
  }
  else{
    displayTotalCount();
  }

});



function getNewPhrase(p_val){

  if(totalCount==0){
    alert("No more Phrase pending from database");
    return false;
  }
  else{
    if(p_val){
      $("#phrase-box").append(generateDiv(p_val));
      totalCount--;
      displayTotalCount();
    }

    else{
      $.ajax({
        url: '/random_phrase/',
        type: "GET",
        dataType: "JSON",
        data: { existing_phrase: JSON.parse("[" + storestr + "]") },
        success: function(response){
          if(response) {
            $("#phrase-box").append(generateDiv(response.phrase ) );
            storeNumberInCookies(Number(response.id));
            storePhraseInCookies(String(response.phrase));
            totalCount--;
            displayTotalCount();
          }
        }
      });
    }
    
  }
}

function clearPhrase(){
  //On clear we do not need to put anything
    totalCount = fixtotalcount;
    displayTotalCount();
    $("#phrase-box").empty();
    storestr = "";
    storephrase = "";
    setCookie("shown","");
    setCookie("shownphrase","");
}

/* internal classes */
function debugs(p_text){
  debugtext +=p_text+ "\n";
  $("#debug").text(debugtext);
}


function storeNumberInCookies(p_number){
  if(storestr=="")
    storestr = String(p_number);
  else
    storestr+=","+String(p_number);
  setCookie("shown",storestr);
}
function storePhraseInCookies(p_phrase){
  if(storephrase=="")
    storephrase = String(p_phrase);
  else
    storephrase+=","+String(p_phrase);
  setCookie("shownphrase",storephrase);
}

function isNumberAvailable(p_findnumber){
  var arr = storestr.split(",");
  debugs("arr = "+ arr.toString());
  for(var i=0;i<arr.length;i++){
    if(Number(arr[i])==Number(p_findnumber))
      return false;
  }
  return true;
}

function displayTotalCount(){
  $("#left_count").html(totalCount);
}

function generateDiv(p_text){
  return  '<div class="panel panel-primary"><div class="panel-body">' + p_text + '</div></div>';
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
