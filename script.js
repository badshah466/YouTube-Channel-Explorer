function parseSubs(subText) {
  if (subText.includes('M')) return parseFloat(subText) * 1_000_000;
  if (subText.includes('K')) return parseFloat(subText) * 1_000;
  return parseFloat(subText);
}

function searchChannels() {
  const keyword = document.getElementById('keyword').value.toLowerCase();
  const subsRange = document.getElementById('subsRange').value;
  const country = document.getElementById('country').value.toLowerCase();
  const container = document.getElementById('channel-list');
  container.innerHTML = '';

  const filtered = allChannels.filter(channel => {
    const nameMatch = channel.name.toLowerCase().includes(keyword);
    const countryMatch = !country || (channel.country && channel.country.toLowerCase().includes(country));
    
    let subsMatch = true;
    const subs = parseSubs(channel.subs);

    if (subsRange === '1-10K') subsMatch = subs >= 1000 && subs <= 10000;
    else if (subsRange === '10K-100K') subsMatch = subs >= 10000 && subs <= 100000;
    else if (subsRange === '100K-1M') subsMatch = subs >= 100000 && subs <= 1000000;
    else if (subsRange === '1M+') subsMatch = subs >= 1000000;

    return nameMatch && subsMatch && countryMatch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: gray;">No channels found</p>`;
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
}
