// @ts-nocheck

document.addEventListener("DOMContentLoaded", () => {
  let category = "select";
  var table = document.getElementsByClassName("table")[0];
  let selects = document.getElementById("selects");
  let fetchBtn = document.getElementById("fetchBtn");
  let inputBox = document.getElementsByClassName("searchBox")[0];

  fetchBtn.addEventListener("click", async (e) => {
    if (category !== "select" && inputBox?.value === "") {
      let data = await fetchData(`/category/${category}`);
      console.log(data.products);
      showData(data.products);
    } else if (category === "select" && inputBox?.value !== "") {
      let data = await fetchData(`/search?q=${inputBox.value}`);
      console.log(data);
      if (data.products.length === 0) {
        alert("no data found");
      }
      showData(data.products);
    } else if (category !== "select" && inputBox?.value !== "") {
      let data = await fetchData(`/search?q=${inputBox.value}`);
      console.log("this ====>");
      if (data.products.length === 0) {
        alert("no data found");
      }
      showData(data.products);
    } else {
      alert("please select a category or enter name");
    }
  });

  selects.addEventListener("change", async (e) => {
    // @ts-ignore
    category = e?.target?.value;
  });
  async function fetchData(apiEndPint) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `https://dummyjson.com/products${apiEndPint}`, true);
      xhr.onprogress = function () {
        console.log("loading");
      };
      xhr.onload = function () {
        const arr = [];
        if (xhr.status === 200) {
          const arr = JSON.parse(xhr.responseText);
          resolve(arr);
        } else {
          reject(`Error fetching data. Status: ${xhr.status}`);
        }
      };

      xhr.onerror = function () {
        reject(`Error fetching data. Status: ${xhr.status}`);
      };

      xhr.send();
    });
  }

  async function setCategory() {
    let cat = await fetchData("/categories");
    let select = document.getElementById("selects");
    for (let index = 0; index < cat.length; index++) {
      const element = cat[index];
      // @ts-ignore
      select.innerHTML += `<option value=${element} > ${element}</option>`;
    }
  }

  function showData(array) {
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      tbody.innerHTML += `<tr>
          <td>${element.id}</td>
          <td>${element.title}</td>
          <td>${element.brand}</td>
          <td>${element.category}</td>
          <td>${element.description}</td>
          <td>${element.discountPercentage}</td>
          <td>${element.price}</td>
          <td>${element.rating}</td>
          <td>${element.stock}</td>
          <td><img src="${element.thumbnail}" alt="${element.thumbnail}"></td>
          <td>${element.images.length}</td>      
          </tr>`;
    }
  }
  setCategory();
});
