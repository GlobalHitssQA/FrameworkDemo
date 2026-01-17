class InstantLinkPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.INSTANT_LINK_URL || 'https://instantlink.example.com';
    
    this.loginUsernameInput = page.locator('[data-testid="login-username"]');
    this.loginPasswordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('[data-testid="login-submit"]');
    
    this.ratePlanDropdown = page.locator('[data-testid="rate-plan-selector"]');
    this.provisionLineButton = page.locator('[data-testid="provision-line-btn"]');
    this.lineNumberInput = page.locator('[data-testid="line-number-input"]');
    this.confirmProvisionButton = page.locator('[data-testid="confirm-provision-btn"]');
    
    this.apnInfoSection = page.locator('[data-testid="apn-info-section"]');
    this.apnNameField = page.locator('[data-testid="apn-name"]');
    this.apnModeField = page.locator('[data-testid="apn-mode"]');
    this.apnClassificationField = page.locator('[data-testid="apn-classification"]');
    this.apnServicesField = page.locator('[data-testid="apn-services"]');
    this.apnStatusField = page.locator('[data-testid="apn-status"]');
    this.apnBillingModalityField = page.locator('[data-testid="apn-billing-modality"]');
    this.apnInPoolField = page.locator('[data-testid="apn-in-pool-participation"]');
    
    this.billingConfigSection = page.locator('[data-testid="billing-config-section"]');
    this.billingTypeField = page.locator('[data-testid="billing-type"]');
    this.packageAssignmentToggle = page.locator('[data-testid="package-assignment-toggle"]');
    
    this.ratePlansTable = page.locator('[data-testid="rate-plans-table"]');
    this.apn2ConfigStatus = page.locator('[data-testid="apn2-config-status"]');
    this.queryPermissionsBadge = page.locator('[data-testid="query-permissions-badge"]');
    
    this.navigationMenu = page.locator('[data-testid="navigation-menu"]');
    this.billingMenuItem = page.locator('[data-testid="menu-billing"]');
    this.apn2GmsaOption = page.locator('[data-testid="apn2-gmsa-option"]');
  }

  async navigateToInstantLink() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyQueryPermissions() {
    await this.queryPermissionsBadge.waitFor({ state: 'visible' });
    const permissionsText = await this.queryPermissionsBadge.textContent();
    if (!permissionsText.includes('Query')) {
      throw new Error('User does not have query permissions');
    }
  }

  async verifyRatePlansExist() {
    await this.ratePlansTable.waitFor({ state: 'visible' });
    const ratePlans = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT'];
    for (const plan of ratePlans) {
      const planRow = this.page.locator(`[data-testid="rate-plan-row-${plan.replace(/\s+/g, '-').toLowerCase()}"]`);
      await planRow.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  async verifyApn2GmsaConfiguration() {
    await this.apn2ConfigStatus.waitFor({ state: 'visible' });
    const configStatus = await this.apn2ConfigStatus.textContent();
    if (!configStatus.includes('configured')) {
      throw new Error('APN2 gmsa is not configured in the network');
    }
  }

  async provisionLine(ratePlan) {
    await this.ratePlanDropdown.click();
    const ratePlanOption = this.page.locator(`[data-testid="rate-plan-option-${ratePlan.replace(/\s+/g, '-').toLowerCase()}"]`);
    await ratePlanOption.click();
    
    const lineNumber = this.generateLineNumber();
    await this.lineNumberInput.fill(lineNumber);
    
    await this.provisionLineButton.click();
    await this.confirmProvisionButton.click();
    
    await this.page.waitForSelector('[data-testid="provision-success-message"]', { state: 'visible' });
  }

  generateLineNumber() {
    return `LINE${Date.now()}`;
  }

  async getAssignedApnInfo() {
    await this.apnInfoSection.waitFor({ state: 'visible' });
    
    const apnName = await this.apnNameField.textContent();
    const mode = await this.apnModeField.textContent();
    const classification = await this.apnClassificationField.textContent();
    const servicesText = await this.apnServicesField.textContent();
    const status = await this.apnStatusField.textContent();
    const billingModality = await this.apnBillingModalityField.textContent();
    const inPoolText = await this.apnInPoolField.textContent();
    
    return {
      apnName: apnName.trim(),
      mode: mode.trim(),
      classification: classification.trim(),
      services: servicesText.split(',').map(s => s.trim()),
      status: status.trim(),
      billingModality: billingModality.trim(),
      inPoolParticipation: inPoolText.toLowerCase().includes('yes')
    };
  }

  async navigateToBillingConfiguration() {
    await this.navigationMenu.click();
    await this.billingMenuItem.click();
    await this.billingConfigSection.waitFor({ state: 'visible' });
  }

  async selectApn2GmsaBilling() {
    await this.apn2GmsaOption.click();
  }

  async getBillingConfiguration() {
    const billingType = await this.billingTypeField.textContent();
    const packageAssignmentEnabled = await this.packageAssignmentToggle.isChecked();
    
    return {
      type: billingType.trim().toLowerCase(),
      packageAssignmentEnabled: packageAssignmentEnabled
    };
  }
}

module.exports = InstantLinkPage;