var colorsArray = [];

function generateRandomColors(num) {
    var tempArray = [];
    for (var i = 0; i < num; i++) {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        var rgbColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        tempArray.push(rgbColor);
    }
    return tempArray;
}

document.addEventListener('DOMContentLoaded', function() {
    //PLAY AGAIN
    var btnPlayAgain = document.querySelector('#reset');
    btnPlayAgain.addEventListener('click', function() {
        backh1.style.backgroundColor = '#232323'
        colorsArray = generateRandomColors(6); // Generar 6 nuevos colores
        pickedColor = colorsArray[3]; // Actualizamos pickedColor después de generar los colores
        rgb.textContent = pickedColor; // Actualizamos el color mostrado
        updatePalette(); // Actualizar los colores de la paleta
    });

    colorsArray = generateRandomColors(6); // Generar los colores iniciales
    pickedColor = colorsArray[3]; // Asignamos un color inicial
    rgb.textContent = pickedColor; // Actualizamos el color mostrado
    updatePalette(); // Actualizar los colores de la paleta inicialmente
});

function updatePalette() {
    let paletas = document.querySelectorAll('.square');
    let coloresRestantes = colorsArray.slice();

    for (let i = 0; i < paletas.length; i++) {
        let randomIndex = Math.floor(Math.random() * coloresRestantes.length);
        let colorSeleccionado = coloresRestantes[randomIndex];
        
        paletas[i].style.backgroundColor = colorSeleccionado;
        
        coloresRestantes.splice(randomIndex, 1);
        
        if (coloresRestantes.length === 0) {
            coloresRestantes = colorsArray.slice();
        }
    }
}

let pickedColor ;
let rgb = document.querySelector('#colorDisplay');
let display = document.querySelector('#message')
let backh1= document.querySelector('#h1')
rgb.textContent = pickedColor;


/**Evento clicks de la paletas */
let paletas = document.querySelectorAll('.square');

for (let i = 0; i < paletas.length; i++) {
    paletas[i].addEventListener('click', function() {
        var clickColor = paletas[i].style.backgroundColor;
        if (clickColor === pickedColor) {
            //es decir si acerto el color
           cambiarColores(clickColor);
        } else {
            display.textContent = 'TRY AGAIN';
        }
    });
}

//FUNCION QUE CAMBIA LOS COLORES A LA PALETA DE COLORES
function cambiarColores(color){
    for (let i = 0; i < paletas.length; i++) {
        paletas[i].style.backgroundColor = color;
    }
    backh1.style.backgroundColor = color;
    display.textContent = 'CORRECT';
}



    for (let i = 0; i < paletas.length; i++) {
        paletas[i].addEventListener('click', function() {
            var clickColor = paletas[i].style.backgroundColor;
            if (clickColor === pickedColor) {
                //es decir si acerto el color
               cambiarColores(clickColor);
            } else {
                display.textContent = 'TRY AGAIN';
            }
        });
    }