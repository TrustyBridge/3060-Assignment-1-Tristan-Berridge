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
