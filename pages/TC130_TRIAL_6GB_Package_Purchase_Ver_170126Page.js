const { expect } = require('@playwright/test');

class SiacUnicoPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.SIAC_UNICO_URL || 'https://siac-unico.example.com';
    this.apiBaseUrl = process.env.BUY_PRODUCT_API_URL || 'https://api.example.com/buyproduct';
    
    // Locators - Inferidos siguiendo mejores prácticas
    this.searchLineInput = '[data-testid="search-line-input"]';
    this.searchPackageSelect = '[data-testid="search-package-select"]';
    this.searchButton = '[data-testid="search-transaction-btn"]';
    this.transactionTable = '[data-testid="transaction-results-table"]';
    this.transactionRow = '[data-testid="transaction-row"]';
    this.transactionDetailButton = '[data-testid="view-detail-btn"]';
    this.transactionDetailModal = '[data-testid="transaction-detail-modal"]';
    this.packageCodeField = '[data-testid="package-code"]';
    this.packageNameField = '[data-testid="package-name"]';
    this.activationDateField = '[data-testid="activation-date"]';
    this.activationTimeField = '[data-testid="activation-time"]';
    this.associatedLineField = '[data-testid="associated-line"]';
    this.userField = '[data-testid="transaction-user"]';
    this.typificationField = '[data-testid="typification-code"]';
    this.typificationFormatField = '[data-testid="typification-format"]';
    this.auditTimestampField = '[data-testid="audit-timestamp"]';
    this.auditTraceIdField = '[data-testid="audit-trace-id"]';
    this.auditSystemSourceField = '[data-testid="audit-system-source"]';
    this.packageIdentifierField = '[data-testid="package-identifier"]';
    this.systemStatusIndicator = '[data-testid="system-status-indicator"]';
  }

  async navigateToSiacUnico() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyBuyProductAPIAvailability() {
    try {
      const response = await this.page.request.get(`${this.apiBaseUrl}/health`);
      return response.status() === 200;
    } catch (error) {
      return false;
    }
  }

  async verifySiacUnicoOperational() {
    const statusIndicator = this.page.locator(this.systemStatusIndicator);
    await statusIndicator.waitFor({ state: 'visible', timeout: 10000 });
    const statusText = await statusIndicator.textContent();
    return statusText.toLowerCase().includes('operational') || statusText.toLowerCase().includes('activo');
  }

  async activateTrialPackageViaAPI(packageType, testLine) {
    const requestBody = {
      packageCode: packageType,
      lineNumber: testLine,
      activationType: 'TRIAL'
    };

    const response = await this.page.request.post(`${this.apiBaseUrl}/activate`, {
      data: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseBody = await response.json();
    return {
      success: response.status() === 200 && responseBody.status === 'ACTIVATED',
      capacity: responseBody.capacity,
      costWithoutIGV: responseBody.costWithoutIGV,
      validityDays: responseBody.validityDays,
      transactionId: responseBody.transactionId
    };
  }

  async searchTransaction(lineNumber, packageCode) {
    await this.page.locator(this.searchLineInput).fill(lineNumber);
    await this.page.locator(this.searchPackageSelect).selectOption({ value: packageCode });
    await this.page.locator(this.searchButton).click();
    await this.page.locator(this.transactionTable).waitFor({ state: 'visible' });
  }

  async verifyTransactionRegistered() {
    const rows = this.page.locator(this.transactionRow);
    const count = await rows.count();
    return count > 0;
  }

  async getTransactionTypification() {
    const typificationElement = this.page.locator(this.typificationField).first();
    return await typificationElement.textContent();
  }

  async getTransactionDetails() {
    return {
      packageCode: await this.page.locator(this.packageCodeField).first().textContent(),
      packageName: await this.page.locator(this.packageNameField).first().textContent(),
      activationDate: await this.page.locator(this.activationDateField).first().textContent(),
      activationTime: await this.page.locator(this.activationTimeField).first().textContent(),
      associatedLine: await this.page.locator(this.associatedLineField).first().textContent(),
      user: await this.page.locator(this.userField).first().textContent()
    };
  }

  async getTypificationFormat() {
    return await this.page.locator(this.typificationFormatField).first().textContent();
  }

  async validateGMTypificationStandard(typificationFormat) {
    const gmStandardPattern = /^GM_[A-Z]+_[0-9]+[A-Z]*$/;
    return gmStandardPattern.test(typificationFormat);
  }

  async clickTransactionDetail() {
    await this.page.locator(this.transactionDetailButton).first().click();
    await this.page.locator(this.transactionDetailModal).waitFor({ state: 'visible' });
  }

  async isTransactionDetailVisible() {
    return await this.page.locator(this.transactionDetailModal).isVisible();
  }

  async getAuditInformation() {
    return {
      timestamp: await this.page.locator(this.auditTimestampField).textContent(),
      traceId: await this.page.locator(this.auditTraceIdField).textContent(),
      systemSource: await this.page.locator(this.auditSystemSourceField).textContent()
    };
  }

  async getPackageIdentifier() {
    return await this.page.locator(this.packageIdentifierField).first().textContent();
  }

  async verifyPackageDifferentiation(trialPackage, b2b2cPackage) {
    const trialIdentifier = await this.getPackageIdentifier();
    const trialTypification = await this.getTransactionTypification();
    
    const isTrialClearlyIdentified = trialIdentifier.includes('TRIAL') && 
                                      !trialIdentifier.includes(b2b2cPackage);
    const hasDistinctTypification = trialTypification.includes('TRIAL') || 
                                     trialTypification.includes('6GB');
    
    return isTrialClearlyIdentified && hasDistinctTypification;
  }
}

module.exports = SiacUnicoPage;