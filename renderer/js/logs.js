// Read Prompts from SupaBase
getPrompts();
async function getPrompts () {
    const response = await window.axios.supaBase();

    const tbody = document.getElementById('tbody');
    let htmlResult = '';
    Object.keys(response).forEach(key => {
        let date = new Date(response[key].created_at.replace(' ', 'T'));
        let d = date.toLocaleDateString('en-US',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }, { timeZone: 'UTC' });
        let t = date.toLocaleTimeString('en-US', { timeZone: 'UTC' });

        htmlResult += '<tr>' +
            '<th scope="row">' +  response[key].prompt_id + '</th>' +
            '<td>' + response[key].tools_type + '</td>' +
            '<td>' + response[key].text + '</td>' +
            '<td>' + response[key].result + '</td>' +
            '<td>' + date.toLocaleString('en-US', { timeZone: 'UTC' }) + '</td>' +
            '<td>' + '<button type="button" class="btn btn-link">Remove</button>' + '</td>' +
        '</tr>';
    });
    tbody.innerHTML = htmlResult;
}