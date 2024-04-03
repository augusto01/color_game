let colors = [
    'rgb(240, 14, 128)', 
    'rgb(38, 249, 5)', 
    'rgb(5, 23, 249)', 
    'rgb(249, 5, 234)',
    'rgb(5, 249, 246)',
    'rgb(249, 149, 5)'
];

let paletas = document.querySelectorAll('.square');

// Creamos una copia de los colores para no modificar el original
let coloresRestantes = colors.slice();

for (let i = 0; i < paletas.length; i++) {
    // Seleccionamos un color aleatorio de los colores restantes
    let randomIndex = Math.floor(Math.random() * coloresRestantes.length);
    let colorSeleccionado = coloresRestantes[randomIndex];
    
    // Asignamos el color seleccionado al fondo del elemento .square
    paletas[i].style.backgroundColor = colorSeleccionado;
    
    // Removemos el color seleccionado de la lista de colores restantes
    coloresRestantes.splice(randomIndex, 1);
    
    // Si no quedan más colores disponibles, volvemos a comenzar con todos los colores
    if (coloresRestantes.length === 0) {
        coloresRestantes = colors.slice();
    }
}

let pickedColor = colors[3];

let rgb = document.querySelector('#colorDisplay');
let display = document.querySelector('#message')
rgb.textContent = pickedColor;

/**Evento clicks de la paletas */
for (let i = 0; i < paletas.length; i++){
    paletas[i].addEventListener('click', function(){
        var clickColor = this.textContent;
        if (clickColor === pickedColor){
            display.textContent = 'YOU WIN';
        } else {
            display.textContent = 'TRY AGAIN';
        }
    });
}
