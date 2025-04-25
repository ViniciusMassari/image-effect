/// SÓ falta chamar as funções com os argumentos
async function init() {
  const input = document.getElementById('upload');
  const effectRadios = document.querySelector('#effects');
  const blurRangeInput = document.querySelector('input[type=range]');

  let chosenEffect = null;
  let blurValue = 0.5;

  blurRangeInput.addEventListener('change', (e) => {
    blurValue = +e.target.value;
  });

  function handleClick(e) {
    const blurRange = document.getElementById('blur-range');
    const targetRadio = e.target;
    if (targetRadio.classList.contains('effect')) {
      chosenEffect = e.target.value;
      if (chosenEffect == 'blur') {
        blurRange.classList.add('fade-in');
      } else {
        blurRange.classList.remove('fade-in');
      }
    }
  }
  effectRadios.addEventListener('click', handleClick);

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
    let imgDataURL = null;
    if (chosenEffect == null) chosenEffect = 'grayscale';
    const base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ''
    );
    if (chosenEffect == 'grayscale') {
      imgDataURL = rustApp.apply_effect(base64, chosenEffect, null);
    } else {
      imgDataURL = rustApp.apply_effect(
        base64,
        chosenEffect,
        +blurValue.toPrecision(2)
      );
    }

    document.getElementById('new-img').setAttribute('src', imgDataURL);
  };

  input.addEventListener('change', () => {
    if (input.files[0] && input.files[0] instanceof Blob) {
      fileReader.readAsDataURL(input.files[0]);
    }
    return;
  });
}

init();
