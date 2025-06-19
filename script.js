let allChannels = [];

fetch('channels.json')
  .then(res => res.json())
  .then(data => {
    allChannels = data;
  });

function filterByTag(tag) {
  const container = document.getElementById('channel-list');
  container.innerHTML = '';

  const filtered = allChannels.filter(channel =>
    channel.niche && channel.niche.toLowerCase() === tag.toLowerCase()
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: gray;">No channels found for ${tag}</p>`;
    return;
  }

  filtered.forEach(channel => {
    const logoURL = channel.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=FF0000&color=fff&rounded=true`;

    const card = document.createElement('div');
    card.style.cssText = `
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 10px;
      margin: 20px auto;
      max-width: 400px;
    `;

    card.innerHTML = `
      <img src="${logoURL}" alt="${channel.name}" width="60" />
      <div>
        <a href="${channel.url}" target="_blank" style="font-weight: bold; font-size: 18px; color: #000; text-decoration: none;">${channel.name}</a>
        <p style="margin: 4px 0; color: #555;">${channel.subs} subscribers</p>
        <p style="margin: 0; color: #999;">${channel.country}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
