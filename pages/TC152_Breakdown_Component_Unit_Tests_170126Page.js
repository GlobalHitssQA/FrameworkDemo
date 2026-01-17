const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class BreakdownTestPage {
  constructor(page) {
    this.page = page;
    this.configFilePath = 'package.json';
    this.componentPath = 'src/components/BreakdownComponent';
    this.testCommand = 'npm run test:unit -- --grep="breakdown"';
    this.coverageCommand = 'npm run test:coverage -- --grep="breakdown"';
    
    this.locators = {
      breakdownComponent: '[data-testid="breakdown-component"]',
      breakdownPopup: '[data-testid="breakdown-popup"]',
      breakdownTrigger: '[data-testid="breakdown-trigger"]',
      closeButton: '[data-testid="breakdown-close-button"]',
      poderDeCompraSection: '[data-testid="section-poder-compra"]',
      efectivoMxnSection: '[data-testid="section-efectivo-mxn"]',
      efectivoUsdSection: '[data-testid="section-efectivo-usd"]',
      fondosSection: '[data-testid="section-fondos"]',
      cedesSection: '[data-testid="section-cedes-pagares"]',
      mercadoDineroSection: '[data-testid="section-mercado-dinero"]',
      mercadoCapitalesSection: '[data-testid="section-mercado-capitales"]',
      pendientesLiquidarSection: '[data-testid="section-pendientes-liquidar"]',
      totalValueDisplay: '[data-testid="total-value-display"]',
      monetaryValue: '[data-testid="monetary-value"]'
    };
  }

  async verifyDevelopmentEnvironment() {
    return new Promise((resolve) => {
      const configExists = fs.existsSync(this.configFilePath);
      const nodeModulesExists = fs.existsSync('node_modules');
      resolve(configExists && nodeModulesExists);
    });
  }

  async verifyTestingFrameworkInstalled() {
    return new Promise((resolve) => {
      try {
        const packageJson = JSON.parse(fs.readFileSync(this.configFilePath, 'utf8'));
        const hasJest = packageJson.devDependencies?.jest || packageJson.dependencies?.jest;
        const hasVitest = packageJson.devDependencies?.vitest || packageJson.dependencies?.vitest;
        const hasPlaywrightTest = packageJson.devDependencies?.['@playwright/test'] || packageJson.dependencies?.['@playwright/test'];
        resolve(hasJest || hasVitest || hasPlaywrightTest);
      } catch (error) {
        resolve(false);
      }
    });
  }

  async verifyBreakdownComponentExists() {
    return new Promise((resolve) => {
      const componentExists = fs.existsSync(this.componentPath) || 
                              fs.existsSync(`${this.componentPath}.js`) || 
                              fs.existsSync(`${this.componentPath}.jsx`) ||
                              fs.existsSync(`${this.componentPath}.tsx`);
      resolve(componentExists);
    });
  }

  async executeBreakdownUnitTests() {
    return new Promise((resolve, reject) => {
      exec(this.testCommand, (error, stdout, stderr) => {
        resolve({
          success: !error,
          output: stdout,
          errors: stderr,
          exitCode: error ? error.code : 0
        });
      });
    });
  }

  async checkTestsForErrors(testResults) {
    return testResults.exitCode !== 0 || testResults.errors.includes('FAIL');
  }

  async verifySectionPresentationTests(testResults) {
    const output = testResults.output.toLowerCase();
    return {
      poderDeCompra: output.includes('poder de compra') || output.includes('poder-compra'),
      efectivo: output.includes('efectivo'),
      fondos: output.includes('fondos'),
      cedes: output.includes('cedes') || output.includes('pagares'),
      mercadoDinero: output.includes('mercado de dinero') || output.includes('mercado-dinero'),
      mercadoCapitales: output.includes('mercado de capitales') || output.includes('mercado-capitales')
    };
  }

  async verifyPopupBehaviorTests(testResults) {
    const output = testResults.output.toLowerCase();
    return {
      opensCorrectly: output.includes('popup') && (output.includes('open') || output.includes('visible')),
      closesCorrectly: output.includes('popup') && (output.includes('close') || output.includes('hidden'))
    };
  }

  async verifyAlignmentTests(testResults) {
    const output = testResults.output.toLowerCase();
    return output.includes('alignment') || output.includes('vertical') || output.includes('position');
  }

  async getCodeCoverageReport() {
    return new Promise((resolve) => {
      exec(this.coverageCommand, (error, stdout, stderr) => {
        resolve({
          output: stdout,
          errors: stderr
        });
      });
    });
  }

  async extractCoveragePercentage(coverageReport) {
    const coverageMatch = coverageReport.output.match(/(\d+\.?\d*)%/);
    if (coverageMatch) {
      return parseFloat(coverageMatch[1]);
    }
    const coverageJsonPath = 'coverage/coverage-summary.json';
    if (fs.existsSync(coverageJsonPath)) {
      try {
        const coverageData = JSON.parse(fs.readFileSync(coverageJsonPath, 'utf8'));
        return coverageData.total?.lines?.pct || 0;
      } catch (error) {
        return 0;
      }
    }
    return 0;
  }

  async clickBreakdownTrigger() {
    await this.page.locator(this.locators.breakdownTrigger).click();
  }

  async isPopupVisible() {
    return await this.page.locator(this.locators.breakdownPopup).isVisible();
  }

  async closePopup() {
    await this.page.locator(this.locators.closeButton).click();
  }

  async getSectionValue(sectionName) {
    const sectionLocator = this.locators[`${sectionName}Section`];
    if (sectionLocator) {
      return await this.page.locator(sectionLocator).locator(this.locators.monetaryValue).textContent();
    }
    return null;
  }

  async getTotalValue() {
    return await this.page.locator(this.locators.totalValueDisplay).textContent();
  }

  async isSectionVisible(sectionName) {
    const sectionLocator = this.locators[`${sectionName}Section`];
    if (sectionLocator) {
      return await this.page.locator(sectionLocator).isVisible();
    }
    return false;
  }
};

module.exports = BreakdownTestPage;