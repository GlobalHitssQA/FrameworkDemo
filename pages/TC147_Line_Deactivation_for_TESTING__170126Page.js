const { expect } = require('@playwright/test');

class LineDeactivationPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.userProfileIndicator = page.locator('[data-testid="user-profile-indicator"]');
    
    // Navigation locators
    this.lineManagementMenu = page.locator('[data-testid="line-management-menu"]');
    this.instantLinkSection = page.locator('[data-testid="instant-link-section"]');
    this.bscs7Section = page.locator('[data-testid="bscs7-section"]');
    this.siacUnicoSection = page.locator('[data-testid="siac-unico-section"]');
    
    // Line management locators
    this.lineSearchInput = page.locator('[data-testid="line-search-input"]');
    this.lineStatusLabel = page.locator('[data-testid="line-status-label"]');
    this.linePlanLabel = page.locator('[data-testid="line-plan-label"]');
    this.lineTestingPlanRow = page.locator('[data-testid="line-row-testing-plan"]');
    this.lineCheckbox = page.locator('[data-testid="line-selection-checkbox"]');
    
    // Deactivation process locators
    this.deactivateButton = page.locator('[data-testid="deactivate-line-button"]');
    this.confirmDeactivationButton = page.locator('[data-testid="confirm-deactivation-button"]');
    this.deactivationSuccessMessage = page.locator('[data-testid="deactivation-success-message"]');
    this.deprovisioningStatusIndicator = page.locator('[data-testid="deprovisioning-status"]');
    
    // Connection status locators
    this.instantLinkConnectionStatus = page.locator('[data-testid="instant-link-connection-status"]');
    this.bscs7ConnectionStatus = page.locator('[data-testid="bscs7-connection-status"]');
    this.networkConnectionStatus = page.locator('[data-testid="network-connection-status"]');
    
    // INSTANT LINK locators
    this.instantLinkLineStatus = page.locator('[data-testid="instant-link-line-status"]');
    this.instantLinkServicesStatus = page.locator('[data-testid="instant-link-services-status"]');
    this.instantLinkAPNsStatus = page.locator('[data-testid="instant-link-apns-status"]');
    
    // BSCS7 locators
    this.bscs7LineStatus = page.locator('[data-testid="bscs7-line-status"]');
    this.bscs7ProportionalBilling = page.locator('[data-testid="bscs7-proportional-billing"]');
    
    // Network systems locators
    this.hlrVoLTEStatus = page.locator('[data-testid="hlr-volte-status"]');
    this.hssVoLTEStatus = page.locator('[data-testid="hss-volte-status"]');
    this.imsVoLTEStatus = page.locator('[data-testid="ims-volte-status"]');
    this.serviceVoLTEParameter = page.locator('[data-testid="service-volte-parameter"]');
    
    // SIAC Unico locators
    this.siacTransactionTable = page.locator('[data-testid="siac-transaction-table"]');
    this.siacTransactionDate = page.locator('[data-testid="siac-transaction-date"]');
    this.siacTransactionTime = page.locator('[data-testid="siac-transaction-time"]');
    this.siacTransactionUser = page.locator('[data-testid="siac-transaction-user"]');
    this.siacTransactionPlan = page.locator('[data-testid="siac-transaction-plan"]');
  }

  async navigateToLoginPage() {
    await this.page.goto('/');
  }

  async loginWithDeactivationPermissions() {
    await this.usernameInput.fill(process.env.DEACTIVATION_USER || 'admin_deactivation');
    await this.passwordInput.fill(process.env.DEACTIVATION_PASSWORD || 'secure_password');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isUserAuthenticated() {
    return await this.userProfileIndicator.isVisible();
  }

  async navigateToLineManagement() {
    await this.lineManagementMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLineInTestingPlan() {
    await this.lineTestingPlanRow.waitFor({ state: 'visible' });
    const status = await this.lineStatusLabel.textContent();
    const plan = await this.linePlanLabel.textContent();
    return status === 'active' && plan === 'TESTING';
  }

  async verifyInstantLinkConnection() {
    const status = await this.instantLinkConnectionStatus.textContent();
    return status === 'connected';
  }

  async verifyBSCS7Connection() {
    const status = await this.bscs7ConnectionStatus.textContent();
    return status === 'connected';
  }

  async verifyNetworkConnection() {
    const status = await this.networkConnectionStatus.textContent();
    return status === 'active';
  }

  async selectLineForDeactivation() {
    await this.lineCheckbox.click();
  }

  async initiateDeactivationProcess() {
    await this.deactivateButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async confirmDeactivation() {
    await this.confirmDeactivationButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isDeactivationRequestAccepted() {
    return await this.deactivationSuccessMessage.isVisible();
  }

  async isDeprovisioningInProgress() {
    const status = await this.deprovisioningStatusIndicator.textContent();
    return status === 'processing' || status === 'completed';
  }

  async navigateToInstantLink() {
    await this.instantLinkSection.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getLineStatusInInstantLink() {
    return await this.instantLinkLineStatus.textContent();
  }

  async areServicesDeactivatedInInstantLink() {
    const status = await this.instantLinkServicesStatus.textContent();
    return status === 'deactivated';
  }

  async areAPNsUnconfigured() {
    const status = await this.instantLinkAPNsStatus.textContent();
    return status === 'unconfigured';
  }

  async navigateToBSCS7() {
    await this.bscs7Section.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getLineStatusInBSCS7() {
    return await this.bscs7LineStatus.textContent();
  }

  async isProportionalBillingGenerated() {
    return await this.bscs7ProportionalBilling.isVisible();
  }

  async isVoLTEDeactivatedInHLR() {
    const status = await this.hlrVoLTEStatus.textContent();
    return status === 'deactivated';
  }

  async isVoLTEDeactivatedInHSS() {
    const status = await this.hssVoLTEStatus.textContent();
    return status === 'deactivated';
  }

  async isVoLTEDeactivatedInIMS() {
    const status = await this.imsVoLTEStatus.textContent();
    return status === 'deactivated';
  }

  async isServiceVoLTEParameterRemoved() {
    return !(await this.serviceVoLTEParameter.isVisible());
  }

  async navigateToSIACUnico() {
    await this.siacUnicoSection.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isDeactivationTransactionRegistered() {
    return await this.siacTransactionTable.isVisible();
  }

  async getTransactionDetails() {
    return {
      date: await this.siacTransactionDate.textContent(),
      time: await this.siacTransactionTime.textContent(),
      user: await this.siacTransactionUser.textContent(),
      plan: await this.siacTransactionPlan.textContent()
    };
  }
}

module.exports = LineDeactivationPage;