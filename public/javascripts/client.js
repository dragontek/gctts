// A $( document ).ready() block.
$( document ).ready(function() {
    
    
    $('form#translate').bind('submit', function(event){
       event.preventDefault(); 
       var request = { 
           text: $("textarea").val(),
           voice: $("select").val()
       }
       $.post('/translate', request, function(response) {
            sourceUrl = 'data:audio/mp3;base64,' + response.data;

           var audio = $("#player");      
           $("#mp3_src").attr("src", sourceUrl);

           audio[0].pause();
           audio[0].load();//suspends and restores all audio element
       
           //audio[0].play(); changed based on Sprachprofi's comment below
           audio[0].oncanplaythrough = audio[0].play();            
       });

    });
});
