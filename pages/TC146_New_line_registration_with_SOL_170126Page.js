class LineRegistrationPage {
  constructor(page) {
    this.page = page;
    this.registrationMenuButton = '[data-testid="menu-line-registration"]';
    this.userAuthIndicator = '[data-testid="user-authenticated-indicator"]';
    this.simCardStatusIndicator = '[data-testid="sim-card-status"]';
    this.soldPlanOption = '[data-testid="plan-option-sold"]';
    this.inPoolPackageStatus = '[data-testid="inpool-10mb-status"]';
    this.planDropdown = '[data-testid="plan-dropdown"]';
    this.simCardInput = '[data-testid="input-sim-card"]';
    this.customerNameInput = '[data-testid="input-customer-name"]';
    this.customerDocumentInput = '[data-testid="input-customer-document"]';
    this.submitButton = '[data-testid="btn-submit-registration"]';
    this.registrationSuccessMessage = '[data-testid="registration-success-message"]';
    this.registeredLineNumberDisplay = '[data-testid="registered-line-number"]';
  }

  async navigateToRegistration() {
    await this.page.click(this.registrationMenuButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserAuthenticated() {
    const indicator = await this.page.locator(this.userAuthIndicator);
    await indicator.waitFor({ state: 'visible' });
    return await indicator.isVisible();
  }

  async verifySIMCardAvailable() {
    const status = await this.page.textContent(this.simCardStatusIndicator);
    return status.includes('available') || status.includes('disponible');
  }

  async verifySOLDPlanConfigured() {
    await this.page.click(this.planDropdown);
    const soldOption = await this.page.locator(this.soldPlanOption);
    return await soldOption.isVisible();
  }

  async verifyInPool10MBConfigured() {
    const status = await this.page.textContent(this.inPoolPackageStatus);
    return status.includes('configured') || status.includes('configurado');
  }

  async selectSOLDPlan() {
    await this.page.click(this.planDropdown);
    await this.page.click(this.soldPlanOption);
  }

  async fillRegistrationParameters() {
    await this.page.fill(this.simCardInput, 'SIM_TEST_001');
    await this.page.fill(this.customerNameInput, 'Test Customer');
    await this.page.fill(this.customerDocumentInput, '12345678');
  }

  async submitRegistration() {
    await this.page.click(this.submitButton);
    await this.page.waitForSelector(this.registrationSuccessMessage);
  }

  async verifyRegistrationAccepted() {
    const message = await this.page.locator(this.registrationSuccessMessage);
    return await message.isVisible();
  }

  async getRegisteredLineNumber() {
    return await this.page.textContent(this.registeredLineNumberDisplay);
  }
}

class InstantLinkPage {
  constructor(page) {
    this.page = page;
    this.instantLinkMenuButton = '[data-testid="menu-instant-link"]';
    this.lineSearchInput = '[data-testid="input-line-search"]';
    this.searchButton = '[data-testid="btn-search-line"]';
    this.linePlanDisplay = '[data-testid="line-plan-display"]';
    this.apnListContainer = '[data-testid="apn-list-container"]';
    this.apnItem = '[data-testid="apn-item"]';
    this.volteStatusDisplay = '[data-testid="service-volte-status"]';
    this.esimApnContainer = '[data-testid="esim-apn-container"]';
    this.esimCostDisplay = '[data-testid="esim-download-cost"]';
  }

  async navigateToInstantLink() {
    await this.page.click(this.instantLinkMenuButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLine(lineNumber) {
    await this.page.fill(this.lineSearchInput, lineNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getLinePlan() {
    return await this.page.textContent(this.linePlanDisplay);
  }

  async getConfiguredAPNs() {
    const apnElements = await this.page.locator(this.apnItem).all();
    const apns = [];
    for (const element of apnElements) {
      apns.push(await element.textContent());
    }
    return apns;
  }

  async getServiceVoLTEStatus() {
    return await this.page.textContent(this.volteStatusDisplay);
  }

  async getESIMConfiguredAPNs() {
    const container = await this.page.locator(this.esimApnContainer);
    const text = await container.textContent();
    return text.split(',').map(apn => apn.trim());
  }

  async getESIMDownloadCost() {
    const costText = await this.page.textContent(this.esimCostDisplay);
    return parseFloat(costText.replace(/[^0-9.]/g, ''));
  }
}

class BSCS7Page {
  constructor(page) {
    this.page = page;
    this.bscs7MenuButton = '[data-testid="menu-bscs7"]';
    this.lineSearchInput = '[data-testid="bscs7-line-search"]';
    this.searchButton = '[data-testid="bscs7-btn-search"]';
    this.inPoolPackageName = '[data-testid="inpool-package-name"]';
    this.inPoolPackageApns = '[data-testid="inpool-package-apns"]';
    this.udrCostDisplay = '[data-testid="udr-cost-display"]';
    this.bulkRatesContainer = '[data-testid="bulk-rates-container"]';
    this.dataRateDisplay = '[data-testid="data-rate-per-mb"]';
    this.voiceRateDisplay = '[data-testid="voice-rate-per-min"]';
    this.smsRateDisplay = '[data-testid="sms-rate-per-msg"]';
    this.sharedPoolSection = '[data-testid="shared-pool-calculation"]';
    this.includedLinesDisplay = '[data-testid="included-lines-list"]';
    this.poolFormulaDisplay = '[data-testid="pool-formula"]';
  }

  async navigateToBSCS7() {
    await this.page.click(this.bscs7MenuButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLine(lineNumber) {
    await this.page.fill(this.lineSearchInput, lineNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getInPoolPackageInfo() {
    const packageName = await this.page.textContent(this.inPoolPackageName);
    const apnsText = await this.page.textContent(this.inPoolPackageApns);
    return {
      packageName: packageName,
      apns: apnsText.split(',').map(apn => apn.trim())
    };
  }

  async getUDRCost(udrCode) {
    const costElement = await this.page.locator(`[data-testid="udr-cost-${udrCode}"]`);
    const costText = await costElement.textContent();
    return parseFloat(costText.replace(/[^0-9.]/g, ''));
  }

  async getBulkRatesForAPNs(apns) {
    const dataRate = await this.page.textContent(this.dataRateDisplay);
    const voiceRate = await this.page.textContent(this.voiceRateDisplay);
    const smsRate = await this.page.textContent(this.smsRateDisplay);
    return {
      dataRate: parseFloat(dataRate.replace(/[^0-9.]/g, '')),
      voiceRate: parseFloat(voiceRate.replace(/[^0-9.]/g, '')),
      smsRate: parseFloat(smsRate.replace(/[^0-9.]/g, ''))
    };
  }

  async getSharedPoolCalculation() {
    const includedLines = await this.page.textContent(this.includedLinesDisplay);
    const formula = await this.page.textContent(this.poolFormulaDisplay);
    return {
      includedLines: includedLines.split(',').map(line => line.trim()),
      formula: formula
    };
  }
}

class SIACUnicoPage {
  constructor(page) {
    this.page = page;
    this.siacMenuButton = '[data-testid="menu-siac-unico"]';
    this.transactionSearchInput = '[data-testid="siac-transaction-search"]';
    this.searchButton = '[data-testid="siac-btn-search"]';
    this.transactionDateDisplay = '[data-testid="transaction-date"]';
    this.transactionTimeDisplay = '[data-testid="transaction-time"]';
    this.transactionUserDisplay = '[data-testid="transaction-user"]';
    this.transactionPlanDisplay = '[data-testid="transaction-plan"]';
  }

  async navigateToSIACUnico() {
    await this.page.click(this.siacMenuButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchTransaction(lineNumber) {
    await this.page.fill(this.transactionSearchInput, lineNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getTransactionDetails() {
    return {
      date: await this.page.textContent(this.transactionDateDisplay),
      time: await this.page.textContent(this.transactionTimeDisplay),
      user: await this.page.textContent(this.transactionUserDisplay),
      plan: await this.page.textContent(this.transactionPlanDisplay)
    };
  }
}

module.exports = { LineRegistrationPage, InstantLinkPage, BSCS7Page, SIACUnicoPage };