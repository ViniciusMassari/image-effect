async function init() {
  const input = document.getElementById('upload');
  const fileReader = new FileReader();
  let rustApp = null;

  try {
    rustApp = await import('../pkg');
  } catch (error) {
    console.error(error);
    return;
  }

  console.log(rustApp);

  fileReader.onloadend = () => {
    const base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ''
    );
    const imgDataURL = rustApp.grayscale(base64);
    document.getElementById('new-img').setAttribute('src', imgDataURL);
  };

  input.addEventListener('change', () => {
    fileReader.readAsDataURL(input.files[0]);
  });
}

init();
