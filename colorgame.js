document.addEventListener('DOMContentLoaded', function() {
    // Definir variables y configuraciones iniciales

    const paletas_click = document.querySelectorAll('.square'); //CONSTANTE PARA EL CONFETI 

    let colorsArray = [];
    let pickedColor;
    let rgb = document.querySelector('#colorDisplay');
    let display = document.querySelector('#message');
    let backh1 = document.querySelector('#h1');

    // Función para generar colores aleatorios
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

    // Función para actualizar la paleta de colores
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

        // Seleccionar un color aleatorio como objetivo cada vez que se actualice la paleta
        pickedColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        rgb.textContent = pickedColor.toUpperCase(); // Actualizar el color mostrado
    }

    // Función para iniciar la página
    function initPage() {
        //BOTON PLAY AGAIN
        var btnPlayAgain = document.querySelector('#reset');
        btnPlayAgain.addEventListener('click', function() {
            enableClicks();
            backh1.style.backgroundColor = '#232323'
            display.textContent = '';
            if (btnHard.classList.contains('selected')) {
                colorsArray = generateRandomColors(6);
            } else {
                colorsArray = generateRandomColors(3);
            }
            updatePalette();
        });

        //BOTON HARD
        var btnHard = document.querySelector('#hard')
        btnHard.addEventListener('click', function() {
            stopConfetti();
            enableClicks();
            btnHard.classList.add('selected');
            btnEasy.classList.remove('selected');
            colorsArray = generateRandomColors(6);
            display.textContent = '';
            var paletas_hard = document.querySelectorAll('.square');
            for(let i=3; i< paletas_easy.length ; i++){
                paletas_hard[i].style.display = 'block';
            }
            updatePalette();
        });

        //BOTON EASY
        var paletas_easy = document.querySelectorAll('.square');
        display.textContent = '';
        var btnEasy = document.querySelector('#easy')
        btnEasy.addEventListener('click', function() {
            stopConfetti();
            enableClicks();
            btnHard.classList.remove('selected');
            btnEasy.classList.add('selected');
            colorsArray = generateRandomColors(3); // Generar 3 nuevos colores
            for(let i=3; i< paletas_easy.length ; i++){
                paletas_easy[i].style.display = 'none';
            }
            updatePalette(); // Actualizar los colores de la paleta
        });

        // Generar los colores iniciales y actualizar la paleta
        if (btnHard.classList.contains('selected')) {
            colorsArray = generateRandomColors(6);
            enableClicks();
        } else {
            colorsArray = generateRandomColors(3);
            for(let i = 3; i < paletas.length; i++){
                paletas[i].style.display = 'none';
            }
            enableClicks();
        }
        updatePalette();

        // Lógica del juego
        let paletas = document.querySelectorAll('.square');
        
        for (let i = 0; i < paletas.length; i++) {
            paletas[i].addEventListener('click', function() {
                var clickColor = paletas[i].style.backgroundColor;
                if (clickColor === pickedColor) {
                    cambiarColores(clickColor);
                } else {
                    paletas[i].classList.add('hidden');
                    display.textContent = 'TRY AGAIN';
                    paletas[i].style.visibility = 'hidden'
                }
            });       
        }
    }

    // Llamar a la función para iniciar la página después de configurar todo
    initPage();

    //SI EL USUARIO GANA EL JUEGO SE EJECUTA ESTA FUNCION 
    function cambiarColores(color) {
        let paletas = document.querySelectorAll('.square');
        for (let i = 0; i < paletas.length; i++) {
           
            paletas[i].classList.remove('hidden')
            paletas[i].style.visibility = 'visible'
            paletas[i].style.backgroundColor = color;

        }
        celebratoryConfetti(color);
        disableClicks();
        backh1.style.backgroundColor = color;
        display.textContent = 'CORRECT';
    }

    // Función para lanzar serpentinas de celebración
    let confettiTimeout; // Variable para almacenar el temporizador de las serpentinas

    // Función para lanzar serpentinas de celebración
    function celebratoryConfetti(color) {
    const confettiCount = 50; // Número de serpentinas a lanzar

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = color; // Se establece dinámicamente el color de las serpentinas
        document.body.appendChild(confetti);

        // Posición aleatoria en la pantalla
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.animationDelay = Math.random() * 2 + 's'; // Retraso aleatorio en la animación
    }
}

    
    // Función para detener las serpentinas
    function stopConfetti() {
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach(confetti => confetti.classList.add('stop-confetti'));
    
        // Eliminar las serpentinas después de 5 segundos
        confettiTimeout = setTimeout(() => {
            confettiElements.forEach(confetti => confetti.remove());
        }, 5000);
    }
    
    // Reinicia el efecto de las serpentinas cuando se inicia un nuevo juego
    document.querySelector('#reset').addEventListener('click', function() {
        clearTimeout(confettiTimeout); // Detener el temporizador de las serpentinas
        stopConfetti(); // Detener las serpentinas actuales
        if (btnHard.classList.contains('selected')) {
            colorsArray = generateRandomColors(6);
        } else {
            colorsArray = generateRandomColors(3);
        }
        pickedColor = colorsArray[3]; // Actualizamos pickedColor después de generar los colores
        rgb.textContent = pickedColor; // Actualizamos el color mostrado
        updatePalette(); // Actualizar los colores de la paleta
    });
    
    // Función para desactivar clics en las cajas
    function disableClicks() {
        paletas_click.forEach(caja => {
            caja.style.pointerEvents = 'none'; // Desactivar clics
        });
    }

    // Función para activar clics en las cajas
    function enableClicks() {
        paletas_click.forEach(caja => {
            caja.style.pointerEvents = 'auto'; // Activar clics
        });
    }
   

});
