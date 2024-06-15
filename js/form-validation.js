document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      const formElements = {
        nombre: document.getElementById("nombre"),
        email: document.getElementById("email"),
        solicitud: document.getElementById("solicitud"),
        mensaje: document.getElementById("mensaje"),
      };

      const errorMessages = {
        nombre: "Por favor, ingresa tu nombre completo.",
        email: "Por favor, ingresa un correo electrónico válido.",
        solicitud: "Por favor, selecciona el tipo de solicitud.",
        mensaje: "Por favor, ingresa tu mensaje.",
      };

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      function showError(inputElement, message) {
        const errorElement = inputElement.nextElementSibling;
        inputElement.classList.add("is-invalid");
        errorElement.textContent = message;
        errorElement.style.display = "block";
      }

      function clearError(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        inputElement.classList.remove("is-invalid");
        errorElement.style.display = "none";
      }

      function validateField(field, validationFn) {
        return validationFn();
      }

      const validations = {
        nombre: () => formElements.nombre.value.trim() !== "",
        email: () => emailPattern.test(formElements.email.value.trim()),
        solicitud: () => formElements.solicitud.value !== "",
        mensaje: () => formElements.mensaje.value.trim() !== "",
      };

      let isValid = true;

      Object.keys(validations).forEach((field) => {
        const isFieldValid = validateField(field, validations[field]);
        if (!isFieldValid) {
          showError(formElements[field], errorMessages[field]);
          isValid = false;
        } else {
          clearError(formElements[field]);
        }
      });

      if (!isValid) {
        alert("Error! Por favor, completa los campos correctamente.");
        event.preventDefault();
      } else {
        alert("Éxito! El formulario ha sido enviado correctamente.");
      }

      Object.values(formElements).forEach((field) => {
        field.addEventListener("input", () => clearError(field));
      });

      formElements.mensaje.addEventListener("input", function () {
        const mensajeText = formElements.mensaje.value.toLowerCase();
        const solicitudSelect = formElements.solicitud;

        if (mensajeText.includes("compra") || mensajeText.includes("venta")) {
          clearError(solicitudSelect);
        }
      });
    });
});
