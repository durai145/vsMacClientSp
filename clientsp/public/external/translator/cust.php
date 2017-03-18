<script src='http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js' type='text/javascript'/>
<script type='text/javascript'>
$(document).ready(function(){
$.getScript('http://jquery-translate.googlecode.com/files/jquery.translate-1.3.2.min.js', function(){ //when the script is loaded
$.translate(function(){ //when the Google Language API is loaded
$.translate().ui('select', 'option') //generate dropdown


.change(function(){
$('#translateit').translate( 'en', { //revert to english first
not: 'select, pre'
})

.translate( 'en',  $(this).val(), {
not: 'select, pre',
async:  true,
toggle: true,
walk: false
});
})
 .val('English') //select English as default
 .appendTo('#nav'); //insert the dropdown to the page
});
});
});
</script>
<div id="nav"> </div>

<div id="translateit">
<div class="postbody">
post content
</div></div>


