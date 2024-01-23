let id = new URLSearchParams(window.location.search).get("id");

let BASE_URL = `http://localhost:8080`;
let products = document.querySelector(".products");

async function getData() {
  let res = await axios(`${BASE_URL}/products/${id}`);
  data = res.data;
  console.log(data);
  products.innerHTML = `<div class="banner">
    <img  src="${data.imgUrl}" alt="">
    <h3>${data.title}</h3>
    <p>${data.des}</p>
                    </div>`;
}
getData();
