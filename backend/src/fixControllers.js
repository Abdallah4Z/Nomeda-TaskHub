const fs = require('fs');
const path = require('path');

// Define the directories containing the controller files
const controllersDir = path.join(__dirname, 'controllers');
const middlewareDir = path.join(__dirname, 'middleware');

// Function to process a file
function processFile(filePath) {
  console.log(`Processing file: ${filePath}`);
  
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace "return res.status" with "res.status" and add return statement if needed
  content = content.replace(/return\s+res\.status\([^)]*\)\.json\(/g, (match) => {
    return match.replace('return ', '');
  });
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content);
  console.log(`Updated file: ${filePath}`);
}

// Process all TypeScript files in a directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    if (file.endsWith('.ts')) {
      const filePath = path.join(dir, file);
      processFile(filePath);
    }
  });
}

// Process the controllers directory
processDirectory(controllersDir);

// Process the middleware directory
processDirectory(middlewareDir);

console.log('All files have been processed successfully.');
