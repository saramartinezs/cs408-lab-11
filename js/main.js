window.onload = loadData;

function loadData(){
    let lambda = document.getElementById("inventory");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        lambda.innerHTML = "<tr><th>ID</th><th>Name</th><th>Price</th><th>Action</th></tr>";

        // lambda.innerHTML = xhr.response;
        const items = JSON.parse(xhr.response);

        items.forEach(item => {
            var row = lambda.insertRow();
            var id = row.insertCell(0);
            var name = row.insertCell(1);
            var price = row.insertCell(2);
            var action = row.insertCell(3); 
            id.innerText = item.id;
            name.innerText = item.name;
            price.innerText = item.price;

            let button = document.createElement('button');
            button.innerText = "Delete";
            button.onclick = function() {deleteData(item.id)};
            action.appendChild(button);
        });
    });

    xhr.open("GET", " https://lgffi88j6b.execute-api.us-east-2.amazonaws.com/items");
    xhr.send();
}

function deleteData(id){
    let xhr = new XMLHttpRequest();
    let url = "https://lgffi88j6b.execute-api.us-east-2.amazonaws.com/items/"
    let toDelete = url.concat(id);

    xhr.open("DELETE", toDelete);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    // loadData();
}

function sendData(){
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", " https://lgffi88j6b.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");

    var id = document.getElementById("id");
    var name = document.getElementById("name");
    var price = document.getElementById("price");
    xhr.send(JSON.stringify({
        "id": id.value,
        "price": price.value,
        "name": name.value
    }));

    id.value = "";
    name.value = "";
    price.value = "";

    // loadData();
}