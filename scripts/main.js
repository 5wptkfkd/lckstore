// 假設購物車的初始內容
let cart = [];

// 更新購物車顯示
function updateCartDisplay() {
    const cartTable = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartTable.innerHTML = ""; // 清空現有的內容
    if (cart.length === 0) {
        cartTable.innerHTML = "<tr><td colspan='6'>Your Cart is Empty</td></tr>";
        cartTotal.textContent = "Total: $0";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        // 動態建立表格行
        const row = document.createElement("tr");

        // 商品名稱
        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        // 商品型號
        const modelCell = document.createElement("td");
        modelCell.textContent = item.model;
        row.appendChild(modelCell);

        // 商品價格
        const priceCell = document.createElement("td");
        priceCell.textContent = `$${item.price}`;
        row.appendChild(priceCell);

        // 商品數量
        const quantityCell = document.createElement("td");
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.onchange = () => updateQuantity(index, quantityInput.value);
        quantityCell.appendChild(quantityInput);
        row.appendChild(quantityCell);

        // 小計
        const subtotalCell = document.createElement("td");
        subtotalCell.textContent = `$${subtotal}`;
        row.appendChild(subtotalCell);

        // 操作：刪除
        const actionsCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.onclick = () => removeFromCart(index);
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        // 將行添加到表格
        cartTable.appendChild(row);
    });

    // 更新總計
    cartTotal.textContent = `Total: $${total}`;
}

// 添加商品到購物車
function addToCart(selectedProduct, selectedModel, price, quantity) {
    const existingProduct = cart.find(
        item => item.name === selectedProduct && item.model === selectedModel
    );

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: selectedProduct, model: selectedModel, price, quantity });
    }

    updateCartDisplay();
}

// 初始化頁面時顯示購物車內容
window.onload = () => updateCartDisplay();
