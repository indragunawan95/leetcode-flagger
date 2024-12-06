console.log("Content script running");

const observer = new MutationObserver((mutations) => {
    const element = document.getElementById("ide-top-btns");
    if (element) {
        const imagePath = chrome.runtime.getURL('asset/flag.png');
        
        const flagButton = document.createElement('button');
        flagButton.className = 'flex items-center gap-1.5 px-3 py-1.5 font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex text-label-2 dark:text-dark-label-2 hover:text-label-1 dark:hover:text-dark-label-1 bg-transparent';
        
        const imgIcon = document.createElement('img');
        imgIcon.src = imagePath;
        imgIcon.style.width = '20px';
        imgIcon.style.height = '20px';

        // Using regular CSS styles
        flagButton.style.display = 'flex';
        flagButton.style.alignItems = 'center';
        flagButton.style.padding = '6px 12px';
        flagButton.style.backgroundColor = 'white';
        flagButton.style.border = '1px solid #d1d5db';
        flagButton.style.borderRadius = '4px';
        flagButton.style.cursor = 'pointer';
        flagButton.style.transition = 'all 0.2s';
        
        // Add error handling to check if image loads
        imgIcon.onerror = () => {
            console.error('Failed to load image');
        };
        imgIcon.onload = () => {
            console.log('Image loaded successfully');
        };
        
        
        flagButton.appendChild(imgIcon);

        // Add click event
        flagButton.addEventListener('click', () => {
            console.log('Flag button clicked!');
            // Add your flag functionality here
            saveFlag()
        });
        
        element.appendChild(flagButton);
        observer.disconnect();
    }
});

function saveFlag(){
    // get current active tab url
    const currentUrl = document.URL;
    const currDate = new Date()
    console.log(currentUrl)
    // save to { items: [] }
    chrome.storage.local.get(["items"], (result) => {
        
        const items = result.items ? result.items : []
        const newData = {
            url: currentUrl,
            date: currDate.toISOString()
        }
        items.push(newData)
        chrome.storage.local.set({ items: items }, () => {
            console.log("data saved successfully")
        })
        
    })

}

observer.observe(document.body, {
    childList: true,
    subtree: true
});