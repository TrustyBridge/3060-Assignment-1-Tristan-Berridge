const fs   = require('fs');
const path = require('path');

function load(file) {
  const html = fs.readFileSync(path.resolve(__dirname, file), 'utf8');
  document.open();
  document.write(html);
  document.close();
}

const pages = ['index.html','analysis_methods.html','collection_methods.html','data_sources.html','publication_venues.html'];

test.each(pages)('%s has links to all other pages', (currentPage) => {
  load(currentPage);
  const otherPages = pages.filter(p => p!== currentPage);
  otherPages.forEach(targetPage => {
    const link = document.querySelector(`a[href="${targetPage}"]`);
    expect(link).not.toBeNull();
  });
});
test.each(pages)('%s has at least one heading', (currentPage) => {
  load(currentPage);
  const heading = document.querySelector('h1, h2, h3');
  expect(heading).not.toBeNull();
});
test.each(pages)('%s has no empty links', (currentPage) => {
  load(currentPage);
  const links = Array.from(document.querySelectorAll('a'));
  links.forEach(link => {
    expect(link.getAttribute('href')).not.toBe('');
    expect(link.getAttribute('href')).not.toBeNull();
  });
});


