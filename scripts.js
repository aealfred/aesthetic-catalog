let allLocations = []

//JSON DATA
fetch('ca_architecture_catalog_full.json')
  .then(response => response.json())
  .then(data => {
    allLocations = data;
    createCatalog(data);
  })
  .catch(error => console.error("Error loading JSON:", error));

function createCatalog(locations) {
  const cardContainer = document.getElementById("catalog-container");
  cardContainer.innerHTML = '';
  locations.forEach((item, index) => {
    console.log(`Rendering #${index + 1}: ${item.name}`);


    const card = document.createElement('div')
    card.className = 'catalog-item'
    const img = document.createElement('img');
    img.src = item.images[0]; 
    img.alt = item.name;
    img.className = 'catalog-image';

 

  card.appendChild(img);
  card.innerHTML += `
  <div class="catalog-title">${item.name}</div>
  <div class="catalog-meta">${item.location} • ${item.style} • ${item.year_made}</div>
  <p class="catalog-summary">${item.summary}</p>
  `;
  cardContainer.appendChild(card); // ADD NEW CARD TO CONTAINER
  }); 
}

function filterCatalog() {
  const styleFilter = document.getElementById('style-filter').value;
  const locationFilter = document.getElementById('location-filter').value;
  console.log('Filtering by Style ${styleFilter}, Location: ${locationFilter}');
  let filteredLocations = allLocations;

  if (styleFilter !== 'All') {
    filteredLocations = filteredLocations.filter(location => location.style === styleFilter);
  }
  if (locationFilter !== 'All') {
    filteredLocations = filteredLocations.filter(location => location.location === locationFilter);
  }
  createCatalog(filteredLocations);
}
