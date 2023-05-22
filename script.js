// Retrieve cars from local storage or use sample data
let cars = JSON.parse(localStorage.getItem('cars')) || [
  { brand: 'Toyota', price: 10000, km: 50000, year: 2018, photo: 'car1.jpg' },
  { brand: 'Honda', price: 8000, km: 60000, year: 2017, photo: 'car2.jpg' },
  { brand: 'Ford', price: 12000, km: 70000, year: 2019, photo: 'car3.jpg' },
  { brand: 'Chevrolet', price: 15000, km: 80000, year: 2016, photo: 'car4.jpg' }
];

// Display cars
function displayCars(cars) {
  const carList = document.getElementById('car-list');
  carList.innerHTML = '';

  cars.forEach(car => {
    const carCard = document.createElement('div');
    carCard.classList.add('car-card');

    const carImage = document.createElement('img');
    carImage.src = car.photo;
    carCard.appendChild(carImage);

    const carTitle = document.createElement('h3');
    carTitle.textContent = car.brand;
    carCard.appendChild(carTitle);

    const carPrice = document.createElement('p');
    carPrice.innerHTML = `<strong>Price:</strong> $${car.price}`;
    carCard.appendChild(carPrice);

    const carKm = document.createElement('p');
    carKm.innerHTML = `<strong>KM:</strong> ${car.km}`;
    carCard.appendChild(carKm);

    const carYear = document.createElement('p');
    carYear.innerHTML = `<strong>Year:</strong> ${car.year}`;
    carCard.appendChild(carYear);

    carList.appendChild(carCard);
  });
}

// Filter cars based on search criteria
function filterCars(brand, price) {
  const filteredCars = cars.filter(car => {
    if (brand && price) {
      return car.brand.toLowerCase().includes(brand.toLowerCase()) && car.price <= price;
    } else if (brand) {
      return car.brand.toLowerCase().includes(brand.toLowerCase());
    } else if (price) {
      return car.price <= price;
    } else {
      return true;
    }
  });

  displayCars(filteredCars);
}

// Handle search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const brandInput = document.getElementById('brand-input');
  const priceInput = document.getElementById('price-input');
  const brand = brandInput.value.trim();
  const price = parseFloat(priceInput.value.trim());

  filterCars(brand, price);
});

// Display all cars on initial page load
displayCars(cars);

// Admin panel - Add car form
const addCarForm = document.getElementById('add-car-form');
addCarForm.addEventListener('submit', event => {
  event.preventDefault();
  const brandInput = document.getElementById('brand');
  const priceInput = document.getElementById('price');
  const kmInput = document.getElementById('km');
  const yearInput = document.getElementById('year');
  const photoInput = document.getElementById('photo');

  const brand = brandInput.value.trim();
  const price = parseFloat(priceInput.value.trim());
  const km = parseInt(kmInput.value.trim());
  const year = parseInt(yearInput.value.trim());
  const photo = photoInput.value.trim();

  const newCar = { brand, price, km, year, photo };
  cars.push(newCar);
  localStorage.setItem('cars', JSON.stringify(cars));

  brandInput.value = '';
  priceInput.value = '';
  kmInput.value = '';
  yearInput.value = '';
  photoInput.value = '';

  alert('Car added successfully!');
});
