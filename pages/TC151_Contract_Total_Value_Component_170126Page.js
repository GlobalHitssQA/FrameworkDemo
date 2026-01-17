const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

class ContractTotalValuePage {
  constructor(page) {
    this.page = page;
    this.testConfigPath = './jest.config.js';
    this.componentPath = './src/components/ContractTotalValue';
    this.testFilePath = './src/components/ContractTotalValue/__tests__';
    this.coverageReportPath = './coverage/coverage-summary.json';
    
    this.selectors = {
      totalValueContainer: '[data-testid="contract-total-value"]',
      totalValueAmount: '[data-testid="total-value-amount"]',
      breakdownPopup: '[data-testid="breakdown-popup"]',
      breakdownItems: '[data-testid="breakdown-item"]',
      purchasingPowerMXN: '[data-testid="purchasing-power-mxn"]',
      cashMXN: '[data-testid="cash-mxn"]',
      cashUSD: '[data-testid="cash-usd"]',
      pendingSettlement: '[data-testid="pending-settlement"]',
      funds: '[data-testid="funds"]',
      cedesAndNotes: '[data-testid="cedes-and-notes"]',
      moneyMarket: '[data-testid="money-market"]',
      capitalMarket: '[data-testid="capital-market"]',
      closeButton: '[data-testid="breakdown-close-button"]',
      searchInput: '[data-testid="client-contract-search"]',
      distributionTooltip: '[data-testid="distribution-tooltip"]'
    };
  }

  async verifyTestFrameworkConfigured() {
    try {
      await fs.access(this.testConfigPath);
      const { stdout } = await execAsync('npm list jest || npm list vitest');
      return stdout.includes('jest') || stdout.includes('vitest');
    } catch (error) {
      return false;
    }
  }

  async verifyComponentImplemented() {
    try {
      await fs.access(this.componentPath);
      const files = await fs.readdir(this.componentPath);
      return files.some(file => file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx'));
    } catch (error) {
      return false;
    }
  }

  async executeUnitTests() {
    try {
      const { stdout, stderr } = await execAsync('npm test -- --coverage --testPathPattern=ContractTotalValue --json --outputFile=test-results.json');
      const resultsFile = await fs.readFile('./test-results.json', 'utf-8');
      return JSON.parse(resultsFile);
    } catch (error) {
      if (error.stdout) {
        try {
          const resultsFile = await fs.readFile('./test-results.json', 'utf-8');
          return JSON.parse(resultsFile);
        } catch (parseError) {
          return { success: false, error: error.message };
        }
      }
      return { success: false, error: error.message };
    }
  }

  async checkTestErrors(testResults) {
    if (!testResults || testResults.error) {
      return true;
    }
    return testResults.numFailedTests > 0 || testResults.numFailedTestSuites > 0;
  }

  async verifyTotalCalculationTests(testResults) {
    if (!testResults || !testResults.testResults) {
      return false;
    }
    const allTests = testResults.testResults.flatMap(suite => suite.assertionResults || []);
    return allTests.some(test => 
      test.title.toLowerCase().includes('calculation') || 
      test.title.toLowerCase().includes('total') ||
      test.fullName.toLowerCase().includes('calculate')
    );
  }

  async verifySumMatchesTotalTests(testResults) {
    if (!testResults || !testResults.testResults) {
      return false;
    }
    const allTests = testResults.testResults.flatMap(suite => suite.assertionResults || []);
    return allTests.some(test => 
      (test.title.toLowerCase().includes('sum') && test.title.toLowerCase().includes('total')) ||
      test.title.toLowerCase().includes('accumulated') ||
      test.fullName.toLowerCase().includes('sum')
    );
  }

  async verifyMonetaryFormatTests(testResults) {
    if (!testResults || !testResults.testResults) {
      return false;
    }
    const allTests = testResults.testResults.flatMap(suite => suite.assertionResults || []);
    return allTests.some(test => 
      test.title.toLowerCase().includes('format') ||
      test.title.toLowerCase().includes('currency') ||
      test.title.toLowerCase().includes('monetary') ||
      test.fullName.toLowerCase().includes('format')
    );
  }

  async getCodeCoverageReport() {
    try {
      const coverageData = await fs.readFile(this.coverageReportPath, 'utf-8');
      return JSON.parse(coverageData);
    } catch (error) {
      return null;
    }
  }

  async extractCoveragePercentage(coverageReport) {
    if (!coverageReport || !coverageReport.total) {
      return 0;
    }
    const { lines, statements, functions, branches } = coverageReport.total;
    const avgCoverage = (
      (lines?.pct || 0) + 
      (statements?.pct || 0) + 
      (functions?.pct || 0) + 
      (branches?.pct || 0)
    ) / 4;
    return avgCoverage;
  }
}

module.exports = ContractTotalValuePage;