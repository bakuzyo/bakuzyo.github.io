const makeRequest = () => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/cameras');
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if(apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject('Server is unavailable');
                }
            }
        };
    });
}
const body = document.getElementById('productsContainer');
body.className = "d-flex flex-wrap justify-content-around";

makeRequest().then(datas => {
    datas.map(lense => {
        let newDiv = document.createElement('div');
        newDiv.className = "article col-lg-4 cold-md-6 mb-4 card"
        newDiv.classList.add('lense');

        let newTitle = document.createElement('h2');
        newTitle.innerText = lense.name;
        let newParagraph = document.createElement('p');
        newParagraph.innerText = lense.description;
        let newPrice = document.createElement('h3');
        newPrice.innerText = (lense.price / 100).toFixed(2) +" €";
        let newImage = document.createElement('img');
        newImage.className = "card-img-top";
        newImage.setAttribute('src', lense.imageUrl);
        newImage.innerHTML = `alt="${lense.name}"`;

        newDiv.append(newTitle);
        newDiv.append(newPrice);
        newDiv.append(newParagraph);
        newDiv.append(newImage);

        const myDivEnfantB = document.createElement('div');
        myDivEnfantB.className = "card-body align-items-end";           
        newDiv.append(myDivEnfantB);

        const btn = document.createElement('button');
        btn.className = "btn btn-outline-info ml-auto mr-auto";
        const link = document.createElement('a'); 
        link.style.textDecoration = "none";
        const text = document.createTextNode('Voir le produit');  
        myDivEnfantB.append(btn);

        link.appendChild(text);  
        link.href = "HTML/product.html?id=" + lense._id;
        btn.append(link);

        body.append(newDiv);
    });
})