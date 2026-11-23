
// FUNCIONES AUXILIARES 

// Muestra un mensaje en un párrafo de resultado de normal o de error
function mostrar(idResultado, mensaje, esError = false) {
  const p = document.getElementById(idResultado);
  p.textContent = mensaje;
  p.classList.toggle("error", esError);
}

// Lee un campo numérico, devuelve NaN si está vacío o no es válido
function leerNumero(idCampo) {
  const valor = document.getElementById(idCampo).value;
  return valor.trim() === "" ? NaN : Number(valor);
}

// menú superior
const tabs = document.querySelectorAll(".tab");
const secciones = document.querySelectorAll(".tarjeta");
const titulo = document.getElementById("titulo");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {

    tabs.forEach(t => t.classList.remove("activa"));
    secciones.forEach(s => s.classList.remove("visible"));

    // Activa la pestaña pulsada y muestra su sección
    tab.classList.add("activa");
    document.getElementById(tab.dataset.seccion).classList.add("visible");

    // Actualiza el título principal de la página
    titulo.textContent = tab.dataset.titulo;
  });
});

// cubo de un número
document.getElementById("btnCubo").addEventListener("click", function () {
  const n = leerNumero("cuboNumero");              // número ingresado

  if (isNaN(n)) {                                   // validación
    mostrar("resCubo", "Por favor ingresa un número válido.", true);
    return;
  }
  const cubo = Math.pow(n, 3);                      // n elevado al cubo
  mostrar("resCubo", "El cubo de " + n + " es: " + cubo);
});

// área de un triángulo
document.getElementById("btnTriangulo").addEventListener("click", function () {
  const base = leerNumero("triBase");               // base en metros
  const altura = leerNumero("triAltura");           // altura en metros

  if (isNaN(base) || isNaN(altura) || base < 0 || altura < 0) {
    mostrar("resTriangulo", "Ingresa base y altura válidas (mayores o iguales a 0).", true);
    return;
  }
  const area = (base * altura) / 2;                 // fórmula: (base × altura) / 2
  mostrar("resTriangulo", "El área en metros cuadrados del triángulo es: " + area);
});

// promedio de notas

// promedio a letra correspondiente
function obtenerLetra(promedio) {
  if (promedio <= 60) return "F";      
  if (promedio <= 70) return "D";      
  if (promedio <= 80) return "C";      
  if (promedio <= 90) return "B";      
  return "A";                          
}

document.getElementById("btnPromedio").addEventListener("click", function () {
  const nombre = document.getElementById("proNombre").value.trim(); // nombre del estudiante
  const n1 = leerNumero("proNota1");
  const n2 = leerNumero("proNota2");
  const n3 = leerNumero("proNota3");

  // validación de todos los campos deben estar llenos
  if (nombre === "" || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    mostrar("resPromedio", "Ingresa el nombre y las tres calificaciones.", true);
    mostrar("resLetra", "");           // limpia la letra anterior
    return;
  }

  // validación de las notas deben estar entre 0 y 100
  if (n1 < 0 || n1 > 100 || n2 < 0 || n2 > 100 || n3 < 0 || n3 > 100) {
    mostrar("resPromedio", "Las calificaciones deben estar entre 0 y 100.", true);
    mostrar("resLetra", "");
    return;
  }

  const promedio = (n1 + n2 + n3) / 3;              // suma de notas entre 3
  const letra = obtenerLetra(promedio);             // letra según el promedio

  // el promedio y debajo la calificación final en letra
  mostrar("resPromedio", "El promedio de " + nombre + " es: " + promedio.toFixed(2) + " puntos");
  mostrar("resLetra", "Su calificación final es una " + letra);
});

// comparaciónn de 2 valores
document.getElementById("btnComparar").addEventListener("click", function () {
  const a = leerNumero("cmpA");
  const b = leerNumero("cmpB");

  if (isNaN(a) || isNaN(b)) {
    mostrar("resComparar", "Ingresa los dos números.", true);
    return;
  }
  if (a === b) {                                    // caso especial: son iguales
    mostrar("resComparar", "Los dos números son iguales (" + a + "), su diferencia es 0.");
    return;
  }
  const mayor = Math.max(a, b);                     // número mayor
  const menor = Math.min(a, b);                     // número menor
  const diferencia = mayor - menor;                 // diferencia positiva
  mostrar("resComparar",
    "El número mayor es " + mayor + ", el menor es " + menor +
    ", y su diferencia es " + diferencia + ".");
});