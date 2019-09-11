var ANTrun=false
var ANTfn
var ANTtimeout
function ANTsubscribe(fn) {
  console.log("ANTsubscribe()");
  ANTfn=fn
  ANTrun=true
  ANTupdate()
}

function ANTunsubscribe() {
  console.log("ANTunsubscribe()");
  ANTrun=false
}

function ANTupdate() {
  console.log("ANTupdate()5");
  if(ANTrun==true) {
    var xmlhttp = new XMLHttpRequest();
    //xmlhttp.withCredentials = true;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        console.log('XMLHttpRequest.DONE:'+xmlhttp.responseText);
        ANTfn(xmlhttp.responseText)
      }
    }
    var url='http://localhost:8081/';
    console.log('GET '+url);
    xmlhttp.open('GET', url, true);
    xmlhttp.send(null);
    window.clearTimeout(ANTtimeout);
    ANTtimeout=window.setTimeout(ANTupdate, 1000*30);
  }
}
