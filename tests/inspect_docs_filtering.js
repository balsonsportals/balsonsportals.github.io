const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');

const filterIdx = content.indexOf('filterDocuments');
console.log(content.slice(filterIdx - 100, filterIdx + 1500));

const renderTabIdx = content.indexOf('renderDocumentsTab:');
console.log(content.slice(renderTabIdx, renderTabIdx + 800));
