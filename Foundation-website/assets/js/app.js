const BASE_URL = `http://localhost:8080`;
const card = document.querySelector(".card");
let arr;

async function getAllData(endPoint) {
  const res = await axios(`${BASE_URL}/${endPoint}`);
  arr = res.data;
  console.log(res.data);
  drawCard(res.data);
}
getAllData("products");

function drawCard(data) {
  card.innerHTML = "";
  data.forEach(
    (element) =>
      (card.innerHTML += ` <div class="banner">
    <img src="${element.imgUrl}" alt="">
    <h3>${element.title}</h3>
    <p>${element.des}</p>
    <a href="./details.html?id=${element.id}">details</a>
</div>`)
  );
}
