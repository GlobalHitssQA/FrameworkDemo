const fs = require('fs').promises;
const path = require('path');

class SourceCodeDocumentationPage {
  constructor(page) {
    this.page = page;
    this.repositoryPath = process.env.REPOSITORY_PATH || './src';
    this.componentPath = 'components/ContractValueComposition';
    this.componentFiles = [];
    this.expectedBreakdownItems = [
      'Poder de compra MXN',
      'Efectivo MXN',
      'Efectivo USD',
      'Pendientes por liquidar',
      'Fondos',
      'Cedes y pagarés',
      'Mercado de dinero',
      'Mercado de capitales'
    ];
  }

  async verifyRepositoryAccess() {
    try {
      const fullPath = path.join(this.repositoryPath, this.componentPath);
      await fs.access(fullPath);
      return true;
    } catch (error) {
      console.error('Repository access error:', error.message);
      return false;
    }
  }

  async locateComponentFiles() {
    try {
      const fullPath = path.join(this.repositoryPath, this.componentPath);
      const files = await fs.readdir(fullPath);
      this.componentFiles = files.filter(file => 
        file.endsWith('.js') || 
        file.endsWith('.jsx') || 
        file.endsWith('.ts') || 
        file.endsWith('.tsx')
      );
      return this.componentFiles.length > 0;
    } catch (error) {
      console.error('Error locating component files:', error.message);
      return false;
    }
  }

  async verifyDescriptiveComments() {
    try {
      const fullPath = path.join(this.repositoryPath, this.componentPath);
      let hasDescriptiveComments = false;
      
      for (const file of this.componentFiles) {
        const filePath = path.join(fullPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        const hasBlockComments = /\/\*\*[\s\S]*?\*\//g.test(content);
        const hasLineComments = /\/\/.*(?:purpose|functionality|component|description)/gi.test(content);
        const hasJSDocComponent = /@component|@description|@summary/g.test(content);
        
        if (hasBlockComments || hasLineComments || hasJSDocComponent) {
          hasDescriptiveComments = true;
          break;
        }
      }
      
      return hasDescriptiveComments;
    } catch (error) {
      console.error('Error verifying descriptive comments:', error.message);
      return false;
    }
  }

  async verifyFunctionDocumentation() {
    try {
      const fullPath = path.join(this.repositoryPath, this.componentPath);
      let hasFunctionDocs = false;
      
      for (const file of this.componentFiles) {
        const filePath = path.join(fullPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        const hasParamDocs = /@param\s+\{[^}]+\}\s+\w+/g.test(content);
        const hasReturnDocs = /@returns?\s+\{[^}]+\}/g.test(content);
        const hasTypeDocs = /@type\s+\{[^}]+\}/g.test(content);
        
        if (hasParamDocs && hasReturnDocs) {
          hasFunctionDocs = true;
          break;
        }
        
        if (hasTypeDocs && (hasParamDocs || hasReturnDocs)) {
          hasFunctionDocs = true;
          break;
        }
      }
      
      return hasFunctionDocs;
    } catch (error) {
      console.error('Error verifying function documentation:', error.message);
      return false;
    }
  }

  async verifyBreakdownItemsDocumentation() {
    try {
      const fullPath = path.join(this.repositoryPath, this.componentPath);
      let hasBreakdownDocs = false;
      let documentedItems = 0;
      
      for (const file of this.componentFiles) {
        const filePath = path.join(fullPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        for (const item of this.expectedBreakdownItems) {
          const itemPattern = new RegExp(item.replace(/\s+/g, '\\s*'), 'gi');
          if (itemPattern.test(content)) {
            documentedItems++;
          }
        }
        
        const hasBusinessRulesComments = /\/\*\*[\s\S]*?(?:business\s*rule|rubro|desglose|tipo\s*de\s*contrato|persona\s*f[ií]sica|persona\s*moral)[\s\S]*?\*\//gi.test(content);
        const hasContractTypeLogic = /(?:Persona\s*F[ií]sica|Persona\s*Moral|Banco|Casa\s*de\s*Bolsa)/gi.test(content);
        
        if (hasBusinessRulesComments || (documentedItems >= 3 && hasContractTypeLogic)) {
          hasBreakdownDocs = true;
          break;
        }
      }
      
      return hasBreakdownDocs;
    } catch (error) {
      console.error('Error verifying breakdown items documentation:', error.message);
      return false;
    }
  }
}

module.exports = SourceCodeDocumentationPage;