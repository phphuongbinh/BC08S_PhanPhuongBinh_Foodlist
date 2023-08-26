import {
  BASE_URL,
  fetchFoods,
  getDataForm,
  renderFood,
  resetData,
  showDataForm,
  showToastMessage,
} from "./controller.js";

fetchFoods();

window.deleteFood = (id) => {
  axios
    .delete(`${BASE_URL}/${id}`)
    .then((result) => {
      showToastMessage("Xóa thành công", true);

      fetchFoods();
    })
    .catch((err) => {
      showToastMessage("Xóa món ăn thất bại", false);

      console.log(err);
    });
};

window.addFood = () => {
  let data = getDataForm();
  axios
    .post(BASE_URL, data)
    .then((result) => {
      $("#exampleModal").modal("hide");
      showToastMessage("Thêm thành công", true);

      fetchFoods();
    })
    .catch((err) => {
      showToastMessage("Thêm món ăn thất bại", false);

      console.log(err);
    });
};

window.editFood = (id) => {
  axios
    .get(`${BASE_URL}/${id}`)
    .then((result) => {
      $("#exampleModal").modal("show");
      document.getElementById("foodID").readOnly = true;

      showDataForm(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.updateFood = () => {
  let data = getDataForm();
  axios
    .put(`${BASE_URL}/${data.id}`, data)
    .then((result) => {
      $("#exampleModal").modal("hide");
      showToastMessage("Cập nhật thành công", true);

      resetData();
      fetchFoods();
    })
    .catch((err) => {
      showToastMessage("Cập nhật thất bại", false);

      console.log(err);
    });
};

window.resetData = resetData;
