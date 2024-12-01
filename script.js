    document.addEventListener("DOMContentLoaded", function() {
      const canvas1 = document.getElementById("canvas1");
      const canvas2 = document.getElementById("canvas2");
      const canvas3 = document.getElementById("canvas3");
      const imageInput = document.getElementById("image-input");
      const pCanvas1 = document.getElementById("pCanvas1");
      const pCanvas2 = document.getElementById("pCanvas2");
      const pCanvas3 = document.getElementById("pCanvas3");

      function handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
          loadImageToCanvases(e.target.result);
        };

        reader.readAsDataURL(file);
      }

      function loadImageToCanvases(imageSrc) {
        const img = new Image();
        img.onload = function() {
          const screenWidth = window.innerWidth;
          const aspectRatio = img.width / img.height;
          const canvasWidth = screenWidth * 0.3;
          const canvasHeight = canvasWidth / aspectRatio;

          canvas1.width = canvasWidth;
          canvas1.height = canvasHeight;
          canvas2.width = canvasWidth;
          canvas2.height = canvasHeight;
          canvas3.width = canvasWidth;
          canvas3.height = canvasHeight;

          const ctx1 = canvas1.getContext("2d");
          const ctx2 = canvas2.getContext("2d");
          const ctx3 = canvas3.getContext("2d");

          ctx1.drawImage(img, 0, 0, canvasWidth, canvasHeight);
          ctx2.drawImage(img, 0, 0, canvasWidth, canvasHeight);
          ctx3.drawImage(img, 0, 0, canvasWidth, canvasHeight);

          const imageData1 = ctx1.getImageData(0, 0, canvasWidth, canvasHeight);
          const pixelData = getImagePixelData(imageData1);

          redrawImage(canvas1, canvas2, canvas3, pixelData);
          displayPixelData(pCanvas1, getImageDataPermutation(pixelData, [0, 1, 2])); // 012
          displayPixelData(pCanvas2, getImageDataPermutation(pixelData, [0, 2, 1])); // 021
          displayPixelData(pCanvas3, getImageDataPermutation(pixelData, [1, 0, 2])); // 102
        };

        img.src = imageSrc;
      }

      function getImagePixelData(imageData) {
        const { data } = imageData;
        const pixelData = [];

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          pixelData.push([r, g, b, a]);
        }

        return pixelData;
      }

      function redrawImage(canvas1, canvas2, canvas3, pixelData) {
        const ctx1 = canvas1.getContext("2d");
        const ctx2 = canvas2.getContext("2d");
        const ctx3 = canvas3.getContext("2d");
        const imageData1 = ctx1.createImageData(canvas1.width, canvas1.height);
        const imageData2 = ctx2.createImageData(canvas2.width, canvas2.height);
        const imageData3 = ctx3.createImageData(canvas3.width, canvas3.height);

        for (let i = 0; i < pixelData.length; i++) {
          const [r, g, b, a] = pixelData[i];
          const colorIndex = Math.floor(Math.random() * 6); // Randomly select a color index permutation

          if (colorIndex === 0 || colorIndex === 1) {
            // Assign R value to canvas1
            imageData1.data[i * 4] = r;
            imageData1.data[i * 4 + 1] = 0;
            imageData1.data[i * 4 + 2] = 0;
            imageData1.data[i * 4 + 3] = a;

            // Assign G value to canvas2
            imageData2.data[i * 4] = 0;
            imageData2.data[i * 4 + 1] = g;
            imageData2.data[i * 4 + 2] = 0;
            imageData2.data[i * 4 + 3] = a;

            // Assign B value to canvas3
            imageData3.data[i * 4] = 0;
            imageData3.data[i * 4 + 1] = 0;
            imageData3.data[i * 4 + 2] = b;
            imageData3.data[i * 4 + 3] = a;
          } else if (colorIndex === 2 || colorIndex === 3) {
            // Assign R value to canvas1
            imageData1.data[i * 4] = r;
            imageData1.data[i * 4 + 1] = 0;
            imageData1.data[i * 4 + 2] = 0;
            imageData1.data[i * 4 + 3] = a;

            // Assign B value to canvas2
            imageData2.data[i * 4] = 0;
            imageData2.data[i * 4 + 1] = 0;
            imageData2.data[i * 4 + 2] = b;
            imageData2.data[i * 4 + 3] = a;

            // Assign G value to canvas3
            imageData3.data[i * 4] = 0;
            imageData3.data[i * 4 + 1] = g;
            imageData3.data[i * 4 + 2] = 0;
            imageData3.data[i * 4 + 3] = a;
          } else {
            // Assign G value to canvas1
            imageData1.data[i * 4] = 0;
            imageData1.data[i * 4 + 1] = g;
            imageData1.data[i * 4 + 2] = 0;
            imageData1.data[i * 4 + 3] = a;

            // Assign R value to canvas2
            imageData2.data[i * 4] = r;
            imageData2.data[i * 4 + 1] = 0;
            imageData2.data[i * 4 + 2] = 0;
            imageData2.data[i * 4 + 3] = a;

            // Assign B value to canvas3
            imageData3.data[i * 4] = 0;
            imageData3.data[i * 4 + 1] = 0;
            imageData3.data[i * 4 + 2] = b;
            imageData3.data[i * 4 + 3] = a;
          }
        }

        ctx1.putImageData(imageData1, 0, 0);
        ctx2.putImageData(imageData2, 0, 0);
        ctx3.putImageData(imageData3, 0, 0);
      }

      function getImageDataPermutation(pixelData, permutation) {
        const imageDataPermutation = [];

        for (let i = 0; i < pixelData.length; i++) {
          const [r, g, b, a] = pixelData[i];
          const colorIndex = permutation[i % 3];

          if (colorIndex === 0) {
            imageDataPermutation.push([r, 0, 0, a]); // R
          } else if (colorIndex === 1) {
            imageDataPermutation.push([0, g, 0, a]); // G
          } else {
            imageDataPermutation.push([0, 0, b, a]); // B
          }
        }

        return imageDataPermutation;
      }

      function displayPixelData(element, pixelData) {
        let text = "Array: " + JSON.stringify(pixelData);
        element.textContent = text;
      }

      // Load the default image on page load
      loadImageToCanvases('https://peteleonard.org/wp-content/uploads/2024/08/Baby-Cake.jpg');

      imageInput.addEventListener("change", handleImageUpload);
    });
