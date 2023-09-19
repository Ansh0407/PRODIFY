document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");

    let products = [];

    function fetchProducts() {
        const res = new XMLHttpRequest();
        res.open("GET", "https://raw.githubusercontent.com/CynthiaEstherMetilda/Xhrdemo/main/products.json", true);
        res.onload = function () {
            if (res.status === 200) {
                products = JSON.parse(res.responseText);
                console.log(products);
                displayProducts();
            }
        };
        res.send();
    }

    function displayProducts() {
        productList.innerHTML = "";

        const keyword = searchInput.value.toLowerCase();
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(keyword) || product.description.toLowerCase().includes(keyword)
        );

        const sortBy = sortSelect.value;
        if (sortBy === "nameA") {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "nameD") {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === "priceA") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceD") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        // Create a table
        const table = document.createElement("table");
        table.classList.add("table", "table-bordered", "table-hover", "table-striped");

        // Create table headers
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
        `;
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement("tbody");

        filteredProducts.forEach(function (product) {
            const row = document.createElement("tr");

            // Create and add table cells
            const imgCell = document.createElement("td");
            const img = new Image();
            img.src = product.image;
            img.setAttribute("alt", `${product.name} Image`);
            imgCell.appendChild(img);
            row.appendChild(imgCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = product.name;
            row.appendChild(nameCell);

            const priceCell = document.createElement("td");
            priceCell.textContent = `$ ${product.price.toFixed(2)}`;
            row.appendChild(priceCell);

            const descCell = document.createElement("td");
            descCell.textContent = product.description;
            descCell.style.textAlign = "justify";
            row.appendChild(descCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        productList.appendChild(table);
    }

    searchInput.addEventListener("input", displayProducts);
    sortSelect.addEventListener("change", displayProducts);

    fetchProducts();
});
