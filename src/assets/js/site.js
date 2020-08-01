// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {

    var fn = function () { $(".inputlbl", this).animate({ top: "-4px", right: "12px", opacity: 0.5 }, 500, function () { }); };
    var fnlbl = function () { $(this).animate({ top: "-4px", right: "12px", opacity: 0.5 }, 500, function () { }); };
    $(".txtbox-wrap").focusin(fn);
    $(".inputlbl").hover(fnlbl);

    $(".btnrego").click(function () {
        $(".rego").slideToggle();
     

    });
 
    $(".trigmsg").click(function () {
        $(".newchats").slideToggle();
    });
});