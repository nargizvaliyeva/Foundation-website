let id = new URLSearchParams(window.location.search).get("id");

let BASE_URL = `http://localhost:8080`;
let products = document.querySelector(".products");

async function getData() {
  let res = await axios(`${BASE_URL}/products/${id}`);
  data = res.data;
  console.log(data);
  products.innerHTML = `<div class="banners">
    <img  src="${data.imgUrl}" alt="">
    <h4>${data.title}</h4>
    <h4>${data.des}</h4>
                    </div>`;
}
getData();
