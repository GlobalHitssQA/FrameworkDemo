const { expect } = require('@playwright/test');

class ManufactureLinePage {
  constructor(page) {
    this.page = page;
    
    // Authentication and Navigation Locators
    this.userProfileIndicator = page.locator('[data-testid="user-profile-indicator"]');
    this.lineRegistrationMenu = page.locator('[data-testid="menu-line-registration"]');
    
    // SIM Card Section Locators
    this.simCardStatusIndicator = page.locator('[data-testid="sim-card-status"]');
    this.simCardAvailableLabel = page.locator('[data-testid="sim-available-label"]');
    
    // System Connections Locators
    this.instantLinkStatus = page.locator('[data-testid="instant-link-connection-status"]');
    this.bscs7Status = page.locator('[data-testid="bscs7-connection-status"]');
    this.networkStatus = page.locator('[data-testid="network-connection-status"]');
    
    // Plan Selection Locators
    this.planDropdown = page.locator('[data-testid="plan-selection-dropdown"]');
    this.manufacturePlanOption = page.locator('[data-testid="plan-option-manufacture"]');
    this.planConfiguredIndicator = page.locator('[data-testid="plan-configured-indicator"]');
    
    // Line Registration Form Locators
    this.phoneNumberInput = page.locator('[data-testid="input-phone-number"]');
    this.simICCIDInput = page.locator('[data-testid="input-sim-iccid"]');
    this.customerIdInput = page.locator('[data-testid="input-customer-id"]');
    this.submitRegistrationButton = page.locator('[data-testid="btn-submit-registration"]');
    
    // Registration Confirmation Locators
    this.registrationSuccessMessage = page.locator('[data-testid="registration-success-message"]');
    this.provisioningStatusIndicator = page.locator('[data-testid="provisioning-status"]');
    
    // INSTANT LINK Section Locators
    this.instantLinkNavigationTab = page.locator('[data-testid="tab-instant-link"]');
    this.ratePlanDisplay = page.locator('[data-testid="rateplan-display"]');
    this.apnListContainer = page.locator('[data-testid="apn-list-container"]');
    this.apnListItems = page.locator('[data-testid="apn-item"]');
    
    // BSCS7 Section Locators
    this.bscs7NavigationTab = page.locator('[data-testid="tab-bscs7"]');
    this.freeUnitsVoiceDisplay = page.locator('[data-testid="free-units-voice"]');
    this.freeUnitsSMSDisplay = page.locator('[data-testid="free-units-sms"]');
    this.freeUnitsDataDisplay = page.locator('[data-testid="free-units-data"]');
    
    // Bulk Rates Locators
    this.bulkRateVoiceDisplay = page.locator('[data-testid="bulk-rate-voice"]');
    this.bulkRateSMSDisplay = page.locator('[data-testid="bulk-rate-sms"]');
    this.bulkRateDataDisplay = page.locator('[data-testid="bulk-rate-data"]');
    
    // VoLTE and eSIM Locators
    this.volteStatusIndicator = page.locator('[data-testid="volte-status"]');
    this.esimAPNContainer = page.locator('[data-testid="esim-apn-container"]');
    this.esimAPNItems = page.locator('[data-testid="esim-apn-item"]');
    
    // SIAC Unico Locators
    this.siacUnicoNavigationTab = page.locator('[data-testid="tab-siac-unico"]');
    this.transactionDateDisplay = page.locator('[data-testid="transaction-date"]');
    this.transactionTimeDisplay = page.locator('[data-testid="transaction-time"]');
    this.transactionUserDisplay = page.locator('[data-testid="transaction-user"]');
    this.transactionPlanDisplay = page.locator('[data-testid="transaction-plan"]');
  }

