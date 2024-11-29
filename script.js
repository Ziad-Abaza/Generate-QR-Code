const dataInput = document.getElementById("data");
const shapeInput = document.getElementById("shape");
const form = document.getElementById("qr-form");
const canvasContainer = document.getElementById("canvas");
const dataError = document.getElementById("data-error");
const downloadButton = document.getElementById("download");

let qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "",
  dotsOptions: {
    color: "#4267b2",
    type: "square",
  },
  backgroundOptions: {
    color: "#ffffff",
  },
});

const dotColorPicker = Pickr.create({
  el: "#dot-color-picker",
  theme: "nano",
  default: "#222",
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      input: true,
      clear: false,
      save: true,
    },
  },
});

const backgroundColorPicker = Pickr.create({
  el: "#background-color-picker",
  theme: "nano",
  default: "#ffffff",
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      input: true,
      clear: false,
      save: true,
    },
  },
});

const handleFormSubmit = (e) => {
  e.preventDefault();

  const data = dataInput.value.trim();
  const shape = shapeInput.value;

  if (!data) {
    dataError.textContent = "Please enter valid text or URL.";
    dataError.style.display = "block";
    return;
  }

  if (data.length > 255) {
    dataError.textContent =
      "Input is too long. Please limit it to 255 characters.";
    dataError.style.display = "block";
    return;
  }

  try {
    qrCode.update({
      data: data,
      dotsOptions: {
        color: dotColorPicker.getColor().toHEXA().toString(),
        type: shape,
      },
      backgroundOptions: {
        color: backgroundColorPicker.getColor().toHEXA().toString(),
      },
    });

    canvasContainer.innerHTML = "";
    qrCode.append(canvasContainer);
    downloadButton.style.display = "block";
  } catch (error) {
    dataError.textContent =
      "An error occurred while generating the QR code. Please try again.";
    dataError.style.display = "block";
  }
};

form.addEventListener("submit", handleFormSubmit);

form.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleFormSubmit(e);
  }
});

downloadButton.addEventListener("click", () => {
  const imageUrl = qrCode.getRawData("canvas").toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "qr-code.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
