const { expect } = require('@playwright/test');

class DatabasePlanesPage {
  constructor(page) {
    this.page = page;
    
    // Login and connection locators
    this.usernameInput = page.locator('[data-testid="db-username-input"]');
    this.passwordInput = page.locator('[data-testid="db-password-input"]');
    this.loginButton = page.locator('[data-testid="db-login-button"]');
    this.connectionStatus = page.locator('[data-testid="connection-status"]');
    
    // Query console locators
    this.queryTextarea = page.locator('[data-testid="sql-query-input"]');
    this.executeQueryButton = page.locator('[data-testid="execute-query-button"]');
    this.queryResultsTable = page.locator('[data-testid="query-results-table"]');
    this.resultsLoadingIndicator = page.locator('[data-testid="results-loading"]');
    
    // Table structure locators
    this.tableHeaders = page.locator('[data-testid="query-results-table"] th');
    this.tableRows = page.locator('[data-testid="query-results-table"] tbody tr');
    
    // Column specific locators
    this.tmcodeColumn = page.locator('[data-testid="column-tmcode"]');
    this.labelColumn = page.locator('[data-testid="column-label"]');
    this.spcodeColumn = page.locator('[data-testid="column-spcode"]');
    this.fecVigColumn = page.locator('[data-testid="column-fec-vig"]');
    this.fecCadColumn = page.locator('[data-testid="column-fec-cad"]');
  }

  async navigateToDatabaseConsole() {
    await this.page.goto('/database/console');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithValidCredentials() {
    await this.usernameInput.fill(process.env.DB_USERNAME || 'bscs7_user');
    await this.passwordInput.fill(process.env.DB_PASSWORD || 'secure_password');
    await this.loginButton.click();
  }

  async verifyDatabaseConnection() {
    await expect(this.connectionStatus).toContainText('Connected');
  }

  async executeQueryOnTable(tableName) {
    const query = `SELECT TMCODE, LIZOP_KN_C, SPCODE, FEC_CAD, FEC_VIG, LABEL FROM ${tableName} WHERE LABEL LIKE '%GM%' OR LABEL IN ('TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT', 'PURGED')`;
    await this.queryTextarea.fill(query);
    await this.executeQueryButton.click();
  }

  async waitForQueryResults() {
    await this.resultsLoadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
    await this.queryResultsTable.waitFor({ state: 'visible' });
  }

  async verifyTableStructure(expectedFields) {
    const headers = await this.tableHeaders.allTextContents();
    return expectedFields.every(field => headers.includes(field));
  }

  async getLifeCyclePlansCount() {
    const rows = await this.tableRows.count();
    return rows;
  }

  async verifyUniqueTMCodes() {
    const tmcodes = await this.page.locator('[data-testid="query-results-table"] tbody tr td:first-child').allTextContents();
    const uniqueCodes = new Set(tmcodes);
    return uniqueCodes.size === tmcodes.length;
  }

  async verifyPlansExist(expectedPlans) {
    const labels = await this.page.locator('[data-testid="query-results-table"] tbody tr td:last-child').allTextContents();
    return expectedPlans.every(plan => labels.some(label => label.includes(plan)));
  }

  async verifyValidityDates() {
    const rows = await this.tableRows.count();
    for (let i = 0; i < rows; i++) {
      const fecVig = await this.page.locator(`[data-testid="query-results-table"] tbody tr:nth-child(${i + 1}) td:nth-child(5)`).textContent();
      const label = await this.page.locator(`[data-testid="query-results-table"] tbody tr:nth-child(${i + 1}) td:nth-child(6)`).textContent();
      
      const productionPlans = ['SOLD', 'DORMANT', 'PURGED', 'UNSOLD SHOWROOM', 'UNSOLD NOT IN SHOWROOM'];
      if (productionPlans.some(plan => label.includes(plan))) {
        if (fecVig !== 'NULL' && fecVig !== '' && fecVig !== null) {
          return false;
        }
      }
    }
    return true;
  }

  async verifyPlanLabels() {
    const expectedLabels = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT', 'PURGED'];
    const labels = await this.page.locator('[data-testid="query-results-table"] tbody tr td:last-child').allTextContents();
    return expectedLabels.every(expected => labels.some(label => label.trim() === expected || label.includes(expected)));
  }

  async verifyAutoConectadoSPCode() {
    const spcodes = await this.page.locator('[data-testid="query-results-table"] tbody tr td:nth-child(3)').allTextContents();
    const autoConectadoSPCode = spcodes[0];
    return spcodes.every(code => code === autoConectadoSPCode && code !== '' && code !== null);
  }
}

module.exports = DatabasePlanesPage;