  async navigateToLineRegistration() {
    await this.lineRegistrationMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserAuthenticated() {
    await expect(this.userProfileIndicator).toBeVisible();
  }

  async verifySIMCardAvailable() {
    await expect(this.simCardStatusIndicator).toBeVisible();
    const status = await this.simCardAvailableLabel.textContent();
    return status.includes('Available') || status.includes('Disponible');
  }

  async verifySystemConnections() {
    await expect(this.instantLinkStatus).toHaveAttribute('data-status', 'connected');
    await expect(this.bscs7Status).toHaveAttribute('data-status', 'connected');
    await expect(this.networkStatus).toHaveAttribute('data-status', 'connected');
  }

  async verifyManufacturePlanConfigured() {
    await this.planDropdown.click();
    await expect(this.manufacturePlanOption).toBeVisible();
    await this.page.keyboard.press('Escape');
  }

  async selectManufacturePlan() {
    await this.planDropdown.click();
    await this.manufacturePlanOption.click();
  }

  async fillLineRegistrationParameters() {
    await this.phoneNumberInput.fill('999000001');
    await this.simICCIDInput.fill('8951100000000000001');
    await this.customerIdInput.fill('CUST001');
  }

  async submitLineRegistration() {
    await this.submitRegistrationButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRegistrationAccepted() {
    await expect(this.registrationSuccessMessage).toBeVisible();
    const provisioningStatus = await this.provisioningStatusIndicator.textContent();
    return provisioningStatus.includes('Processing') || provisioningStatus.includes('Completed');
  }

  async navigateToInstantLink() {
    await this.instantLinkNavigationTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProvisionedRatePlan() {
    const ratePlan = await this.ratePlanDisplay.textContent();
    return ratePlan.trim();
  }

  async getConfiguredAPNs() {
    const apnElements = await this.apnListItems.all();
    const apns = [];
    for (const element of apnElements) {
      const apnName = await element.textContent();
      apns.push(apnName.trim());
    }
    return apns;
  }

  async navigateToBSCS7() {
    await this.bscs7NavigationTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getFreeUnitsConfiguration() {
    const voiceText = await this.freeUnitsVoiceDisplay.textContent();
    const smsText = await this.freeUnitsSMSDisplay.textContent();
    const dataText = await this.freeUnitsDataDisplay.textContent();
    
    return {
      voiceMinutes: parseInt(voiceText.match(/\d+/)[0]),
      smsCount: parseInt(smsText.match(/\d+/)[0]),
      dataMB: parseInt(dataText.match(/\d+/)[0])
    };
  }

  async getBulkRatesConfiguration() {
    const voiceRate = await this.bulkRateVoiceDisplay.textContent();
    const smsRate = await this.bulkRateSMSDisplay.textContent();
    const dataRate = await this.bulkRateDataDisplay.textContent();
    
    return {
      voicePerMin: parseFloat(voiceRate.match(/[\d.]+/)[0]),
      smsPerMessage: parseFloat(smsRate.match(/[\d.]+/)[0]),
      dataPerMB: parseFloat(dataRate.match(/[\d.]+/)[0])
    };
  }

  async verifyVoLTEEnabled() {
    const volteStatus = await this.volteStatusIndicator.getAttribute('data-status');
    return volteStatus === 'active' || volteStatus === 'enabled';
  }

  async getESIMConfiguredAPNs() {
    const esimElements = await this.esimAPNItems.all();
    const esimAPNs = [];
    for (const element of esimElements) {
      const apnName = await element.textContent();
      esimAPNs.push(apnName.trim());
    }
    return esimAPNs;
  }

  async navigateToSIACUnico() {
    await this.siacUnicoNavigationTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getTransactionRecord() {
    const date = await this.transactionDateDisplay.textContent();
    const time = await this.transactionTimeDisplay.textContent();
    const user = await this.transactionUserDisplay.textContent();
    const plan = await this.transactionPlanDisplay.textContent();
    
    return {
      date: date.trim(),
      time: time.trim(),
      user: user.trim(),
      plan: plan.trim()
    };
  }
}

module.exports = ManufactureLinePage;