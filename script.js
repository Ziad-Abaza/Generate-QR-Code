function showError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block"; 
}

function hideError() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none"; 
}

function generateQRCode() {
  const inputValue = document.getElementById("inputValue").value;

  if (!inputValue) {
    showError("Please enter text or a link.");
    return;
  }

  hideError(); 
  
  try {
    QRCode.toDataURL(inputValue, function (err, url) {
      if (err) {
        console.error("Error generating QR Code:", err);
        showError(
          "An error occurred while generating the QR code. Please try again."
        );
        return;
      }
      document.getElementById(
        "qrcode"
      ).innerHTML = `<img src="${url}" alt="QR Code">`;
      document.getElementById("downloadBtn").style.display = "inline-block";
    });
  } catch (error) {
    console.error("Unexpected error during QR code generation:", error);
    showError("An unexpected error occurred. Please try again.");
  }
}

function downloadQRCode() {
  const qrCodeImage = document.querySelector("#qrcode img");

  if (!qrCodeImage) {
    showError(
      "QR Code has not been generated yet. Please generate a QR code first."
    );
    return;
  }

  try {
    const link = document.createElement("a");
    link.href = qrCodeImage.src;
    link.download = "qrcode.png";
    link.click();
  } catch (error) {
    console.error("Error downloading the QR Code:", error);
    showError(
      "An error occurred while downloading the QR code. Please try again."
    );
  }
}

document
  .getElementById("inputValue")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      generateQRCode(); 
    }
  });