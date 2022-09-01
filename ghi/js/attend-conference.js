window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');
  
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
  
      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
      const loading = document.getElementById('loading-conference-spinner');
      // Here, add the 'd-none' class to the loading icon
      loading.classList.add('d-none')
    // Here, remove the 'd-none' class from the select tag
      selectTag.classList.remove('d-none')
      
    }
    const attendTag = document.getElementById('create-attendee-form');
    attendTag.addEventListener('submit', async event => {
      event.preventDefault();

      const attendData = new FormData(attendTag);
      const json = JSON.stringify(Object.fromEntries(attendData));

      const attendURL = 'http://localhost:8001/api/attendees/';
      const fetchConfig = {
        method: "post",
        body: json,
        headers: {
            'Content-Type': 'application/json',
        },
      };
      const response = await fetch(attendURL, fetchConfig);
      if (response.ok) {
        attendTag.classList.add('d-none');
        const success = document.getElementById('success-message');
        success.classList.remove('d-none');
        attendTag.reset();
        const newAttendee = await response.json();
        console.log(newAttendee);
      }
    })
  });