// Extraction Type
const ext_type = document.querySelector("select[name='extraction_type']");
if (ext_type) {
  ext_type.onchange = function () {
    const div_text = document.getElementById("ext-div-text");
    const div_image = document.getElementById("ext-div-image");
    const div_result = document.getElementById("div-result");

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
    const file = document.getElementById("file-extract");
    
    console.log(file.files[0]);


  };
}

// Form Submit
const form = document.getElementById("form");
if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    let tools_type = formData.get("tools_type");
    let sentence = formData.get("sentence");

    if (tools_type.length == 0) {
      alertMessage("error", "Please choose OpenAI Tools!");
      return;
    }

    if (sentence.length <= 8) {
      alertMessage("error", "Please input at least 8 characters!");
      return;
    }

    const submit_btn = document.querySelector("#form button[type='submit']");
    submit_btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    submit_btn.disabled = true;
    const response = await window.axios.openAI(sentence);
    document.getElementById("div-result-text").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
    submit_btn.innerHTML = 'Process Text';
    submit_btn.disabled = false;
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
