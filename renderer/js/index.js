// Extract Text from Image
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
    let extraction_type = document.getElementById("pills-text-tab").classList.contains('active');
    let sentence = extraction_type ? formData.get("sentence-text") : formData.get("sentence-img");

    if (tools_type == null) {
      alertMessage("error", "Please choose OpenAI Tools!");
      return;
    }

    if (sentence.length <= 8) {
      alertMessage("error", "Please input text at least 8 characters or upload image to extract text!");
      return;
    }

    submit.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
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
      background: status == "error" ? "#E76161":"#539165",
      color: "white",
      padding: "5px",
      marginTop: "2px"
    }
  });
}
