$( document ).ready(function() {
        // When the languages dropdown changes, load all applicable voices
    $('#languages').bind('change', function(event) {
        $('#voices').empty();

        var request = {
            language: $("#languages").val()
        }
        Pace.track(function() {
            $.post('/translate/voices', request, function(response) {
                $.each(response.voices, function(key, voice) {
                    if(voice.name.startsWith(request.language)) {
                        
                        var name = voice.name.replace(request.language + '-', '');
                        var gender = voice.ssmlGender.toLowerCase().charAt(0).toUpperCase() + voice.ssmlGender.toLowerCase().slice(1);
                        
                        $('#voices').append( $('<option></option>').val(voice.name).html(name + ' (' + gender + ')') )
                        $('#flag').attr("src", 'images/flags/' + request.language + '.png');
                    }
                });         
            });    
        });
    });

    // Load the default list.
    $('#languages').trigger('change');

    // Perform the translation and play the audio
    $('form#translate').bind('submit', function(event){
       event.preventDefault(); 
       var request = { 
           text: $("textarea").val(),
           language: $("select#languages").val(),
           voice: $("select#voices").val()
       }

       Pace.track(function() {
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
});
