function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);

  function truncate(text, max = 150) {
  return text.length > max ? text.slice(0, max) + "..." : text;
}
  
  function getListingCode(listing) {
    const amenities = JSON.parse(listing.amenities)
    .slice(0, 5)
    .map(a => `<span class="badge bg-secondary me-1">${a}</span>`)
    .join("");
    
    return `<div class="col-4">
  <div class="listing card">
    <img
      src=${listing.picture_url}
      class="card-img-top"
      alt=${listing.name}
    />
    <div class="card-body">
      <h2 class="card-title">${listing.name}</h2>
      <div class="d-flex align-items-center mb-2">
            <img
              src="${listing.host_thumbnail_url}"
              alt="${listing.host_name}"
              class="rounded-circle me-2"
              width="40"
              height="40"
            />
            <small>Hosted by <strong>${listing.host_name}</strong></small>
          </div>
      <div>${listing.price}</div>
      <p class="card-text">
        ${truncate(listing.description)}
      </p>
      <p>
        ${amenities}
      </p>
      <a href="#" class="btn btn-primary">Return To Top</a>
    </div>
  </div>
  <!-- /card -->
  </div>

  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();


    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();