// Read Prompts from SupaBase
getPrompts();
async function getPrompts () {
    const response = await window.axios.supaBase();

    let htmlResult = '';
    Object.keys(response).forEach(key => {
        let date = new Date(response[key].created_at.replace(' ', 'T'));

        htmlResult += '<tr>' +
            '<th scope="row">' +  response[key].prompt_id + '</th>' +
            '<td>' + response[key].tools_type + '</td>' +
            '<td>' + response[key].text + '</td>' +
            '<td>' + response[key].result + '</td>' +
            '<td>' + date.toLocaleString('en-US', { timeZone: 'UTC' }) + '</td>' +
            '<td>' + 
                '<div class="btn-group" role="group">' +
                    '<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">' +
                        'Action' +
                    '</button>' +
                    '<ul class="dropdown-menu">' +
                        '<li><a id="btn_prompts_del" class="dropdown-item" href="#">Remove</a></li>' +
                    '</ul>' +
                '</div>' +
        '</tr>';
    });

    const tbody = document.getElementById('tbl_prompts');
    tbody.innerHTML = htmlResult;
}

// Delete Prompt 
const btn_prompts_del = document.getElementById('btn_prompts_del');
if (btn_prompts_del) {

}