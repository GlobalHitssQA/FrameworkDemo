const { expect } = require('@playwright/test');

class FupSelectCriteriaPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="bscs7-username"]';
    this.passwordInput = '[data-testid="bscs7-password"]';
    this.loginButton = '[data-testid="bscs7-login-btn"]';
    this.sqlQueryEditor = '[data-testid="sql-query-editor"]';
    this.executeQueryButton = '[data-testid="execute-query-btn"]';
    this.resultsTable = '[data-testid="query-results-table"]';
    this.resultsTableHeaders = '[data-testid="query-results-table"] th';
    this.resultsTableRows = '[data-testid="query-results-table"] tbody tr';
    this.columnFuPackId = '[data-testid="column-fu-pack-id"]';
    this.columnFupVersion = '[data-testid="column-fup-version"]';
    this.columnSelectCritId = '[data-testid="column-fup-select-crit-id"]';
    this.columnRateTypeCode = '[data-testid="column-rate-type-code"]';
    this.columnServicePackageCode = '[data-testid="column-service-package-code"]';
    this.columnTariffZoneCode = '[data-testid="column-tariff-zone-code"]';
    this.filterInput = '[data-testid="results-filter-input"]';
    this.statusIndicator = '[data-testid="record-status-indicator"]';
  }

  async navigateToBSCS7Console() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.internal.example.com/console');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'test_user');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async executeLifeCycleGMQuery() {
    const query = `SELECT FU_PACK_ID, FUP_VERSION, FUP_SELECT_CRIT_ID, RATE_TYPE_CODE, 
                   SERVICE_PACKAGE_CODE, TARIFF_ZONE_CODE, TMCODE, STATUS 
                   FROM SYSADM.FUP_SELECT_CRITERIA 
                   WHERE FU_PACK_ID IN (SELECT FU_PACK_ID FROM SYSADM.FU_PACK WHERE DESCRIPTION LIKE '%LIFE CYCLE GM%')`;
    await this.page.fill(this.sqlQueryEditor, query);
    await this.page.click(this.executeQueryButton);
    await this.page.waitForSelector(this.resultsTable, { state: 'visible' });
  }

  async getDisplayedColumns() {
    const headers = await this.page.locator(this.resultsTableHeaders).allTextContents();
    return headers.map(header => header.trim().toUpperCase());
  }

  async getCriteriaRecordsForPlan(planName) {
    const rows = await this.page.locator(this.resultsTableRows).all();
    const matchingRecords = [];
    for (const row of rows) {
      const rowText = await row.textContent();
      if (rowText.includes(planName)) {
        matchingRecords.push(rowText);
      }
    }
    return matchingRecords;
  }

  async getServiceTypeFilters() {
    const rows = await this.page.locator(this.resultsTableRows).all();
    const serviceTypes = new Set();
    for (const row of rows) {
      const servicePackageCell = await row.locator('td:nth-child(5)').textContent();
      if (servicePackageCell) {
        if (servicePackageCell.includes('VOZ') || servicePackageCell.includes('VOICE')) serviceTypes.add('VOICE');
        if (servicePackageCell.includes('SMS') || servicePackageCell.includes('MSG')) serviceTypes.add('SMS');
        if (servicePackageCell.includes('DAT') || servicePackageCell.includes('DATA')) serviceTypes.add('DATA');
      }
    }
    return Array.from(serviceTypes);
  }

  async getTariffZoneCodes() {
    const rows = await this.page.locator(this.resultsTableRows).all();
    const tariffZones = [];
    for (const row of rows) {
      const tariffZoneCell = await row.locator('td:nth-child(6)').textContent();
      if (tariffZoneCell) {
        tariffZones.push(tariffZoneCell.trim());
      }
    }
    return tariffZones;
  }

  async hasLocalZoneRestriction(tariffZones) {
    const localZoneCodes = ['LOCAL', 'LOC', 'NAC', 'NACIONAL', 'DOMESTIC'];
    const roamingCodes = ['ROAM', 'ROAMING', 'INT', 'INTERNATIONAL'];
    const hasLocal = tariffZones.some(zone => localZoneCodes.some(code => zone.toUpperCase().includes(code)));
    const hasNoRoaming = !tariffZones.some(zone => roamingCodes.some(code => zone.toUpperCase().includes(code)));
    return hasLocal || hasNoRoaming;
  }

  async validateVersionAndStatusCoherence() {
    const rows = await this.page.locator(this.resultsTableRows).all();
    for (const row of rows) {
      const versionCell = await row.locator('td:nth-child(2)').textContent();
      const statusCell = await row.locator('td:nth-child(8)').textContent();
      const version = parseInt(versionCell?.trim() || '0');
      const status = statusCell?.trim().toUpperCase();
      if (version <= 0 || (status !== 'ACTIVE' && status !== 'A' && status !== '1')) {
        return false;
      }
    }
    return true;
  }
}

module.exports = FupSelectCriteriaPage;