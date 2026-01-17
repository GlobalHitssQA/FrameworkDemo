class PlanTransitionPage {
  constructor(page) {
    this.page = page;
    this.searchLineInput = page.locator('[data-testid="search-line-input"]');
    this.searchButton = page.locator('[data-testid="search-line-button"]');
    this.currentPlanLabel = page.locator('[data-testid="current-plan-value"]');
    this.apnStatusLabel = page.locator('[data-testid="apn-status-value"]');
    this.activeAPNsList = page.locator('[data-testid="active-apns-list"] li');
    this.planChangeSectionButton = page.locator('[data-testid="plan-change-section-btn"]');
    this.newPlanDropdown = page.locator('[data-testid="new-plan-dropdown"]');
    this.confirmPlanChangeButton = page.locator('[data-testid="confirm-plan-change-btn"]');
    this.confirmationMessageLabel = page.locator('[data-testid="confirmation-message"]');
    this.currentRatePlanLabel = page.locator('[data-testid="current-rateplan-value"]');
    this.planActivationDateLabel = page.locator('[data-testid="plan-activation-date"]');
    this.planStatusLabel = page.locator('[data-testid="plan-status-value"]');
    this.includedVoiceLabel = page.locator('[data-testid="included-voice-value"]');
    this.includedSMSLabel = page.locator('[data-testid="included-sms-value"]');
    this.includedDataLabel = page.locator('[data-testid="included-data-value"]');
    this.volteStatusLabel = page.locator('[data-testid="volte-status-value"]');
    this.instantLinkNavButton = page.locator('[data-testid="nav-instant-link"]');
    this.provisionedRatePlanLabel = page.locator('[data-testid="provisioned-rateplan-value"]');
    this.serviceVoLTELabel = page.locator('[data-testid="service-volte-status"]');
    this.apnAttributesModeLabel = page.locator('[data-testid="apn-attributes-mode"]');
    this.networkSyncStatusLabel = page.locator('[data-testid="network-sync-status"]');
  }

  async navigateToBSCS7() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async searchLine(lineNumber = process.env.TEST_LINE_NUMBER) {
    await this.searchLineInput.fill(lineNumber);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentPlan() {
    return await this.currentPlanLabel.textContent();
  }

  async getAPNStatus() {
    return await this.apnStatusLabel.textContent();
  }

  async getActiveAPNs() {
    const apns = await this.activeAPNsList.allTextContents();
    return apns;
  }

  async openPlanChangeSection() {
    await this.planChangeSectionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectNewPlan(planName) {
    await this.newPlanDropdown.selectOption({ label: planName });
  }

  async confirmPlanChange() {
    await this.confirmPlanChangeButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getConfirmationMessage() {
    return await this.confirmationMessageLabel.textContent();
  }

  async getCurrentRatePlan() {
    return await this.currentRatePlanLabel.textContent();
  }

  async getPlanActivationDate() {
    return await this.planActivationDateLabel.textContent();
  }

  async getPlanStatus() {
    return await this.planStatusLabel.textContent();
  }

  async getIncludedAllowances() {
    const voice = await this.includedVoiceLabel.textContent();
    const sms = await this.includedSMSLabel.textContent();
    const data = await this.includedDataLabel.textContent();
    return { voice, sms, data };
  }

  async getVoLTEStatus() {
    return await this.volteStatusLabel.textContent();
  }

  async navigateToInstantLink() {
    await this.instantLinkNavButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProvisionedRatePlan() {
    return await this.provisionedRatePlanLabel.textContent();
  }

  async getServiceVoLTEProvisioning() {
    return await this.serviceVoLTELabel.textContent();
  }

  async getProvisionedAPNAttributes() {
    const mode = await this.apnAttributesModeLabel.textContent();
    return { mode };
  }

  async getNetworkSyncStatus() {
    return await this.networkSyncStatusLabel.textContent();
  }
}

module.exports = PlanTransitionPage;