const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname; // root folder of your project
const OUTPUT_FILE = path.join(ROOT_DIR, 'links.html'); // where generated links go

// Recursive function to generate HTML
function generateHTML(folderPath, relativePath = '') {
  const items = fs.readdirSync(folderPath, { withFileTypes: true });
  if (!items.length) return '';

  let html = '<ul style="list-style:none; padding-left:10px">\n';

  items.forEach(item => {
    const itemPath = path.join(folderPath, item.name);
    const itemRelPath = path.join(relativePath, item.name).replace(/\\/g, '/');

    if (item.isDirectory()) {
      // Dropdown for folder
      html += `<li><details><summary>${item.name}</summary>\n`;
      html += generateHTML(itemPath, path.join(relativePath, item.name));
      html += `</details></li>\n`;
    } else if (item.name.endsWith('.html')) {
      // Link for HTML file
      html += `<li><a href="/${itemRelPath}">${item.name}</a></li>\n`;
    }
  });

  html += '</ul>\n';
  return html;
}

// Generate the HTML
const linksHTML = generateHTML(ROOT_DIR);

// Save to links.html
fs.writeFileSync(OUTPUT_FILE, linksHTML);
console.log('links.html generated!');
