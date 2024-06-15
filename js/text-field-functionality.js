document.getElementById("mensaje").addEventListener("input", function () {
  const mensajeText = document.getElementById("mensaje").value.toLowerCase();
  const solicitudSelect = document.getElementById("solicitud");

  function checkAndSetSolicitud(keyword, solicitudValue) {
    if (mensajeText.includes(keyword)) {
      solicitudSelect.value = solicitudValue;
    }
  }

  checkAndSetSolicitud("compra", "compra");
  checkAndSetSolicitud("venta", "venta");
});
