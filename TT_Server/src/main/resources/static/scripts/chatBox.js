var aux = window.location + "get/";

//POST -> Player
function sendPlayer(playerName, callback){
    console.log(playerName);
    $.ajax({
        method: "POST",
        url: aux,
        data: playerName,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        // name returned
        // console.log(data.name);
        player = data.name;

        // lobby returned
        console.log(data.lobby);
        lobby = data.lobby;
        
        // Rellenamos lon la interfaz de chat
        let msgAction = $("#messageAction");
        msgAction.empty();
        msgAction.append('<input name"usermsg" type="text" id="usermsg" size="63"/>');
        msgAction.append('<input name"submitmsg" type="button" id="submitmsg" value="Send"/>');

        // Vaciamos el user data y ponemos un display del nombre
        let userData = $("#userdata");
        userData.empty();
        userData.append('<p><b>'+ playerName +'</b></p>');

        // Programamos el evento pulsar el submit
        $('#submitmsg').click( function () {
            let plainText = $("#usermsg").val();
            var now = new Date();
            now = now.toLocaleString();

            var msg = {
                date: now,
                text: plainText,
                user: player,
            }
    
            if(plainText != ''){
                sendMassage(msg, pingServer);
            }
            //Borramos el field text
            $("#usermsg").val('');
        });

        //Veces por segundo que mandara su estado el cliente
        refreshRate = 1;

        //Creamos el timer
        timer = setInterval(function () {
            pingServer();
        }, refreshRate * 1000)

        // hacemos el callback
        callback();
    })

}

//  POST -> MENSAJE
function sendMassage( msg, callback) {
    $.ajax({
        method: "POST",
        url: aux + lobby,
        data: JSON.stringify(msg),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        callback();
    })
}

// GET -> MENSAJES
// De paso decimos al server que no nos hemos desconectado y nos bajamos los mensajes que hayan
function pingServer()
{
    $.ajax({
        url: aux + lobby + '/' + player,
    }).done(function (info) {
        console.log("Limpio");
        let chat = $("#chatbox");
        let out;
        chat.empty();
        for (i = 0; i < info.length; i++){
            out = "<p>"
            out += info[i].date + "-" + info[i].user + ": " + info[i].text;
            out += "</p>"
            chat.append(out);
        }
    })
}

$(document).ready(function () {

    var userData = $("#userdata");
    var setName = $("#setName");
    var nick = $("#nick");

    var msgAction = $('#messageAction');
    var submit = $('#submitmsg');
    var msg = $('#usermsg');
    var chatBox = $('#chatbox');
    
    //player name
    var player;
    
    // lobby id
    var lobby;

    // timer
    var timer;

    //Boton asociado al addPlayer()
    setName.click( function () {
        let aux = nick.val();
        player = aux;
        nick.val("");

        sendPlayer(aux, pingServer);
    });
	
});
