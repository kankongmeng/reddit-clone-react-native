var protocol = location.protocol;
var slashes = protocol.concat("//");
var host = slashes.concat(window.location.host);

$(document).ready(function(){
    // Add maxlength() on all input fields which have a maxlength attribute
    $('input[maxlength]').maxlength();
    
    // When click on the NewPost button
    $('#toggleNewPostForm').click( function(e) {
        e.preventDefault(); // stops link from making page jump to the top
        e.stopPropagation(); // when you click the button, it stops the page from seeing it as clicking the body too
        $('#showNewPostForm').toggle();
    });
});
