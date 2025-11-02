
      // ---------- Sidebar Navigation ----------
const menuItems = document.querySelectorAll('.menu li');
const sections = document.querySelectorAll('.section');

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Remove active states
    menuItems.forEach(i => i.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    // Activate clicked item
    item.classList.add('active');
    const sectionId = item.getAttribute('data-section');
    document.getElementById(sectionId).classList.add('active');
  });
});

// ---------- Product Management ----------
let products = [
  { id: 1, name: "Product A", price: 120, stock: 25, supplier: "ABC Ltd" },
  { id: 2, name: "Product B", price: 80, stock: 40, supplier: "XYZ Traders" },
  { id: 3, name: "Product C", price: 150, stock: 12, supplier: "FreshCo" },
];

const productTable = document.getElementById("productTable");
const addProductBtn = document.getElementById("addProduct");
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const stockInput = document.getElementById("productStock");
const supplierInput = document.getElementById("productSupplier");

function renderProducts() {
  productTable.innerHTML = "";
  products.forEach((p, i) => {
    const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>$${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.supplier}</td>
        <td>
          <button onclick="editProduct(${p.id})">✏</button>
          <button onclick="deleteProduct(${p.id})">🗑</button>
        </td>
      </tr>
    `;
    productTable.insertAdjacentHTML('beforeend', row);
  });
}

addProductBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const stock = Number(stockInput.value);
  const supplier = supplierInput.value.trim();

  if (!name || !price || !stock || !supplier) {
    alert("Please fill all fields!");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price,
    stock,
    supplier
  });

  nameInput.value = priceInput.value = stockInput.value = supplierInput.value = "";
  renderProducts();
  updateChart();
});

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  renderProducts();
  updateChart();
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    nameInput.value = product.name;
    priceInput.value = product.price;
    stockInput.value = product.stock;
    supplierInput.value = product.supplier;
    deleteProduct(id);
  }
}

// ---------- Supplier Management ----------
let suppliers = [
  { name: "ABC Ltd", contact: "abc@gmail.com", lastSupply: "2025-10-28" },
  { name: "XYZ Traders", contact: "xyz@gmail.com", lastSupply: "2025-10-30" }
];

const supplierTable = document.getElementById("supplierTable");
const addSupplierBtn = document.getElementById("addSupplier");
const sName = document.getElementById("supplierName");
const sContact = document.getElementById("supplierContact");
const sDate = document.getElementById("supplierDate");

function renderSuppliers() {
  supplierTable.innerHTML = "";
  suppliers.forEach((s, i) => {
    const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${s.name}</td>
        <td>${s.contact}</td>
        <td>${s.lastSupply}</td>
      </tr>
    `;
    supplierTable.insertAdjacentHTML('beforeend', row);
  });
}

addSupplierBtn.addEventListener("click", () => {
  const name = sName.value.trim();
  const contact = sContact.value.trim();
  const date = sDate.value;

  if (!name || !contact || !date) {
    alert("Fill all supplier fields!");
    return;
  }

  suppliers.push({ name, contact, lastSupply: date });
  sName.value = sContact.value = sDate.value = "";
  renderSuppliers();
});

// ---------- Chart Section ----------
const ctx = document.getElementById('stockChart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: products.map(p => p.name),
    datasets: [{
      label: 'Stock Quantity',
      data: products.map(p => p.stock),
      backgroundColor: '#ffb703'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

function updateChart() {
  chart.data.labels = products.map(p => p.name);
  chart.data.datasets[0].data = products.map(p => p.stock);
  chart.update();
}

// ---------- Initialize ----------
renderProducts();
renderSuppliers();
updateChart();