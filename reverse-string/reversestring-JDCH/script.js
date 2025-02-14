// Se espera a que el DOM se cargue completamente para asegurar que los elementos existen
document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // Obtención de Elementos
  // ==========================
  const inputTextEl = document.getElementById("inputText");
  const resultTextEl = document.getElementById("resultText");
  const reverseBtnEl = document.getElementById("reverseBtn");
  const copyBtnEl = document.getElementById("copyBtn");
  const errorMessageEl = document.getElementById("errorMessage");

  // ==========================
  // Funciones de Utilidad
  // ==========================

  /**
   * Muestra un mensaje de error.
   * @param {string} message - Mensaje de error a mostrar.
   */
  function showError(message) {
    errorMessageEl.textContent = message;
    errorMessageEl.classList.remove("hidden");
  }

  /**
   * Limpia el mensaje de error.
   */
  function clearError() {
    errorMessageEl.textContent = "";
    errorMessageEl.classList.add("hidden");
  }

  /**
   * Invierte una cadena de texto.
   * Función pura que respeta los principios DRY y facilita la reutilización.
   * @param {string} str - Texto a invertir.
   * @returns {string} - Texto invertido.
   */
  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  // ==========================
  // Manejo de Eventos
  // ==========================

  /**
   * Función que valida y procesa la inversión del texto.
   */
  function handleReverseText() {
    clearError();
    const text = inputTextEl.value.trim();

    // Validación para evitar entradas vacías o solo espacios
    if (!text) {
      showError("Por favor, ingresa un texto válido.");
      resultTextEl.value = "";
      return;
    }

    // Inversión del texto y asignación al campo de resultado
    const reversed = reverseString(text);
    resultTextEl.value = reversed;
  }

  /**
   * Función que copia el texto invertido al portapapeles.
   */
  function copyToClipboard() {
    clearError();
    const text = resultTextEl.value;

    // Validación: Solo se copia si hay un resultado
    if (!text) {
      showError("No hay texto para copiar.");
      return;
    }

    // Uso de la API navigator.clipboard para copiar el texto
    navigator.clipboard.writeText(text)
      .then(() => {
        // Se muestra un mensaje de confirmación (puede reemplazarse por un feedback visual más sofisticado)
        alert("Texto copiado al portapapeles.");
      })
      .catch((err) => {
        showError("Error al copiar el texto. Intenta nuevamente.");
        console.error("Error copiando al portapapeles:", err);
      });
  }

  // ==========================
  // Asignación de Eventos
  // ==========================
  reverseBtnEl.addEventListener("click", handleReverseText);
  copyBtnEl.addEventListener("click", copyToClipboard);
});
