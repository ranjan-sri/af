
(function() {
 fetch("https://615485ee2473940017efaed3.mockapi.io/assessment")
 .then(response => {
          if(response.status >=200 && response.status <=299) {
            return response.json();
          } else {
              console.log(response);
              throw Error(response.statusText);
          }
        })
 .then( json => {
//   console.log(json);
   render(json);
}
)
.catch((error) => {
    alert(error);
    // document.getElementById("error").innerHTML = error;
});


}());

function render(json) {
    
    var theScriptHTML =document.getElementById("usersListTemplate").innerHTML;
    var theTemplate = Handlebars.compile(theScriptHTML);
    var data = { users: json};
    
    var theCompiledHtml = theTemplate(data);
   // console.log(theCompiledHtml);
   document.getElementById('root').innerHTML += theCompiledHtml;
}


