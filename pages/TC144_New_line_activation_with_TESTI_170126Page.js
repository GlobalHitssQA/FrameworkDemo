const { expect } = require('@playwright/test');

class LineActivationPage {
  constructor(page) {
    this.page = page;
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.newLineActivationButton = '[data-testid="new-line-activation-btn"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.planOptionTesting = '[data-testid="plan-option-TESTING"]';
    this.simCardStatusIndicator = '[data-testid="sim-card-status"]';
    this.testingPlanIndicator = '[data-testid="testing-plan-available"]';
    this.userPermissionsIndicator = '[data-testid="user-permissions"]';
    this.submitActivationButton = '[data-testid="submit-activation"]';
    this.activationStatusLabel = '[data-testid="activation-status"]';
    this.activatedLineNumberLabel = '[data-testid="activated-line-number"]';
    this.configureParametersSection = '[data-testid="configure-parameters"]';
  }

  async navigateToActivationPortal() {
    await this.page.goto(process.env.ACTIVATION_PORTAL_URL || 'https://activation.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasActivationPermissions() {
    const permissions = await this.page.textContent(this.userPermissionsIndicator);
    expect(permissions).toContain('LINE_ACTIVATION');
  }

  async verifySIMCardAvailable() {
    const status = await this.page.textContent(this.simCardStatusIndicator);
    expect(status).toBe('AVAILABLE');
  }

  async verifyTestingPlanExists() {
    await this.page.waitForSelector(this.testingPlanIndicator);
    const isVisible = await this.page.isVisible(this.testingPlanIndicator);
    expect(isVisible).toBe(true);
  }

  async clickNewLineActivation() {
    await this.page.click(this.newLineActivationButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectPlan(planName) {
    await this.page.click(this.planSelector);
    await this.page.click(`[data-testid="plan-option-${planName}"]`);
  }

  async configureTestingPlanParameters() {
    await this.page.waitForSelector(this.configureParametersSection);
  }

  async submitActivationRequest() {
    await this.page.click(this.submitActivationButton);
    await this.page.waitForSelector(this.activatedLineNumberLabel);
    return await this.page.textContent(this.activatedLineNumberLabel);
  }

  async getActivationStatus() {
    return await this.page.textContent(this.activationStatusLabel);
  }
}

class InstantLinkPage {
  constructor(page) {
    this.page = page;
    this.lineSearchInput = '[data-testid="instant-link-search-input"]';
    this.searchButton = '[data-testid="instant-link-search-btn"]';
    this.rateplanLabel = '[data-testid="line-rateplan"]';
    this.apnListContainer = '[data-testid="apn-list"]';
    this.apnItem = '[data-testid="apn-item"]';
  }

  async navigateToInstantLink() {
    await this.page.goto(process.env.INSTANT_LINK_URL || 'https://instantlink.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async searchLine(lineNumber) {
    await this.page.fill(this.lineSearchInput, lineNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getRateplan() {
    return await this.page.textContent(this.rateplanLabel);
  }

  async getConfiguredAPNs() {
    const apnElements = await this.page.$$(this.apnItem);
    const apns = [];
    for (const element of apnElements) {
      apns.push(await element.textContent());
    }
    return apns;
  }
}

class BSCS7Page {
  constructor(page) {
    this.page = page;
    this.lineSearchInput = '[data-testid="bscs7-line-search"]';
    this.searchButton = '[data-testid="bscs7-search-btn"]';
    this.activePlanLabel = '[data-testid="bscs7-active-plan"]';
    this.tarificationTypeLabel = '[data-testid="bscs7-tarification-type"]';
    this.voiceRateLabel = '[data-testid="bscs7-voice-rate"]';
    this.smsRateLabel = '[data-testid="bscs7-sms-rate"]';
    this.dataRateLabel = '[data-testid="bscs7-data-rate"]';
    this.igvIncludedCheckbox = '[data-testid="bscs7-igv-included"]';
  }

  async navigateToBSCS7() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async searchLine(lineNumber) {
    await this.page.fill(this.lineSearchInput, lineNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getActivePlan() {
    return await this.page.textContent(this.activePlanLabel);
  }

  async getTarificationType() {
    return await this.page.textContent(this.tarificationTypeLabel);
  }

  async getVoiceRate() {
    const rateText = await this.page.textContent(this.voiceRateLabel);
    return parseFloat(rateText);
  }

  async getSMSRate() {
    const rateText = await this.page.textContent(this.smsRateLabel);
    return parseFloat(rateText);
  }

  async getDataRate() {
    const rateText = await this.page.textContent(this.dataRateLabel);
    return parseFloat(rateText);
  }

  async rateIncludesIGV() {
    return await this.page.isChecked(this.igvIncludedCheckbox);
  }
}

class NetworkSystemsPage {
  constructor(page) {
    this.page = page;
    this.lineSearchInput = '[data-testid="network-line-search"]';
    this.searchButton = '[data-testid="network-search-btn"]';
    this.hlrVoLTEStatus = '[data-testid="hlr-volte-status"]';
    this.hssVoLTEStatus = '[data-testid="hss-volte-status"]';
    this.imsVoLTEStatus = '[data-testid="ims-volte-status"]';
    this.serviceVoLTEParameter = '[data-testid="service-volte-parameter"]';
  }

  async navigateToNetworkSystems() {
    await this.page.goto(process.env.NETWORK_SYSTEMS_URL || 'https://networksystems.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async searchLine(lineNumber) {
    await this.page.fill(this.lineSearchInput, lineNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isVoLTEEnabledInHLR() {
    const status = await this.page.textContent(this.hlrVoLTEStatus);
    return status === 'ENABLED';
  }

  async isVoLTEEnabledInHSS() {
    const status = await this.page.textContent(this.hssVoLTEStatus);
    return status === 'ENABLED';
  }

  async isVoLTEEnabledInIMS() {
    const status = await this.page.textContent(this.imsVoLTEStatus);
    return status === 'ENABLED';
  }

  async getServiceVoLTEParameter() {
    return await this.page.textContent(this.serviceVoLTEParameter);
  }
}

class SiacUnicoPage {
  constructor(page) {
    this.page = page;
    this.transactionSearchInput = '[data-testid="siac-transaction-search"]';
    this.searchButton = '[data-testid="siac-search-btn"]';
    this.recordDateLabel = '[data-testid="siac-record-date"]';
    this.recordTimeLabel = '[data-testid="siac-record-time"]';
    this.recordUserLabel = '[data-testid="siac-record-user"]';
    this.recordPlanLabel = '[data-testid="siac-record-plan"]';
  }

  async navigateToSiacUnico() {
    await this.page.goto(process.env.SIAC_UNICO_URL || 'https://siacunico.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async searchTransaction(lineNumber) {
    await this.page.fill(this.transactionSearchInput, lineNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getActivationRecord() {
    return {
      date: await this.page.textContent(this.recordDateLabel),
      time: await this.page.textContent(this.recordTimeLabel),
      user: await this.page.textContent(this.recordUserLabel),
      plan: await this.page.textContent(this.recordPlanLabel)
    };
  }
}

module.exports = {
  LineActivationPage,
  InstantLinkPage,
  BSCS7Page,
  NetworkSystemsPage,
  SiacUnicoPage
};