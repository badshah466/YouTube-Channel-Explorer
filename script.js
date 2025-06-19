let allChannels = [];

fetch('channels.json')
  .then(response => response.json())
  .then(data => {
    allChannels = data;
  })
  .catch(error => {
    console.error('Error loading channel data:', error);
  });

// Triggered when search is performed
function searchChannels(query) {
  const container = document.getElementById('channel-list');
  container.innerHTML = ''; // clear old results

  const filtered = allChannels.filter(channel =>
    channel.name.toLowerCase().includes(query.toLowerCase())
  );

  filtered.forEach(channel => {
    const logoURL = channel.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=FF0000&color=fff&rounded=true`;

    const card = document.createElement('div');
    card.style.cssText = `
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      max-width: 400px;
      margin: 20px auto;
    `;

    card.innerHTML = `
      <img src="${logoURL}" alt="${channel.name}" width="60" style="border-radius: 50%;" />
      <div>
        <a href="${channel.url}" target="_blank" style="text-decoration:none;color:#000;font-size:18px;font-weight:bold;">
          ${channel.name}
        </a>
        <p style="margin:4px 0;color:#555;">${channel.subs} subscribers</p>
      </div>
    `;

    container.appendChild(card);
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: gray;">No channels found for "${query}"</p>`;
  }
}
