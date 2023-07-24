fetch("https://fakestoreapi.com/users")
  .then((response) => response.json())
  .then((data) => console.log(data));

document.addEventListener("DOMContentLoaded", function () {
  // API URL
  const apiUrl = "https://data.covid19india.org/v4/min/data.min.json";
  // Function to fetch API data and populate the table
  function fetchDataAndPopulateTable() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const tbody = document.getElementById("tbody");
        console.log(data);
        // Loop through the states and populate the table
        for (const state in data) {
          const stateData = data[state];
          const popul = stateData.meta.population;
          const confirmed = stateData.total.confirmed || 0;
          const active =
            confirmed -
            (stateData.total.recovered || 0) -
            (stateData.total.deceased || 0);
          const recovered = stateData.total.recovered || 0;
          const deaths = stateData.total.deceased || 0;
          const tableRow = `
                        <tr>
                            <td>${state}</td>
                            <td>${popul}</td>
                            <td>${confirmed}</td>
                            <td>${active}</td>
                            <td>${recovered}</td>
                            <td>${deaths}</td>
                        </tr>
                    `;

          tbody.insertAdjacentHTML("beforeend", tableRow);
          $("#covid-table").DataTable();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  fetchDataAndPopulateTable();
});
