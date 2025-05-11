// const link2 = document.querySelectorAll(".link2")
// link2.forEach((elem, index) => {
//   elem.onclick = (e) => {
//     e.preventDefault()
//   }
// })


// Массив объектов с категориями
const translations = {
  en: {
    obj: [
      { category: "Styling", name: "Curling iron", duration: "60", price1: "4000", price2: "10000" },
      { category: "Styling", name: "Evening hairstyle", duration: "25", price1: "10000", price2: "15000" },
      { category: "Styling", name: "Wedding hairstyle", duration: "20", price1: "15000", price2: "25000" },
      { category: "Styling", name: "Keratin straightening", duration: "15", price1: "20000", price2: "50000" },
      { category: "Haircut", name: "Haircut", duration: "35", price1: "2000", price2: "4000" },
      { category: "Haircut", name: "Blow dry", duration: "45", price1: "2000", price2: "5000" },
      { category: "Haircut", name: "Mixed blow dry", duration: "45", price1: "3000", price2: "6000" },
      { category: "Coloring", name: "Bleaching and coloring", duration: "15", price1: "10000", price2: "15000" },
      { category: "Coloring", name: "Highlighting (balayage, shatush)", duration: "15", price1: "15000", price2: "50000" },
      { category: "Coloring", name: "Hair coloring", duration: "15", price1: "5000", price2: "8000" }
    ]
  },
  am: {
    obj: [
      { category: "Ուրձգնում", name: "Մազել ոլորող", duration: "60", price1: "4000", price2: "10000" },
      { category: "Ուրձգնում", name: "Երեկոյան սանրվածք", duration: "25", price1: "10000", price2: "15000" },
      { category: "Ուրձգնում", name: "Հարսանեկան սանրվածք", duration: "20", price1: "15000", price2: "25000" },
      { category: "Ուրձգնում", name: "Կերատինային հարդարում", duration: "15", price1: "20000", price2: "50000" },
      { category: "Հարդարում", name: "Մազերի կտրում", duration: "35", price1: "2000", price2: "4000" },
      { category: "Հարդարում", name: "Փչով չորացում", duration: "45", price1: "2000", price2: "5000" },
      { category: "Հարդարում", name: "Խառը չորացում", duration: "45", price1: "3000", price2: "6000" },
      { category: "Ներկում", name: "Մազերի բացում և ներկում", duration: "15", price1: "10000", price2: "15000" },
      { category: "Ներկում", name: "Լուսավորող տեխնիկաներ", duration: "15", price1: "15000", price2: "50000" },
      { category: "Ներկում", name: "Մազերի ներկում", duration: "15", price1: "5000", price2: "8000" }
    ]
  },
  ru: {
    obj: [
      { category: "Укладка", name: "Щипци", duration: "60", price1: "4000", price2: "10000" },
      { category: "Укладка", name: "Вечерняя прическа", duration: "25", price1: "10000", price2: "15000" },
      { category: "Укладка", name: "Свадебная прическа", duration: "20", price1: "15000", price2: "25000" },
      { category: "Укладка", name: "Кератиновое выравнивание", duration: "15", price1: "20000", price2: "50000" },
      { category: "Стрижка", name: "Стрижка волос", duration: "35", price1: "2000", price2: "4000" },
      { category: "Стрижка", name: "Фен", duration: "45", price1: "2000", price2: "5000" },
      { category: "Стрижка", name: "Смешанный фен", duration: "45", price1: "3000", price2: "6000" },
      { category: "Окрашивания", name: "Обесцвечивание окрашивание", duration: "15", price1: "10000", price2: "15000" },
      { category: "Окрашивания", name: "Осветление в технике (миллировка, шатуш, выметание)", duration: "15", price1: "15000", price2: "50000" },
      { category: "Окрашивания", name: "Окрашивание волос", duration: "15", price1: "5000", price2: "8000" }
    ]
  }
};

const translatableElements = document.querySelectorAll('[data-translate="true"]');
const languagesSelect = document.getElementById("languagesSelect");
const container = document.querySelector(".bottom");
const search = document.getElementById("search");

languagesSelect.addEventListener("change", function () {
  translation();
  localStorage.setItem("language", languagesSelect.value);
});

function translation() {
  const language = languagesSelect.value;
  document.documentElement.lang = language;

  translatableElements.forEach(element => {
    const key = element.getAttribute("data-key");
    element.textContent = translations[language][key];
  });

  render(translations[language].obj);
}

window.addEventListener("load", function () {
  const activeLanguage = localStorage.getItem("language") || "en";
  languagesSelect.value = activeLanguage;
  translation();
});

function render(items) {
  container.innerHTML = "";

  const categories = [...new Set(items.map(item => item.category))];

  categories.forEach(category => {
    const divItems2 = document.createElement("div");
    divItems2.className = "items2";
    divItems2.setAttribute("data-category", category.toLowerCase());

    const categoryHeader = document.createElement("h2");
    categoryHeader.className = "category-name";
    categoryHeader.textContent = category;
    divItems2.id = category.toLowerCase();

    divItems2.appendChild(categoryHeader);

    const categoryItems = items.filter(item => item.category === category);

    categoryItems.forEach(item => {
      const divItem = document.createElement("div");
      const itemName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
      divItem.className = "items";

      divItem.innerHTML = `
        <h3 class="name">${itemName}</h3>
        <span class="duration">${item.duration}min</span>
        <p class="price">${item.price1}-${item.price2}դր</p>
      `;

      divItems2.appendChild(divItem);
    });

    container.appendChild(divItems2);
  });
}

search.addEventListener("input", (e) => {
  const value = e.target.value.trim().toLowerCase();
  const allCategories = document.querySelectorAll(".items2");

  allCategories.forEach(category => {
    const allItems = category.querySelectorAll(".items");
    let hasVisibleItems = false;

    allItems.forEach(item => {
      const name = item.querySelector(".name").textContent.toLowerCase();
      if (value === "" || name.includes(value)) {
        item.style.display = "block";
        hasVisibleItems = true;
      } else {
        item.style.display = "none";
      }
    });

    category.style.display = hasVisibleItems ? "flex" : "none";
  });
});
