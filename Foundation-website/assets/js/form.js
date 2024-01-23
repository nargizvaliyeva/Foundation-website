let BASE_URL = `http://localhost:8080`;
let form = document.querySelector("form");
let editId = null;
let arr;
let btnAsd = document.querySelector(".asd");
let btnDes = document.querySelector(".des");
const tbody = document.querySelector("tbody");
const search = document.querySelector(".search");
let allInputs = document.querySelectorAll("input");

async function getAllData(endPoint) {
  const res = await axios(`${BASE_URL}/${endPoint}`);
  arr = res.data;
  drawTable(res.data);
}
getAllData("products");

function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML += ` <td>${element.id}</td>
        <td><img class="picture" src="${element.imgUrl}" alt=""></td>
        <td>${element.title}</td>
        <td>${element.des}</td>
        <td><button onclick=deleteProducts("${element.id}",this)>Delete</button></td>
        <td><button onclick=editProducts("${element.id}")>Edit</button></td>`;
    tbody.append(trElement);
  });
}

search.addEventListener("input", function (event) {
  let filtered = arr.filter((item) =>
    item.title
      .toLocaleLowerCase()
      .includes(event.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

// btnAsd.addEventListener("click", function () {
//   let sorted = arr.sort((a, b) => (a.title > b.title ? -1 : 1));
//   drawTable(sorted);
// });
// btnDes.addEventListener("click", function () {
//   let sorted = arr.sort((a, b) => (b.title > a.title ? -1 : 1));
//   drawTable(sorted);
// });

async function deleteProducts(id, btn) {
  if (confirm("are u sure delete?")) {
    await axios.delete(`${BASE_URL}/products/${id}`);
    btn.parentElement.remove();
  }
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let obj = {
    title: allInputs[0].value,
    des: allInputs[1].value,
    imgUrl: allInputs[2].value,
  };
  if (!editId) {
    await axios.post(`${BASE_URL}/products`, obj);
  } else {
    console.log("edit");
    await axios.patch(`${BASE_URL}/products/${editId}`, obj);
  }
});
async function editProducts(id) {
  editId = id;
  let res = await axios(`${BASE_URL}/products/${id}`);
  console.log(res.data);
  allInputs[0].value = res.data.title;
  allInputs[1].value = res.data.des;
  allInputs[2].value = res.data.imgUrl;
}
