class FuPackPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BSCS7_URL || 'https://bscs7.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    this.queryEditorMenu = '[data-testid="menu-query-editor"]';
    this.queryTextArea = '[data-testid="query-textarea"]';
    this.executeQueryButton = '[data-testid="execute-query-btn"]';
    this.resultsTable = '[data-testid="query-results-table"]';
    this.columnHeaderFuPackId = '[data-testid="column-fu-pack-id"]';
    this.columnHeaderShortName = '[data-testid="column-short-name"]';
    this.columnHeaderLongName = '[data-testid="column-long-name"]';
    this.columnHeaderDescription = '[data-testid="column-description"]';
    this.columnHeaderStatus = '[data-testid="column-status"]';
    this.tableRows = '[data-testid="query-results-table"] tbody tr';
    this.filterInput = '[data-testid="results-filter-input"]';
  }

  async navigateToBSCS7() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithReadPermissions() {
    const username = process.env.BSCS7_USERNAME || 'reader_user';
    const password = process.env.BSCS7_PASSWORD || 'reader_pass';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async openQueryEditor() {
    await this.page.click(this.queryEditorMenu);
    await this.page.waitForSelector(this.queryTextArea);
  }

  async executeGMPackagesQuery() {
    const query = `SELECT FU_PACK_ID, SHORT_NAME, LONG_NAME, DESCRIPTION, STATUS FROM SYSADM.FU_PACK WHERE SHORT_NAME LIKE '%GM%' OR LONG_NAME LIKE '%MANUFACTURE%' OR LONG_NAME LIKE '%UNSOLD%' OR LONG_NAME LIKE '%SHOWROOM%' OR LONG_NAME LIKE '%TESTING%' OR LONG_NAME LIKE '%SOLD%' OR LONG_NAME LIKE '%DORMANT%' OR LONG_NAME LIKE '%PURGED%' ORDER BY FU_PACK_ID`;
    
    await this.page.fill(this.queryTextArea, query);
    await this.page.click(this.executeQueryButton);
    await this.page.waitForSelector(this.resultsTable);
  }

  async verifyRequiredColumnsVisible() {
    const fuPackIdVisible = await this.page.isVisible(this.columnHeaderFuPackId);
    const shortNameVisible = await this.page.isVisible(this.columnHeaderShortName);
    const longNameVisible = await this.page.isVisible(this.columnHeaderLongName);
    const descriptionVisible = await this.page.isVisible(this.columnHeaderDescription);
    const statusVisible = await this.page.isVisible(this.columnHeaderStatus);
    
    return fuPackIdVisible && shortNameVisible && longNameVisible && descriptionVisible && statusVisible;
  }

  async verifyManufacturePlanPackage(minutes, sms, dataMB) {
    const rows = await this.page.$$(this.tableRows);
    
    for (const row of rows) {
      const longName = await row.$eval('[data-testid="cell-long-name"]', el => el.textContent);
      const description = await row.$eval('[data-testid="cell-description"]', el => el.textContent);
      
      if (longName && longName.includes('MANUFACTURE')) {
        const expectedPattern = `${minutes}min/${sms}SMS/${dataMB}MB`;
        if (description && description.includes(expectedPattern)) {
          return true;
        }
      }
    }
    return false;
  }

  async verifyUnsoldNotInShowroomPackage() {
    const rows = await this.page.$$(this.tableRows);
    
    for (const row of rows) {
      const longName = await row.$eval('[data-testid="cell-long-name"]', el => el.textContent);
      const description = await row.$eval('[data-testid="cell-description"]', el => el.textContent);
      
      if (longName && longName.includes('UNSOLD NOT IN SHOWROOM')) {
        const expectedPattern = '10min/10SMS/100MB';
        if (description && description.includes(expectedPattern)) {
          return true;
        }
      }
    }
    return false;
  }

  async verifyUnsoldShowroomPackage(minutes, sms, dataGB) {
    const rows = await this.page.$$(this.tableRows);
    
    for (const row of rows) {
      const longName = await row.$eval('[data-testid="cell-long-name"]', el => el.textContent);
      const description = await row.$eval('[data-testid="cell-description"]', el => el.textContent);
      
      if (longName && longName.includes('UNSOLD SHOWROOM') && !longName.includes('NOT IN')) {
        const expectedPattern = `${minutes}min/${sms}SMS/${dataGB}GB`;
        if (description && description.includes(expectedPattern)) {
          return true;
        }
      }
    }
    return false;
  }

  async verifyNoActivePackagesForExcludedPlans() {
    const excludedPlans = ['TESTING', 'SOLD', 'DORMANT', 'PURGED'];
    const rows = await this.page.$$(this.tableRows);
    
    for (const row of rows) {
      const longName = await row.$eval('[data-testid="cell-long-name"]', el => el.textContent);
      const status = await row.$eval('[data-testid="cell-status"]', el => el.textContent);
      const description = await row.$eval('[data-testid="cell-description"]', el => el.textContent);
      
      for (const plan of excludedPlans) {
        if (longName && longName.includes(plan)) {
          const isInactive = status && (status.includes('INACTIVE') || status.includes('0'));
          const hasZeroValues = description && (description.includes('0min/0SMS/0MB') || description.includes('0/0/0'));
          
          if (!isInactive && !hasZeroValues) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

module.exports = FuPackPage;