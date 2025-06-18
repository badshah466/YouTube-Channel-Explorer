async function filterChannels() {
  const keyword = document.getElementById('keyword').value.toLowerCase();
  const subRange = document.getElementById('subscribers').value;
  const country = document.getElementById('country').value;

  const res = await fetch('channels.json');
  const data = await res.json();

  const filtered = data.filter(channel => {
    const matchesKeyword = channel.keyword.toLowerCase().includes(keyword);
    const matchesCountry = country === '' || channel.country === country;

    let matchesSubs = true;
    if (subRange) {
      const [min, max] = subRange.split('-').map(Number);
      matchesSubs = channel.subscribers >= min * 1000 && channel.subscribers <= max * 1000;
    }

    return matchesKeyword && matchesCountry && matchesSubs;
  });

  displayResults(filtered);
}

function displayResults(channels) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (channels.length === 0) {
    container.innerHTML = '<p>No channels found.</p>';
    return;
  }

  channels.forEach(ch => {
    container.innerHTML += `
      <div class="channel-card">
        <h3>${ch.name}</h3>
        <p>Subscribers: ${ch.subscribers.toLocaleString()}</p>
        <p>Country: ${ch.country}</p>
        <a href="${ch.link}" target="_blank">Visit Channel</a>
      </div>
    `;
  });
}
