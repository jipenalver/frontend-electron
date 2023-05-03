// Extraction Type
const ext_type = document.querySelector("select[name='extraction_type']");
if (ext_type) {
  ext_type.onchange = function () {
    const div_text = document.getElementById("ext-div-text");
    const div_image = document.getElementById("ext-div-image");
    const div_result = document.getElementById("div-result");
    document.getElementById("div-result-text").innerHTML = "";

    if ( ext_type.value == 'Text' ){
      div_text.classList.remove('d-none');
      div_text.classList.add('d-block');
      div_image.classList.remove('d-block');
      div_image.classList.add('d-none');
      div_result.classList.remove('d-none');
      div_result.classList.add('d-block');
      return;
    } 
    
    if ( ext_type.value == 'Image' ){
      div_text.classList.remove('d-block');
      div_text.classList.add('d-none');
      div_image.classList.remove('d-none');
      div_image.classList.add('d-block');
      div_result.classList.remove('d-none');
      div_result.classList.add('d-block');
      return;
    }

    div_text.classList.add('d-none');
    div_text.classList.remove('d-block');
    div_image.classList.add('d-none');
    div_image.classList.remove('d-block');
    div_result.classList.add('d-none');
    div_result.classList.remove('d-block');
  };
}

// Extract Text
const extract = document.getElementById("btn-extract");
if (extract) {
  extract.onclick = async function () {
    const file = document.getElementById("file-extract").files[0];

    const file_types = ['image/png', 'image/bmp', 'image/jpeg'];
    if ( !file || !file_types.includes(file['type']) ) {
      alertMessage("error", "Please upload an image with (png, bmp, jpeg) format!");
      return;
    }

    extract.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    extract.disabled = true;
    const response = await window.axios.tesseract(file.path);
    document.querySelector("textarea[name='sentence-img']").innerHTML = JSON.stringify(response.text).replace(/\\n/g, ' ');
    extract.innerHTML = 'Extract Text';
    extract.disabled = false;
  };
}

// Form Submit
const form = document.getElementById("form");
if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const submit = document.querySelector("#form button[type='submit']");
    const formData = new FormData(form);
    let tools_type = formData.get("tools_type");
    let extraction_type = formData.get("extraction_type");
    let sentence = extraction_type == 'Text' ? formData.get("sentence") : formData.get("sentence-img");

    if (tools_type.length == 0) {
      alertMessage("error", "Please choose OpenAI Tools!");
      return;
    }

    if (sentence.length <= 8) {
      alertMessage("error", "Please input at least 8 characters!");
      return;
    }

    submit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    submit.disabled = true;
    const response = await window.axios.openAI(sentence, tools_type);
    document.getElementById("div-result-text").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
    submit.innerHTML = 'Process Text';
    submit.disabled = false;
  };
}

// Alert Message
function alertMessage(status, sentence){
  window.Toastify.showToast({
    text: sentence,
    duration: 3000,
    stopOnFocus: true,
    style: {
      textAlign: "center",
      background: status == "error" ? "#A84448":"#539165",
      color: "white",
      padding: "5px",
      marginTop: "2px"
    }
  });
}
