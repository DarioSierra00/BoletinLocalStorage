//a) Utiliza JavaScript para capturar los valores del formulario y agregar un nuevo usuario a una lista visible en la página. 
//Cada usuario en la lista debe incluir un botón "Borrar" al lado de su nombre, dirección y dirección de correo electrónico.

let nombre = document.getElementById('name');
let email = document.getElementById('email');
let direccion = document.getElementById('address'); //Recupero los inputs
let lista = document.getElementById('userList');//Recupero la lista <ul>
let enviar = document.querySelector('button'); //Recupero el boton de agregar usuario
let usuarios = localStorage.getItem('users') == null ? [] : JSON.parse(localStorage.getItem('users')); //Si el localStorage de users es null, le asigno un array a usuarios, y sino le asigno lo que tenga el localStorage pero como objeto
let usuariosCopia = localStorage.getItem('users') == null ? [] : localStorage.getItem('users');//Si el localStorage de users es null, le asigno un array a usuariosCopia, y sino lo guardo como String, ya que el localStorage.getItem() devuelve un String


enviar.addEventListener('click', function(){//Cuando haga click en agregar usuario (enviar)
    if(nombre.value != "" && direccion.value != "" && email.value != ""){//Se comprueba que no haya campos vacíos
        let persona = {nombre:nombre.value,direccion: direccion.value, email: email.value} //Creo un objeto con los valores introducidos en los input
        if(userUnique(persona)){ //Compruebo que la persona sea única
            usuarios.push(persona); //Si es unica, le hará un push de la persona a la array de usuarios
            localStorage.setItem('users', JSON.stringify(usuarios)); //A la key de users le asigno el valor del array con JSON pasado a string
        }
    }
});

function mostrarUsers(){
    usuarios.forEach(element => {//Recorro el array de usuarios
        let li = document.createElement('li'); // Cada vez que recorro un nuevo usuario le creo un li
        li.appendChild(document.createTextNode(`${element.nombre} : ${element.direccion} : ${element.email}`)); // Al li creado le asigno un texto que tendrá la información del usuario

        let del = document.createElement('button'); // Creo el boton de eliminar
        del.setAttribute('id', 'del'); // Le asigno el id = 'del'
        del.textContent = "Borrar"; // Le pongo el textContent para que aparezca el texto de Borrar
        let mod = document.createElement('button'); // Creo el boton de modificar
        mod.textContent = "Modificar"; // Le pongo el textContent para que aparezca el texto de Modificar
        mod.setAttribute('id', 'mod'); //Le asigno  el id = 'mod'

        li.appendChild(mod); // Le añado el boton de modificar, detrás de la información del usuario
        li.appendChild(del); // Le añado el boton de borrar, detrás del boton de modificar
        lista.appendChild(li); // A la lista le añado el li, con todo lo que tiene dentro que le acabo de añadir
    });
};


function userUnique(usuario){ // Esta función me comprueba si hay algun usuario identico al que le pasamos por parametro
    let unico = true; 
    if(usuariosCopia.indexOf(JSON.stringify(usuario)) != -1){ // Lo inicializo en true para que compruebe que si hay un usuario igual que el que le paso por parametros nos dará diferente a -1
        //Y asignaremos a unico false
        unico = false;
    }
    return unico;
    
};

mostrarUsers();// Muestro todos los usuarios
borrar();
modificar();

function borrar(){
let borrar = document.querySelectorAll('#del'); //Recupero todos los botones con el id del en una array

for(let i = 0; i < borrar.length; i++){// Recorro el array de botones Borrar
    borrar[i].addEventListener('click', function(event){ // Cuando haga click en alguno de los botones que hay en el array (Los de borrar). Le pongo el event para acceder al padre del elemento
        event.target.parentNode.remove(); // Con esto eliminamos el padre del boton el cual le hemos hecho click, en nuestro caso nos borraria el li correspondiente ya que el padre del elemento boton es el li
        usuarios.splice(i,1); // Borra en la array la posicion del usuario que queremos borrar 
        localStorage.setItem('users',JSON.stringify(usuarios));
    })
}}


function modificar(){
let actualizar = document.querySelectorAll('#mod');//Recupero todos los botones de modificar en un array

for(let i = 0; i < actualizar.length; i++){ //Recorro el array de los botones
    actualizar[i].addEventListener('click', function(event){ //Cuando haga click en alguno de los botones del array, (Los de modificar), Le pongo el event para acceder al padre del elemento, que en nuestro caso será el <li>
        let usuario = usuarios[i]; // Guardo el usuario que quiero modificar en una variable
        event.target.parentNode.remove(); // Borro el <li> correspondiente al botón que he clickado
        usuarios.splice(i,1); //Borro del array la posición del usuario que quiero borrar, splice nos borrará 1 desde la posición i

        nombre.value = usuario.nombre;
        direccion.value = usuario.direccion; //Le asigno a los input cada valor correspondiente con el usuario que queremos borrar
        email.value = usuario.email;

    })
}}

