document.addEventListener('DOMContentLoaded', function() {
    // Definir variables y configuraciones iniciales
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
        } else {
            colorsArray = generateRandomColors(3);
            for(let i = 3; i < paletas.length; i++){
                paletas[i].style.display = 'none';
            }
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
                    display.textContent = 'TRY AGAIN';
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
            paletas[i].style.backgroundColor = color;
        }
        backh1.style.backgroundColor = color;
        display.textContent = 'CORRECT';
    }
});
