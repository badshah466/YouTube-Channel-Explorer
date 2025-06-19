fetch('channels.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('channel-list');

    data.forEach(channel => {
      const channelId = channel.url.split('/').pop();

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
        <img src="https://yt3.ggpht.com/ytc/${channelId}=s88-c-k-c0x00ffffff-no-rj" alt="${channel.name}" width="60" style="border-radius:50%;" />
        <div>
          <a href="${channel.url}" target="_blank" style="text-decoration:none;color:#000;font-size:18px;font-weight:bold;">
            ${channel.name}
          </a>
          <p style="margin:4px 0;color:#555;">${channel.subs} subscribers</p>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading channel data:', error);
  });
