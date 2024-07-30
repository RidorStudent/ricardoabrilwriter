function redirectTo(page) {
  window.location.href = page;
}


function searchContent() {
  let searchQuery = document.getElementById('search-bar').value.toLowerCase();
  let searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';

  if (searchQuery === '') {
    searchResults.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  let searchableElements = document.querySelectorAll('.searchable');
  let resultsFound = false;

  searchableElements.forEach(element => {
    if (element.innerText.toLowerCase().includes(searchQuery)) {
      let highlightedText = element.innerHTML.replace(
        new RegExp(searchQuery, 'gi'),
        match => `<span class="highlight">${match}</span>`
      );
      let resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.innerHTML = `<p>${highlightedText}</p>`;
      searchResults.appendChild(resultItem);
      resultsFound = true;
    }
  });

  if (!resultsFound) {
    searchResults.innerHTML = '<p>No results found.</p>';
  }
}




function openModal(src, type) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.onclick = function () {
    document.body.removeChild(modal);
  };

  let modalContent;
  if (type === 'image') {
    modalContent = document.createElement('img');
  } else if (type === 'video') {
    modalContent = document.createElement('video');
    modalContent.controls = true;
  } else if (type === 'audio') {
    modalContent = document.createElement('audio');
    modalContent.controls = true;
  }

  modalContent.src = src;
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

document.querySelectorAll('.gallery a').forEach(item => {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    let type = 'image';
    if (href.endsWith('.mp4')) {
      type = 'video';
    }
    openModal(href, type);
  });
});