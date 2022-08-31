function createCard(name, description, pictureUrl, location, starts, ends) {
    return `
    <div class="col-lg-4 col-md-6 col-6">
      <div class="card shadow m-2">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <hr>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">${starts} - ${ends}
        </div>
      </div>
      </div>
    `;
  }

  function errorMessage () {
    const row = document.querySelector('.row');
    row.innerHTML = `<div class="alert alert-danger" role="alert"> 
        Sorry, looks like something isn't properly functioning...
        </div>`;

  }

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            errorMessage();
        } else {
            const data = await response.json();
            
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                  const details = await detailResponse.json();
                  const name = details.conference.name;
                  const description = details.conference.description;
                  const pictureUrl = details.conference.location.picture_url;
                  const starts = new Date(details.conference.starts)
                  const newstarts = starts.toLocaleDateString()
                  const ends = new Date(details.conference.ends)
                  const newends = ends.toLocaleDateString()
                  const location = details.conference.location.name

                  const html = createCard(name, description, pictureUrl, location, newstarts, newends);
                  const row = document.querySelector('.row');
                  row.innerHTML += html;
                }
            }
        }
    } catch(e) {
        console.error(e);
        errorMessage();
    }
});
