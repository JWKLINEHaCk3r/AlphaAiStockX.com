import fs from 'fs';

const files = [
  'app/faq/page.tsx',
  'app/ai-tools/page.tsx',
  'app/profile/page.tsx',
  'app/not-found.tsx'
];

files.forEach(file => {  
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove problematic exports that don't work with client components
    content = content.replace(/export const dynamic = ['"][^'"]*['"];?\s*\n?/g, '');
    content = content.replace(/export const revalidate = [^;]*;?\s*\n?/g, '');
    content = content.replace(/\/\/\s*Force dynamic rendering[^\n]*\n?/g, '');
    
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed ${file  }`);
  }
});

console.log('🎉 Fixed revalidate exports in all files!');
