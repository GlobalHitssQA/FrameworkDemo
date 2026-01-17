const { expect } = require('@playwright/test');

class LineDeactivationPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Line management locators
    this.lineSearchInput = page.locator('[data-testid="line-search-input"]');
    this.lineStatusLabel = page.locator('[data-testid="line-status-label"]');
    this.linePlanLabel = page.locator('[data-testid="line-plan-label"]');
    this.inPoolPackageStatus = page.locator('[data-testid="in-pool-package-status"]');
    this.lineTableRow = page.locator('[data-testid="line-table-row"]');
    this.lineCheckbox = page.locator('[data-testid="line-selection-checkbox"]');
    
    // Deactivation process locators
    this.deactivateButton = page.locator('[data-testid="deactivate-line-button"]');
    this.confirmDeactivationButton = page.locator('[data-testid="confirm-deactivation-button"]');
    this.deactivationRequestStatus = page.locator('[data-testid="deactivation-request-status"]');
    this.deprovisioningStatus = page.locator('[data-testid="deprovisioning-status"]');
    
    // INSTANT LINK locators
    this.instantLinkNavButton = page.locator('[data-testid="nav-instant-link"]');
    this.instantLinkLineStatus = page.locator('[data-testid="instant-link-line-status"]');
    this.instantLinkServicesStatus = page.locator('[data-testid="instant-link-services-status"]');
    this.instantLinkAPNsList = page.locator('[data-testid="instant-link-apns-list"]');
    this.unconfiguredAPNsCount = page.locator('[data-testid="unconfigured-apns-count"]');
    
    // BSCS7 locators
    this.bscs7NavButton = page.locator('[data-testid="nav-bscs7"]');
    this.bscs7PackageStatus = page.locator('[data-testid="bscs7-in-pool-package-status"]');
    this.bscs7CalculationParticipation = page.locator('[data-testid="bscs7-calculation-participation"]');
    
    // In Pool Shell locators
    this.inPoolShellNavButton = page.locator('[data-testid="nav-in-pool-shell"]');
    this.shellCalculationLines = page.locator('[data-testid="shell-calculation-lines"]');
    this.shellCalculationFormula = page.locator('[data-testid="shell-calculation-formula"]');
    this.shellImplementationStatus = page.locator('[data-testid="shell-implementation-status"]');
    
    // Billing locators
    this.billingNavButton = page.locator('[data-testid="nav-billing"]');
    this.proportionalChargeSection = page.locator('[data-testid="proportional-charge-section"]');
    this.chargeUsageDays = page.locator('[data-testid="charge-usage-days"]');
    this.chargeExcessConsumption = page.locator('[data-testid="charge-excess-consumption"]');
    
    // Network systems locators
    this.networkSystemsNavButton = page.locator('[data-testid="nav-network-systems"]');
    this.hlrVoLTEStatus = page.locator('[data-testid="hlr-volte-status"]');
    this.hssVoLTEStatus = page.locator('[data-testid="hss-volte-status"]');
    this.imsVoLTEStatus = page.locator('[data-testid="ims-volte-status"]');
    this.serviceVoLTEParameter = page.locator('[data-testid="service-volte-parameter"]');
    
    // SIAC Unico locators
    this.siacUnicoNavButton = page.locator('[data-testid="nav-siac-unico"]');
    this.transactionDateField = page.locator('[data-testid="transaction-date"]');
    this.transactionTimeField = page.locator('[data-testid="transaction-time"]');
    this.transactionUserField = page.locator('[data-testid="transaction-user"]');
    this.transactionPlanField = page.locator('[data-testid="transaction-plan"]');
    
    // Connection status locators
    this.instantLinkConnectionStatus = page.locator('[data-testid="instant-link-connection-status"]');
    this.bscs7ConnectionStatus = page.locator('[data-testid="bscs7-connection-status"]');
    this.networkConnectionStatus = page.locator('[data-testid="network-connection-status"]');
  }

  async navigateToLogin() {
    await this.page.goto('/login');
  }

  async loginWithDeactivationPermissions() {
    await this.usernameInput.fill(process.env.DEACTIVATION_USER || 'admin_deactivation');
    await this.passwordInput.fill(process.env.DEACTIVATION_PASSWORD || 'secure_password');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLineInSOLDPlan() {
    await this.page.goto('/lines/management');
    const planText = await this.linePlanLabel.textContent();
    return planText === 'SOLD';
  }

  async verifyActiveInPoolPackage() {
    const packageStatus = await this.inPoolPackageStatus.textContent();
    return packageStatus === 'active';
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
    return status === 'connected';
  }

  async verifyInPoolShellImplementation() {
    await this.inPoolShellNavButton.click();
    const status = await this.shellImplementationStatus.textContent();
    return status === 'implemented';
  }

  async selectLineForDeactivation() {
    await this.page.goto('/lines/management');
    await this.lineCheckbox.first().check();
  }

  async initiateDeactivationProcess() {
    await this.deactivateButton.click();
    await this.page.waitForSelector('[data-testid="deactivation-modal"]');
  }

  async confirmDeactivation() {
    await this.confirmDeactivationButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isDeactivationRequestAccepted() {
    const status = await this.deactivationRequestStatus.textContent();
    return status === 'accepted';
  }

  async isDeprovisioningProcessed() {
    const status = await this.deprovisioningStatus.textContent();
    return status === 'processed';
  }

  async navigateToInstantLink() {
    await this.instantLinkNavButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getLineStatusInInstantLink() {
    return await this.instantLinkLineStatus.textContent();
  }

  async areServicesDeactivatedInInstantLink() {
    const status = await this.instantLinkServicesStatus.textContent();
    return status === 'deactivated';
  }

  async getUnconfiguredAPNsCount() {
    const countText = await this.unconfiguredAPNsCount.textContent();
    return parseInt(countText, 10);
  }

  async navigateToBSCS7() {
    await this.bscs7NavButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getInPoolPackageStatusInBSCS7() {
    return await this.bscs7PackageStatus.textContent();
  }

  async doesPackageParticipateInCalculations() {
    const participation = await this.bscs7CalculationParticipation.textContent();
    return participation === 'yes';
  }

  async navigateToInPoolShell() {
    await this.inPoolShellNavButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isLineIncludedInShellCalculation() {
    const linesText = await this.shellCalculationLines.textContent();
    return linesText.includes(this.currentLineNumber);
  }

  async getShellCalculationFormula() {
    return await this.shellCalculationFormula.textContent();
  }

  async navigateToBillingSection() {
    await this.billingNavButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isProportionalChargeGenerated() {
    return await this.proportionalChargeSection.isVisible();
  }

  async getProportionalChargeDetails() {
    const usageDays = await this.chargeUsageDays.textContent();
    const excessConsumption = await this.chargeExcessConsumption.textContent();
    return {
      includesUsageDays: usageDays && usageDays.length > 0,
      includesExcessConsumption: excessConsumption
    };
  }

  async navigateToNetworkSystems() {
    await this.networkSystemsNavButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getVoLTEStatusInHLR() {
    return await this.hlrVoLTEStatus.textContent();
  }

  async getVoLTEStatusInHSS() {
    return await this.hssVoLTEStatus.textContent();
  }

  async getVoLTEStatusInIMS() {
    return await this.imsVoLTEStatus.textContent();
  }

  async doesServiceVoLTEParameterExist() {
    return await this.serviceVoLTEParameter.isVisible();
  }

  async navigateToSIACUnico() {
    await this.siacUnicoNavButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getDeactivationTransactionRecord() {
    return {
      date: await this.transactionDateField.textContent(),
      time: await this.transactionTimeField.textContent(),
      user: await this.transactionUserField.textContent(),
      plan: await this.transactionPlanField.textContent()
    };
  }
}

module.exports = LineDeactivationPage;