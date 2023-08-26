import { Food } from "../../models/v2/Model.js";

export const BASE_URL = "https://64d6fb222a017531bc12e7c8.mockapi.io/food";
const MON_CHAY = true;
const CON_HANG = true;

export let fetchFoods = () => {
  axios
    .get(BASE_URL)
    .then((result) => {
      renderFood(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export let renderFood = (data) => {
  let contentHTML = "";
  data.reverse().forEach((el) => {
    let { id, name, price, type, sale, state, desc, imgSrc } = el;

    let contentTr = /*html*/ `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${type == MON_CHAY ? "Chay" : "Mặn"}</td>
            <td>${price.toLocaleString()} vnđ</td>
            <td>${sale == true ? "20%" : "10%"}</td>
            <td>${Math.floor(
              price * (sale ? 0.8 : 0.9)
            ).toLocaleString()} vnđ</td>
            <td class=${state == CON_HANG ? "" : "text-danger"}>${
      state == CON_HANG ? "Còn hàng" : "Hết hàng"
    }</td>
        <td>
        <button class="btn btn-info" onclick="editFood(${id})">Sửa</button>
        <button class="btn btn-danger" onclick="deleteFood(${id})">Xóa</button>
        
        </td>
        </tr>
    
    `;
    contentHTML += contentTr;
  });
  document.getElementById("tbodyFood").innerHTML = contentHTML;
};

export let getDataForm = () => {
  let id = document.getElementById("foodID").value;
  let name = document.getElementById("tenMon").value;
  let type = document.getElementById("loai").value;
  let price = document.getElementById("giaMon").value * 1;
  let sale = document.getElementById("khuyenMai").value * 1;
  let state = document.getElementById("tinhTrang").value;
  let image = document.getElementById("hinhMon").value;
  let desc = document.getElementById("moTa").value;
  return new Food(id, name, price, type, sale, state, desc, image);
};

export let showDataForm = (data) => {
  let { id, name, price, type, sale, state, desc, imgSrc } = data;
  document.getElementById("foodID").value = id;
  document.getElementById("tenMon").value = name;
  document.getElementById("loai").value = type == MON_CHAY ? "loai1" : "loai2";
  document.getElementById("giaMon").value = price;
  document.getElementById("khuyenMai").value = sale == true ? 0.2 : 0.1;
  document.getElementById("tinhTrang").value = state == true ? "1" : "0";
  document.getElementById("hinhMon").value = imgSrc;
  document.getElementById("moTa").value = desc;
};

export let resetData = () => {
  document.getElementById("foodID").value = "";
  document.getElementById("tenMon").value = "";
  document.getElementById("loai").value = "";
  document.getElementById("giaMon").value = "";
  document.getElementById("khuyenMai").value = "";
  document.getElementById("tinhTrang").value = "";
  document.getElementById("hinhMon").value = "";
  document.getElementById("moTa").value = "";
  document.getElementById("foodID").readOnly = false;
};

export let showToastMessage = (msg, isSuccess = true) => {
  Toastify({
    text: msg,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    gravity: "top", // `top` or `bottom`
    position: "right  ", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: isSuccess ? "green" : "red",
      color: "#fff",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};
