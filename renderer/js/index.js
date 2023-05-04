// Extract Text from Image
const btn_extract = document.getElementById("btn_extract");
if (btn_extract) {
  btn_extract.onclick = async function () {
    const file = document.getElementById("file_extract").files[0];

    const file_types = ['image/png', 'image/bmp', 'image/jpeg'];
    if ( !file || !file_types.includes(file['type']) ) {
      alertMessage("error", "Please upload an image with (png, bmp, jpeg) format!");
      return;
    }

    btn_extract.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    btn_extract.disabled = true;

    const response = await window.axios.tesseract(file.path);
    document.querySelector("textarea[name='sentence-img']").innerHTML = response.text;
    
    btn_extract.innerHTML = 'Extract Text';
    btn_extract.disabled = false;
  };
}

// Form Submit
const form_openai = document.getElementById("form_openai");
if (form_openai) {
  form_openai.onsubmit = async function (e) {
    e.preventDefault();

    const btn_submit = document.querySelector("#form_openai button[type='submit']");
    const formData = new FormData(form_openai);
    let tools_type = formData.get("tools-type");
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

    btn_submit.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
    btn_submit.disabled = true;

    const response = await window.axios.openAI(sentence, tools_type);
    let result = response.choices[0].text;
    document.querySelector("#div-result textarea").innerHTML = result.replace(/\n/g, "");
    const db_response = await window.axios.supaBase('post', '', {
        text: sentence,
        result: result,
        tools_type: tools_type
      });
    console.log(db_response);
    
    btn_submit.innerHTML = 'Process Text';
    btn_submit.disabled = false;
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
