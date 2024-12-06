console.log("popup")

let items = [];

function renderList() {
    const container = document.getElementById('problem-list');
    container.innerHTML = '';

    items.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item columns is-mobile is-vcentered';

        const linkColumn = document.createElement('div');
        linkColumn.className = 'column';

        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = item.text;
        link.target = '_blank';
        link.className = 'has-text-link';

        const path = new URL(item.url).pathname;
        const slug = path.split('/')[2];
        link.text = `${slug} - ${item.date}`;

        const buttonColumn = document.createElement('div');
        buttonColumn.className = 'column is-narrow';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'button is-danger is-small';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteItem(index);

        linkColumn.appendChild(link);
        buttonColumn.appendChild(deleteBtn);
        listItem.appendChild(linkColumn);
        listItem.appendChild(buttonColumn);
        container.appendChild(listItem);
    });
}

function deleteItem(index) {
    console.log("delete")
    items.splice(index, 1);
    renderList();
    // Optional: Save updated items to chrome.storage
    chrome.storage.local.set({ items: items });
}

// Initial render
renderList();

// Optional: Load items from chrome.storage when popup opens
chrome.storage.local.get(['items'], function(result) {
    if (result.items) {
    items = result.items;
    renderList();
    }
});