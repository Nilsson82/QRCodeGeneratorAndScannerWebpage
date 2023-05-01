function generateQRCode() {
  const inputText = document.getElementById("input-text").value;
  const qrCodeDiv = document.getElementById("qr-code");

  qrCodeDiv.innerHTML = "";

  if (inputText) {
    const qrCode = new QRCode(qrCodeDiv, {
      text: inputText,
      width: 128,
      height: 128,
      correctLevel: QRCode.CorrectLevel.H,
    });

    // Show the "Print QR Code" button if a QR code is generated
    document.getElementById("print-btn").style.display = "block";
  } else {
    // Hide the "Print QR Code" button if no input text is provided
    document.getElementById("print-btn").style.display = "none";
  }
}

document.getElementById("input-text").addEventListener("input", generateQRCode);

generateQRCode();

const codeReader = new ZXing.BrowserQRCodeReader();
const video = document.getElementById("qr-video");
const result = document.getElementById("qr-result");

codeReader
  .decodeFromVideoDevice(null, video, (result) => {
    if (result) {
      console.log(result);
      document.getElementById("qr-result").innerText = result.text;
    } else {
      document.getElementById("qr-result").innerText = "No QR code detected";
    }
  })
  .catch((err) => {
    console.error(err);
  });

window.addEventListener("beforeunload", () => {
  codeReader.reset();
});

const directLinkQR = new QRCode(document.getElementById("direct-link-qr"), {
  text: "https://nilsson82.github.io/QRCodeGeneratorAndScannerWebpage",
  width: 128,
  height: 128,
  correctLevel: QRCode.CorrectLevel.H,
});

document.getElementById("show-popup-btn").addEventListener("click", showPopup);

function showPopup() {
  document.getElementById("popup-box").classList.remove("hidden");
}

function closePopup(event) {
  if (
    event.target === event.currentTarget ||
    event.target.classList.contains("close-btn")
  ) {
    event.target.closest(".popup-container").classList.add("hidden");
  }
}

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", closePopup);
});

document.querySelectorAll(".popup-container").forEach((container) => {
  container.addEventListener("click", closePopup);
});

function printQrCode() {
  const qrCodeDiv = document.getElementById("qr-code");
  const printWindow = window.open("", "_blank");
  printWindow.document.write(
    "<html><head><title>Print QR Code</title></head><body>"
  );
  printWindow.document.write(
    '<div style="text-align:center;">' + qrCodeDiv.innerHTML + "</div>"
  );
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();
  };
}

const printBtn = document.getElementById("print-btn");

printBtn.addEventListener("click", function () {
  const qrCodeDiv = document.getElementById("qr-code");

  if (qrCodeDiv.innerHTML.trim() !== "") {
    printQrCode();
  }
});
