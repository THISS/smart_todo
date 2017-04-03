// en-CA or en-AU
$(() => {

  var final_transcript = '';
  var recognizing = false;
  var ignore_onend;
  var start_timestamp;
  var recognition;
  const whatTodo = $("#what-todo-box");
  const flash = $("#flash-message");


  function showInfo(string) {
    flash.css("display", "flex");
    flash.text(string);

    setTimeout(() => {
      flash.text("");
      flash.css("display","none");
    }, 2000);
  }

  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
    };
  }

  recognition.onerror = function(event) {

    if (event.error == 'no-speech') {
      showInfo("gotta start talkin'");
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      showInfo("No microphone detected there... try typing");
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo("Our timing is almost as good as yours... check your privacy settings for media");
      } else {
        showInfo("sorry, we are not allowed to record your voice because you respect your privacy");
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }

    if (!final_transcript) {
      showInfo("press the button and start talking");
      return;
    }

    // if (window.getSelection) {
    //   window.getSelection().removeAllRanges();
    //   var range = document.createRange();
    //   range.selectNode(document.getElementById('final_span'));
    //   window.getSelection().addRange(range);
    // }
    // get our final transcript and submit it
    whatTodo.val(final_transcript);
    var e = $.Event('keyup');
    e.which = 13; // Enter Key
    whatTodo.trigger(e);
    $(".mic").removeClass("mic-clicked");
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    whatTodo.val(interim_transcript);
  };

  function upgrade() {
    showInfo("You need to upgrade to a newer browser to use the mic, silly");
  }

  function startButton(event) {
    // if already started stop it
    if (recognizing) {
      recognition.stop();
      return;
    }

    final_transcript = "";
    recognition.lang = "en-CA";
    // Start it up
    whatTodo.val("");
    recognition.start();
    ignore_onend = false;
    start_timestamp = Date.now();
  }

  $(".mic").on("click", function(e) {
    $(this).toggleClass("mic-clicked");
    startButton(e);
  });
});