#!/usr/bin/env node

/**
 * Script de verificação de arquivos para troubleshooting
 * Execute com: node check-files.cjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verificando arquivos da implementação...\n');

const filesToCheck = [
  // Arquivos de dados
  'src/data/guiaEtapas.js',
  'src/data/blogPosts.js',
  'src/data/portifolio.js',
  'src/data/stackFerramentas.js',
  
  // Páginas
  'src/pages/Sobre.jsx',
  'src/pages/StackFerramentas.jsx',
  
  // Componentes
  'src/components/AudienceSection.jsx',
  'src/components/Decorations.jsx',
  'src/components/ui/dropdown-menu.jsx',
  
  // Config
  'src/main.jsx',
  'src/App.jsx',
  'vite.config.js',
];

let allFilesExist = true;
let errors = [];

filesToCheck.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const stats = fs.statSync(fullPath);
    const size = stats.size;
    console.log(`✅ ${file} (${size} bytes)`);
    
    // Verificar se o arquivo não está vazio
    if (size === 0) {
      errors.push(`⚠️  ${file} está vazio!`);
    }
    
    // Verificar sintaxe básica
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Verificar se tem export
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        if (!content.includes('export')) {
          errors.push(`⚠️  ${file} não tem export!`);
        }
      }
    } catch (e) {
      errors.push(`❌ Erro ao ler ${file}: ${e.message}`);
    }
  } else {
    console.log(`❌ ${file} NÃO ENCONTRADO`);
    allFilesExist = false;
  }
});

console.log('\n' + '='.repeat(50) + '\n');

if (errors.length > 0) {
  console.log('⚠️  Avisos encontrados:\n');
  errors.forEach(err => console.log(err));
  console.log('');
}

if (allFilesExist && errors.length === 0) {
  console.log('✅ Todos os arquivos existem e parecem corretos!\n');
  console.log('📋 Próximos passos:\n');
  console.log('1. Abra o navegador em: http://localhost:5173');
  console.log('2. Pressione F12 para abrir DevTools');
  console.log('3. Vá para a aba Console');
  console.log('4. Verifique se há erros em vermelho');
  console.log('5. Se houver erros, copie e cole aqui\n');
} else {
  console.log('❌ Alguns arquivos estão faltando ou têm problemas!\n');
  console.log('Execute: npm run dev\n');
  console.log('E verifique o console do navegador (F12)\n');
}

// Verificar node_modules
console.log('='.repeat(50) + '\n');
console.log('Verificando node_modules...\n');

const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules existe');
  
  // Verificar dependências críticas
  const criticalDeps = [
    'react',
    'react-dom',
    'react-router-dom',
    'vite',
    '@radix-ui/react-dropdown-menu',
    'lucide-react',
    'framer-motion',
  ];
  
  console.log('\nDependências críticas:');
  criticalDeps.forEach(dep => {
    const depPath = path.join(nodeModulesPath, dep);
    if (fs.existsSync(depPath)) {
      console.log(`  ✅ ${dep}`);
    } else {
      console.log(`  ❌ ${dep} - FALTANDO!`);
      allFilesExist = false;
    }
  });
} else {
  console.log('❌ node_modules NÃO ENCONTRADO!');
  console.log('\n💡 Execute: npm install\n');
  allFilesExist = false;
}

console.log('\n' + '='.repeat(50) + '\n');

if (!allFilesExist) {
  console.log('🔧 Solução recomendada:\n');
  console.log('1. rm -rf node_modules');
  console.log('2. npm install');
  console.log('3. npm run dev\n');
}

