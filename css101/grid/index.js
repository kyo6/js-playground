var game = {
  start: function () {
     this.setHandlers();
  },
  setHandlers: function () {
    $("#code")
      .on("keydown", function (e) {
        if (e.keyCode === 13) {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            game.check();
            $("#next").click();
            return;
          }

          var max = $(this).data("lines");
          var code = $(this).val();
          var trim = code.trim();
          var codeLength = code.split("\n").length;
          var trimLength = trim.split("\n").length;

          if (codeLength >= max) {
            if (codeLength === trimLength) {
              e.preventDefault();
              $("#next").click();
            } else {
              $("#code").focus().val("").val(trim);
            }
          }
        }
      })
      .on("input", game.debounce(game.check, 200))
      .on("input", function () {
        game.changed = true;
        $("#next").removeClass("animated animation").addClass("disabled");
      });
  },
  applyStyles: function () {
    var code = $("#code").val();
    console.log(code);
    let selector = "> :nth-child(1)";
    $("#garden " + selector).attr("style", code);
    if (!selector) {
      if (code) {
        $("#soil, #overlay").attr("style", code);
      } else {
        $("#soil, #overlay").attr("style", "");
      }
    }
  },

  check: function () {
    game.applyStyles();
  },

  debounce: function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
};


$(document).ready(function () {
  game.start();

  var d = document.documentElement.style;

  if (!("gridArea" in d)) {
    var warning = "当前浏览器不支持CSS Grid"
    // $("#editor, #level-counter, #instructions").hide();
    $("<div>" + warning + "</div>").insertAfter($("#editor"));
  }
});