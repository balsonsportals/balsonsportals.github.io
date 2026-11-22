const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const fnMatches = html.match(/(function handleFileSelect[\s\S]*?)(?=function|<script|<\/script>)/);
if (fnMatches) {
  console.log('handleFileSelect:\n', fnMatches[0].slice(0, 1500));
}

const submitMatch = html.match(/(function (?:handleSubmit|submitForm|onFormSubmit)[\s\S]*?)(?=function|<script|<\/script>)/);
if (submitMatch) {
  console.log('submit:\n', submitMatch[0].slice(0, 1500));
} else {
  const formSubmit = html.match(/onsubmit="([^"]+)"/);
  console.log('onsubmit attribute:', formSubmit ? formSubmit[1] : 'none');
}
