const data = [
    {
        "logo": "../assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "logo": "../assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "../assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "../assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "../assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "../assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "../assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "../assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "../assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
    },
    {
        "logo": "../assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "logo": "../assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
    }
  ]

const htmlText = `
<div class="card">
<div class="description">
  <img src="" alt="">
  <div class="text">
    <h4>DevLens</h4>
    <p>Quickly inspect page layouts and visualize element boundaries.</p>
  </div>
</div>
<div class="action-buttons">
  <button class="remove">Remove</button>
  <label class="toggle-switch">
    <input type="checkbox" id="">
    <span class="slider"></span>
  </label>
</div>
</div>
`;

//toggling between light and dark mode
document.querySelector('.mode').addEventListener('click', () => {
    const style = document.querySelector('link[type="text/css"]');
    if (style.getAttribute('id') === 'light') {
        style.setAttribute('id', 'dark');
        style.setAttribute('href', './dark.css');
    } else {
        style.setAttribute('id', 'light');
        style.setAttribute('href', './light.css');
    }
});


function getData(isActive=null) {
    if (isActive === null) {
        return data;
    }

    const res = [];
    for (const obj of data) {
        if (obj.isActive === isActive) {
            res.push(obj);
        }
    }
    return res;
}

function updateData(name, key, value) {
    for (const obj of data) {
        if (obj.name === name) {
            obj[key] = value;
        }
    }
}

function deleteData(name) {
    for (const obj of data) {
        if (obj.name === name) {
            let index = data.indexOf(obj);
            if (index > -1) {
                data.splice(index, 1);
            }
        }
    }
}

const container = document.querySelector('.list');
const radioAll = document.querySelector('#radio1');
const radioActive = document.querySelector('#radio2');
const radioInactive = document.querySelector('#radio3');

function loadData(data) {
    container.replaceChildren();
    for (const obj of data) {
        container.insertAdjacentHTML('beforeend', htmlText);
        const card = container.lastElementChild;
        card.querySelector(' img').setAttribute('src', obj.logo);
        card.querySelector(' h4').innerHTML = obj.name;
        card.querySelector(' p').innerHTML = obj.description;
    
        if (obj.isActive) {
            card.querySelector(' input').checked = true;
        }

        card.querySelector(' .remove').addEventListener('click', (event) => {
            deleteData(obj.name)
            container.removeChild(card)
        });

        card.querySelector(' input').addEventListener('change', (event) => {
            if(event.target.checked) {
                updateData(obj.name, 'isActive', true);
                if(radioInactive.checked) {
                    setTimeout(() => {
                        container.removeChild(card)
                    }, 300);
                }
            } else {
                updateData(obj.name, 'isActive', false);
                if(radioActive.checked) {
                    setTimeout(() => {
                        container.removeChild(card)
                    }, 300);
                }
            }
        })

    }
}



radioAll.addEventListener('change', (event) => {
    if(event.target.checked){
        loadData(getData());
    }
});

radioActive.addEventListener('change', (event) => {
    if(event.target.checked){
        loadData(getData(true));
    }
});

radioInactive.addEventListener('change', (event) => {
    if(event.target.checked){
        loadData(getData(false));
    }
});



window.onload = () => {
    radioAll.checked = true;
    radioAll.dispatchEvent(new Event('change', {'bubbles': true}));
    
};

