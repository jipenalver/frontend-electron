const form = document.getElementById("form_sentence");
if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    //console.log(formData.get("sentence"));

    const response = await window.axios.openAI(formData.get("sentence"));
    document.getElementById("sentence_corrected").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
  };
}
