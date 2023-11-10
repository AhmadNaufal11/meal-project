function fetchDataByCategory(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
        const strCategoryElement = document.getElementById('strCategory');
        const strNameElement = document.getElementById('strName');
        const mealImageElement = document.getElementById('mealImage');
  
        if (data.meals && data.meals.length > 0) {
          strCategoryElement.textContent = category;
  
          // Clear the existing table rows
          const tableBody = document.querySelector('table tbody');
          tableBody.innerHTML = '';
  
          // Create a table row for each meal
          data.meals.forEach((meal) => {
            const newRow = tableBody.insertRow();
            const newCategoryCell = newRow.insertCell(0);
            const newNameCell = newRow.insertCell(1);
            const newImageCell = newRow.insertCell(2);
  
            newCategoryCell.textContent = category;
            newNameCell.innerHTML = `<a href="meal.html?meal=${meal.strMeal}">${meal.strMeal}</a>`;
            
            // Add inline style to the image for smaller size
            newImageCell.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal} Image" style="max-width: 100px; max-height: 100px;">`;
          });
        } else {
          strCategoryElement.textContent = "No results found";
          strNameElement.textContent = "";
  
          // Clear the table when there are no results
          const tableBody = document.querySelector('table tbody');
          tableBody.innerHTML = '';
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
        const strCategoryElement = document.getElementById('strCategory');
        const strNameElement = document.getElementById('strName');
        strCategoryElement.textContent = "Error fetching data.";
        strNameElement.textContent = "";
  
        // Clear the table on error
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = '';
      });
  }
  
document.getElementById("dropdownButton").addEventListener("click", function () {
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
    