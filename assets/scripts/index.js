// Options for GraphQL Query
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query: `
          query {
            art {
                id,
                title,
                content,
                thumbnail {url}
            }
          }
      `,
  }),
};
// Fetching the Paintings Data as JSON from the GraphCMS Endpoint
fetch(
  "https://api-us-east-1.graphcms.com/v2/ckyb9ipil15h201z2g4mj5kig/master",
  options
)
  .then((res) => res.json())
  .then((res) => populateHome(res.data));

// Populating the Home with the received Data
function populateHome(data) {
  // Returning if Query failed or Data is empty
  if (data.art.length <= 0)
    return document.body.classList.add("EmptySections");
  let root = document.querySelector("#sections"),
    navLinksRoot = document.querySelector("#navItems");
  // Looping through each Object in Data
  for (title in data) {
    // Adding NavLink for the dedicated Page
    navLinksRoot.innerHTML += `
        <li class="navItem">
            <a class="navLink" title="View ${title.toUpperCase()} Page" href="./${title}.html"><span>${title.toUpperCase()}</span></a>
        </li>
    `;
    // Adding a Section leading to the dedicated Page
    root.innerHTML += `
        <div id="${title}" class="slider scrollFade">
            <h1 id="${title}Heading">${title}</h1>
            <div class="splide">
                <div class="splide__track">
                    <ul class="splide__list">

                    </ul>
                </div>
            </div>
            <a class="viewMore" href="./${title}.html">Explore </a>
        </div>
    `;
    // Looping through each Post in an Object
    for (i = 0; i < data[title].length; i++) {
      // Adding each Post to the Slider
      document.querySelector(`#${title} .splide__list`).innerHTML += `
            <li class="post splide__slide ${data[title][i].id} scrollFade" onclick='toggleDescription("${data[title][i].id}")'>
                <img src="${data[title][i].thumbnail.url}" alt="${data[title][i].title}">
            </li>
        `;
      // Creating a Page for each Post
      document.querySelector("#pages").innerHTML += `
      <div class="PaintingDescription ${data[title][i].id}">
        <div class="CloseIcon" onclick="toggleDescription('${data[title][i].id}')"></div>
        <div class="PaintingContainer">
          <img src="${data[title][i].thumbnail.url}" alt="${data[title][i].title}" title="${data[title][i].title}">
        </div>
        <div class="DescriptionText">
          <h1>${data[title][i].title}</h1>
          <p>${data[title][i].content}</p>
          <div class="Links">
            <a href="https://opensea.io/" title="Raghavan's OpenSea Profile">
            <svg viewBox="0 0 50 50" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg">
              <path d="m50 25c0 13.8-11.2 25-25 25s-25-11.2-25-25 11.2-25 25-25 25 11.2 25 25z" fill="#2081E2"/>
              <path d="m12.349 25.85 0.1-0.15 6.5-10.15c0.1-0.15 0.3-0.15 0.4 0.05 1.1 2.45 2 5.45 1.6 7.35-0.2 0.8-0.7 1.85-1.3 2.8-0.05 0.15-0.15 0.3-0.25 0.4-0.05 0.05-0.1 0.1-0.2 0.1h-6.7c-0.15-0.05-0.25-0.25-0.15-0.4z" fill="#fff"/>
              <path d="m41.299 27.75v1.6c0 0.1-0.05 0.15-0.15 0.2-0.5 0.2-2.25 1-2.95 2-1.85 2.55-3.25 6.2-6.35 6.2h-13.05c-4.6 0-8.35-3.75-8.35-8.4v-0.15c0-0.1 0.1-0.2 0.2-0.2h7.35c0.15 0 0.25 0.15 0.25 0.25-0.05 0.45 0.05 0.95 0.25 1.4 0.45 0.9 1.35 1.4 2.3 1.4h3.6v-2.8h-3.55c-0.2 0-0.3-0.2-0.2-0.35 0.05-0.05 0.1-0.1 0.15-0.2 0.35-0.5 0.8-1.2 1.3-2.05 0.35-0.55 0.65-1.2 0.9-1.8 0.05-0.1 0.1-0.2 0.15-0.35 0.05-0.2 0.15-0.4 0.2-0.55l0.15-0.45c0.1-0.5 0.15-1.05 0.15-1.65 0-0.2 0-0.45-0.05-0.7 0-0.25-0.05-0.5-0.05-0.75 0-0.2-0.05-0.45-0.1-0.65-0.05-0.35-0.1-0.65-0.2-1l-0.05-0.1c-0.05-0.2-0.1-0.45-0.2-0.65-0.2-0.7-0.45-1.4-0.7-2l-0.3-0.75c-0.15-0.35-0.3-0.7-0.45-1-0.05-0.15-0.15-0.25-0.2-0.4s-0.15-0.3-0.2-0.45l-0.15-0.3-0.45-0.8c-0.05-0.1 0.05-0.25 0.15-0.2l2.75 0.75 0.35 0.1 0.4 0.1 0.15 0.05v-1.65c0-0.8 0.65-1.45 1.4-1.45 0.4 0 0.75 0.15 1 0.4s0.4 0.6 0.4 1v2.4l0.3 0.1s0.05 0 0.05 0.05c0.05 0.05 0.15 0.15 0.3 0.25 0.1 0.1 0.2 0.2 0.35 0.3 0.25 0.2 0.6 0.5 0.95 0.8 0.1 0.1 0.2 0.15 0.25 0.25 0.45 0.4 0.95 0.9 1.45 1.45 0.15 0.15 0.25 0.3 0.4 0.45s0.25 0.35 0.4 0.5c0.15 0.2 0.35 0.45 0.5 0.65 0.05 0.1 0.15 0.2 0.2 0.35 0.2 0.3 0.35 0.6 0.55 0.9 0.05 0.15 0.15 0.3 0.2 0.45 0.2 0.4 0.35 0.8 0.4 1.25 0.05 0.1 0.05 0.2 0.05 0.25 0.05 0.1 0.05 0.25 0.05 0.4 0.05 0.45 0 0.85-0.05 1.3-0.05 0.2-0.1 0.35-0.15 0.55-0.05 0.15-0.1 0.35-0.2 0.55-0.15 0.35-0.35 0.7-0.55 1.05-0.05 0.1-0.15 0.25-0.25 0.4s-0.2 0.25-0.25 0.4c-0.1 0.15-0.25 0.3-0.35 0.45s-0.2 0.3-0.35 0.45c-0.15 0.2-0.35 0.4-0.5 0.6-0.1 0.1-0.2 0.25-0.35 0.35-0.1 0.1-0.2 0.25-0.35 0.35-0.15 0.15-0.3 0.3-0.45 0.4l-0.3 0.25c-0.05 0.05-0.1 0.05-0.15 0.05h-2.2v2.8h2.75c0.6 0 1.2-0.2 1.65-0.6 0.15-0.15 0.85-0.75 1.7-1.65 0.05-0.05 0.05-0.05 0.1-0.05l7.6-2.2c0.3-0.15 0.4-0.05 0.4 0.1z" fill="#fff"/>
            </svg>            
            </a>
            <a href="https://instagram.com" title="Raghavan's Instagram Profile">
              <svg fill="none" viewBox="0 0 50 50" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <use fill="url(#c)" xlink:href="#a"/>
                <use fill="url(#b)" xlink:href="#a"/>
                <path d="M18.861 25.107c0-3.419 2.771-6.192 6.191-6.192s6.192 2.773 6.192 6.192-2.773 6.192-6.192 6.192-6.191-2.773-6.191-6.192h0zm-3.347 0a9.54 9.54 0 0 0 9.538 9.538 9.54 9.54 0 0 0 9.538-9.538 9.54 9.54 0 0 0-9.538-9.538 9.54 9.54 0 0 0-9.538 9.538h0zm17.225-9.916a2.23 2.23 0 0 0 1.375 2.06 2.23 2.23 0 0 0 2.429-.482 2.23 2.23 0 0 0 .484-2.429 2.23 2.23 0 0 0-2.059-1.377h-.001a2.23 2.23 0 0 0-2.229 2.228h0zM17.547 40.226c-1.811-.082-2.795-.384-3.45-.639-.867-.338-1.486-.74-2.137-1.389a5.73 5.73 0 0 1-1.389-2.135c-.255-.654-.557-1.639-.639-3.45l-.108-7.507.108-7.507c.083-1.811.386-2.794.639-3.45a5.77 5.77 0 0 1 1.389-2.137c.65-.651 1.268-1.053 2.137-1.389.654-.255 1.639-.557 3.45-.639l7.504-.108 7.507.108c1.811.082 2.794.386 3.45.639.867.336 1.486.74 2.136 1.39a5.75 5.75 0 0 1 1.39 2.137c.255.654.557 1.639.639 3.45l.108 7.507-.108 7.507c-.082 1.811-.386 2.795-.639 3.449-.338.867-.74 1.486-1.39 2.135a5.77 5.77 0 0 1-2.136 1.389c-.654.255-1.639.557-3.45.639l-7.507.108s-5.547-.018-7.504-.108h0zm-.154-33.583c-1.977.09-3.329.404-4.509.863-1.221.474-2.257 1.11-3.291 2.143s-1.668 2.068-2.143 3.29c-.459 1.181-.773 2.531-.863 4.509s-.112 2.614-.112 7.658l.112 7.658c.09 1.978.404 3.328.863 4.509a9.08 9.08 0 0 0 2.143 3.29c1.034 1.032 2.068 1.667 3.291 2.143 1.182.459 2.531.773 4.509.863s2.614.112 7.658.112 5.678-.021 7.658-.112 3.328-.404 4.509-.863c1.221-.476 2.257-1.11 3.29-2.143s1.667-2.069 2.143-3.29c.459-1.181.774-2.531.863-4.509s.111-2.614.111-7.658l-.111-7.658c-.09-1.978-.404-3.329-.863-4.509-.475-1.221-1.11-2.257-2.143-3.29S38.44 7.981 37.22 7.507c-1.182-.459-2.533-.774-4.509-.863s-2.614-.112-7.657-.112-5.678.021-7.66.112" fill="#fff"/>
                <defs>
                <radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="translate(3.236 48.905) scale(63.481)" gradientUnits="userSpaceOnUse">
                <stop stop-color="#fa8f21" offset=".09"/>
                <stop stop-color="#d82d7e" offset=".78"/>
                </radialGradient>
                <radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="matrix(55.864 0 0 55.864 34.633 47.299)" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8c3aaa" stop-opacity="0" offset=".64"/>
                <stop stop-color="#8c3aaa" offset="1"/>
                </radialGradient>
                <path id="a" d="M12.679 49.823c-2.974-.135-4.589-.63-5.663-1.049a9.47 9.47 0 0 1-3.507-2.281 9.4 9.4 0 0 1-2.281-3.506c-.419-1.074-.914-2.69-1.049-5.663C.03 34.11 0 33.146 0 25.002l.177-12.323C.312 9.705.81 8.093 1.226 7.015a9.51 9.51 0 0 1 2.281-3.508 9.41 9.41 0 0 1 3.507-2.281C8.088.807 9.704.312 12.677.177 15.893.03 16.859 0 24.999 0l12.324.177c2.974.135 4.586.633 5.663 1.049 1.424.551 2.439 1.214 3.507 2.281a9.44 9.44 0 0 1 2.281 3.507c.419 1.074.914 2.69 1.049 5.663.147 3.217.177 4.18.177 12.324l-.177 12.324c-.135 2.974-.633 4.589-1.049 5.663-.554 1.424-1.214 2.439-2.281 3.506a9.46 9.46 0 0 1-3.507 2.281c-1.074.419-2.69.914-5.663 1.049-3.214.147-4.18.177-12.323.177s-9.106-.028-12.321-.177"/>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
      `;
    }
    // Initializing the Slider
    new Splide(`#${title} .splide`, {
      perMove: 1,
      autoWidth: true,
      
    }).mount();
  }
}
function toggleDescription(identifier) {
  setTimeout(() => {
    window.scrollTo(0, 0);  
    if (!document.querySelector(`.${identifier}.PaintingDescription`).classList.contains("DescriptionOpen")) {
      window.scrollTo(0, document.body.offsetHeight);
    }
  }, 400);
  document
    .querySelector(`.${identifier}.PaintingDescription`)
    .classList.toggle("DescriptionOpen");
  document.body.classList.toggle("EmptyBody");
  if (!document.querySelector(`.${identifier}.PaintingDescription`).classList.contains("DescriptionOpen")) {
    window.scrollTo(0, document.body.offsetHeight);
  }
}