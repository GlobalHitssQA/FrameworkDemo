const { expect } = require('@playwright/test');

class SMSTrafficPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    this.planConfigurationSection = '[data-testid="plan-configuration-section"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.planStatusIndicator = '[data-testid="plan-status-indicator"]';
    
    this.smsServiceToggle = '[data-testid="sms-service-toggle"]';
    this.smsTariffsTable = '[data-testid="sms-tariffs-table"]';
    this.bulkRateCell = '[data-testid="bulk-rate-cell"]';
    
    this.lineProvisioningForm = '[data-testid="line-provisioning-form"]';
    this.lineNumberInput = '[data-testid="line-number-input"]';
    this.planDropdown = '[data-testid="plan-dropdown"]';
    this.provisionButton = '[data-testid="provision-button"]';
    this.provisioningStatus = '[data-testid="provisioning-status"]';
    
    this.trafficTableSection = '[data-testid="traffic-table-section"]';
    this.smsTrafficTable = '[data-testid="sms-traffic-table"]';
    this.smsCountCell = '[data-testid="sms-count-cell"]';
    this.localSMSRow = '[data-testid="local-sms-row"]';
    this.roamingSMSRow = '[data-testid="roaming-sms-row"]';
    
    this.chargesSection = '[data-testid="charges-section"]';
    this.includedSMSCount = '[data-testid="included-sms-count"]';
    this.excessSMSCount = '[data-testid="excess-sms-count"]';
    this.excessSMSCharge = '[data-testid="excess-sms-charge"]';
    this.roamingSMSCharge = '[data-testid="roaming-sms-charge"]';
    this.roamingSMSRate = '[data-testid="roaming-sms-rate"]';
    
    this.sendSMSButton = '[data-testid="send-sms-button"]';
    this.smsQuantityInput = '[data-testid="sms-quantity-input"]';
    this.smsTypeSelector = '[data-testid="sms-type-selector"]';
    this.confirmSendButton = '[data-testid="confirm-send-button"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BASE_URL || 'https://lifecycle-gm.example.com');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPlanConfiguredInBSCS7(planName) {
    await this.page.click(this.planConfigurationSection);
    await this.page.selectOption(this.planSelector, { label: planName });
    const status = await this.page.textContent(this.planStatusIndicator);
    return status.includes('Configured') || status.includes('Active');
  }

  async verifySMSServiceEnabled() {
    const toggle = await this.page.locator(this.smsServiceToggle);
    const isChecked = await toggle.isChecked();
    return isChecked;
  }

  async verifySMSTariffs() {
    const tariffsTable = await this.page.locator(this.smsTariffsTable);
    const isVisible = await tariffsTable.isVisible();
    if (!isVisible) return false;
    const bulkRate = await this.page.textContent(this.bulkRateCell);
    return bulkRate.includes('0.05');
  }

  async provisionLine(planName) {
    await this.page.click(this.lineProvisioningForm);
    const lineNumber = this.generateLineNumber();
    await this.page.fill(this.lineNumberInput, lineNumber);
    await this.page.selectOption(this.planDropdown, { label: planName });
    await this.page.click(this.provisionButton);
    await this.page.waitForSelector(this.provisioningStatus);
  }

  generateLineNumber() {
    return '9' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  }

  async verifyLineProvisioned(planName) {
    const status = await this.page.textContent(this.provisioningStatus);
    return status.includes('Success') || status.includes(planName);
  }

  async sendLocalSMS(count) {
    await this.page.click(this.sendSMSButton);
    await this.page.fill(this.smsQuantityInput, count.toString());
    await this.page.selectOption(this.smsTypeSelector, { value: 'local' });
    await this.page.click(this.confirmSendButton);
    await this.page.waitForLoadState('networkidle');
  }

  async sendRoamingSMS(count) {
    await this.page.click(this.sendSMSButton);
    await this.page.fill(this.smsQuantityInput, count.toString());
    await this.page.selectOption(this.smsTypeSelector, { value: 'roaming' });
    await this.page.click(this.confirmSendButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getSMSCountInTrafficTable() {
    await this.page.click(this.trafficTableSection);
    const countText = await this.page.textContent(this.smsCountCell);
    return parseInt(countText, 10);
  }

  async getDiscountedSMSCount() {
    const countText = await this.page.textContent(this.includedSMSCount);
    return parseInt(countText, 10);
  }

  async getExcessSMSCount() {
    const countText = await this.page.textContent(this.excessSMSCount);
    return parseInt(countText, 10);
  }

  async navigateToChargesSection() {
    await this.page.click(this.chargesSection);
    await this.page.waitForLoadState('networkidle');
  }

  async validateExcessCharge(smsCount, rate) {
    const expectedCharge = smsCount * rate;
    const actualCharge = await this.getExcessSMSCharge();
    return Math.abs(actualCharge - expectedCharge) < 0.01;
  }

  async getExcessSMSCharge() {
    const chargeText = await this.page.textContent(this.excessSMSCharge);
    return parseFloat(chargeText.replace(/[^0-9.]/g, ''));
  }

  async getRoamingSMSRate() {
    const rateText = await this.page.textContent(this.roamingSMSRate);
    return parseFloat(rateText.replace(/[^0-9.]/g, ''));
  }

  async getRoamingSMSCharge() {
    const chargeText = await this.page.textContent(this.roamingSMSCharge);
    return parseFloat(chargeText.replace(/[^0-9.]/g, ''));
  }
}

module.exports = SMSTrafficPage;