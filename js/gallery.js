document.addEventListener("DOMContentLoaded", function () {
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  const galleryImages = document.querySelectorAll(".gallery__image img");
  const modalBody = document.querySelector(".modal-body");
  const loadingScreen = document.getElementById("loadingScreen");

  function openModal(image) {
    const imageContainer = image.closest(".gallery__image");
    const author = imageContainer.getAttribute("data-author");
    const date = imageContainer.getAttribute("data-date");
    const fullDescription = imageContainer.getAttribute(
      "data-full-description",
    );

    modalBody.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" class="img-fluid">
      <p><strong>Autor:</strong> ${author}</p>
      <p><strong>Fecha:</strong> ${date}</p>
      <p>${fullDescription}</p>
    `;
    modal.show();
  }

  function deleteImage(button) {
    const imageContainer = button.closest(".gallery__image");
    const imageId = imageContainer.getAttribute("data-image-id");
    if (confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
      imageContainer.style.display = "none";
      localStorage.setItem(`deletedImage_${imageId}`, "true");
    }
  }

  function restoreAllImages() {
    const deletedImageKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("deletedImage_"),
    );
    deletedImageKeys.forEach((key) => {
      const imageId = key.split("_")[1];
      const imageContainer = document.querySelector(
        `.gallery__image[data-image-id="${imageId}"]`,
      );
      if (imageContainer) {
        imageContainer.style.display = "block";
        localStorage.removeItem(key);
      }
    });
  }

  function hideDeletedImages() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("deletedImage_")) {
        const imageId = key.split("_")[1];
        const imageContainer = document.querySelector(
          `.gallery__image[data-image-id="${imageId}"]`,
        );
        if (imageContainer) {
          imageContainer.style.display = "none";
        }
      }
    });
  }

  function initializeEventListeners() {
    galleryImages.forEach((image) => {
      image.addEventListener("click", () => openModal(image));
    });

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => deleteImage(button));
    });

    const restoreAllButton = document.querySelector(".restore-all-button");
    restoreAllButton.addEventListener("click", restoreAllImages);
  }

  function hideLoadingScreen() {
    loadingScreen.style.display = "none";
  }

  hideDeletedImages();
  initializeEventListeners();
  hideLoadingScreen();
});
