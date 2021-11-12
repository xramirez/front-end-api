function getPalette() {
    let http = new XMLHttpRequest()
    let url = "http://colormind.io/api/"
    let data =
    {
        model: "default"
    }

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            let palette = JSON.parse(http.responseText).result;
            main(palette)
        }
    }

    http.open("POST", url, true);
    http.send(JSON.stringify(data));
}

function main(palette) {
    console.log(palette)
    let arrOfColors = parseToHex(palette)

    if(document.getElementById('color-list').getElementsByTagName('li').length >= 1)
        clearList();

    document.body.style.backgroundColor = arrOfColors[0]
    document.body.style.color = arrOfColors[arrOfColors.length - 2];

    let head1 = document.querySelector('.intro-section h1');
    head1.style.backgroundColor = arrOfColors[1];
    head1.style.color = arrOfColors[0]
    let head2 = document.querySelector('.intro-section h2');
    head2.style.backgroundColor = arrOfColors[2];
    head2.style.color = arrOfColors[0];
    let buttonSec = document.querySelector('.button-section');
    buttonSec.style.backgroundColor = arrOfColors[3];
    buttonSec.style.color = arrOfColors[0];

    displayList(arrOfColors);
}

function parseToHex(palette) {
    let hexArr = palette.map(([r, g, b]) => ["#", r.toString(16), g.toString(16), b.toString(16)].join(""))
    console.log(hexArr)
    return hexArr;
}

function displayList(colorPalette) {
    let ul = document.getElementById("color-list");
    let displaySection = document.querySelector('.display-colors')
    displaySection.style.backgroundColor = "lightgray";
    for (color of colorPalette) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(color));
        li.style.color = color;
        li.style.fontWeight = 200;
        ul.appendChild(li);
    }
}

function clearList()
{
    let ul = document.getElementById('color-list');
    ul.innerHTML = '';
}