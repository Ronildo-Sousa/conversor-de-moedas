$(document).ready(function () {  
    $("input:submit").on("click", function (e) { 
        e.preventDefault();
        var conversao = $(this).parent()[0][0]["name"];
        var numInserido = $(this).parent()[0][0].value;
        if (numInserido > 0 && numInserido.length > 0) {
            ajaxaResponse(conversao, numInserido, $(this));
        }
        else {
            var divResult = $(this).parents("article")[0].children[2];
            $(divResult).html("Erro ao converter !").css({
                "background" : "rgb(189, 1, 1)"
            }).fadeIn(300).fadeOut(4000, function(){
                $(divResult).css("background","rgb(117, 117, 117)");
            });
        }    
    });
});


function ajaxaResponse(conversao, valorDesejado, objeto) { 

   $.ajax({
        url: "https://economia.awesomeapi.com.br/json/" + conversao,
        beforeSend: function( xhr ) {
          xhr.overrideMimeType( "text/json; charset=x-user-defined" );
        }
      })
        .done(function( data ) {
            converter(data, valorDesejado, objeto);
        });
}
    
function converter(data, valorDesejado, objeto) {
    var valorDaMoeda = parseFloat(data[0]["high"]).toFixed(2);
    var valorRecebido = valorDesejado;
    var resultado = (valorDaMoeda * valorRecebido)
        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    var objdiv = objeto.parents("article")[0].children[2];

    $(objdiv).html(resultado).fadeIn();
}