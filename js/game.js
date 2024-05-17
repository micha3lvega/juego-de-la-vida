// Variables globales
let ctx;
let canvas;
const fps = 30;

// Pixeles
const canvasX = 500; // pixels ancho
const canvasY = 500; // pixels alto
let tileX, tileY;

// Variables relacionadas con el tablero de juego
const filas = 100;
const columnas = 100;

const negro = '#000000';
const blanco = '#FFFFFF';

let celulas = inicializarCelulas(filas, columnas);

class Celula {
    constructor(valorX, valorY, estado) {
        this.posicionX = valorX;
        this.posicionY = valorY;
        this.isAlive = estado === 1; // Vivo 1, Muerto = 0
    }
}

function init() {
    // Asociamos el canvas
    canvas = document.getElementById('pantalla');
    ctx = canvas.getContext('2d');

    // Ajustamos el tamaño del canvas
    canvas.width = canvasX;
    canvas.height = canvasY;

    // Calculamos los tamaños de los lados rectangulos
    tileX = Math.floor(canvasX / columnas);
    tileY = Math.floor(canvasY / filas);

    // Añadir evento de clic al canvas
    canvas.addEventListener('click', toggleCelda);

    iniciarTablero();

    // Llamar el metodo mutar un numero N dado según los fps en un segundo
    setInterval(mutar, 1000 / fps);
}

function mutar() {
    // Actualiza el estado de las celulas
    const nuevasCelulas = mutacion();

    // Actualizar tablero
    redibujarTablero(nuevasCelulas);
}

function mutacion() {
    const nuevasCelulas = inicializarCelulas(filas, columnas);

    // Recorrer las filas y columnas
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            nuevasCelulas[x][y] = calculaNuevoEstado(x, y);
        }
    }

    return nuevasCelulas;
}

function iniciarTablero() {
    // Recorrer las filas y columnas del tablero
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            const celula = new Celula(x, y, Math.floor(Math.random() * 2));
            dibujarCelda(x * tileX, y * tileY, tileX, tileY, celula.isAlive ? blanco : negro);
            celulas[x][y] = celula;
        }
    }
}

function calculaNuevoEstado(x, y) {
    const celula = celulas[x][y];
    const celulasVecinasVivas = contarVecinoVivos(celula);

    const nuevoEstado = calcularNuevoEstado(celula.isAlive, celulasVecinasVivas);

    return new Celula(x, y, nuevoEstado ? 1 : 0);
}

function contarVecinoVivos(celula) {
    let contadorDeCelulasVivas = 0;

    // Recorrer los vecinos en el eje X e Y
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const xVecino = (celula.posicionX + i + columnas) % columnas;
            const yVecino = (celula.posicionY + j + filas) % filas;

            if (celulas[xVecino][yVecino].isAlive) {
                contadorDeCelulasVivas++;
            }
        }
    }

    return contadorDeCelulasVivas;
}

function calcularNuevoEstado(isAlive, celulasVecinasVivas) {
    if (isAlive) {
        return celulasVecinasVivas === 2 || celulasVecinasVivas === 3;
    } else {
        return celulasVecinasVivas === 3;
    }
}

function redibujarTablero(nuevasCelulas) {
    // Limpiar el tablero
    limpiarTablero();

    // Recorrer las filas y columnas
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            const celula = nuevasCelulas[x][y];
            dibujarCelda(x * tileX, y * tileY, tileX, tileY, celula.isAlive ? blanco : negro);
            celulas[x][y] = celula;
        }
    }
}

function inicializarCelulas(filas, columnas) {
    return new Array(filas).fill(null).map(() => new Array(columnas));
}

function dibujarCelda(ejeX, ejeY, tamX, tamY, color) {
    ctx.fillStyle = color;
    ctx.fillRect(ejeX, ejeY, tamX, tamY);
}

function limpiarTablero() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleCelda(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tileX);
    const y = Math.floor((event.clientY - rect.top) / tileY);

    celulas[x][y].isAlive = !celulas[x][y].isAlive;
    redibujarTablero(celulas);
}

window.onload = init;
