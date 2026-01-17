const { expect } = require('@playwright/test');

class BSCS7PlanManagementPage {
  constructor(page) {
    this.page = page;
    
    this._lineManagementMenu = '[data-testid="line-management-menu"]';
    this._lineSearchInput = '[data-testid="line-search-input"]';
    this._searchButton = '[data-testid="search-line-button"]';
    this._currentPlanLabel = '[data-testid="current-plan-label"]';
    this._includedVoiceMinutes = '[data-testid="included-voice-minutes"]';
    this._includedSMS = '[data-testid="included-sms"]';
    this._includedDataMB = '[data-testid="included-data-mb"]';
    this._productiveAPNsSection = '[data-testid="productive-apns-section"]';
    this._apnStatusRow = '[data-testid="apn-status-row"]';
    this._userPermissionsIndicator = '[data-testid="user-permissions-indicator"]';
    this._planChangeButton = '[data-testid="plan-change-button"]';
    this._planChangeDialog = '[data-testid="plan-change-dialog"]';
    this._targetPlanDropdown = '[data-testid="target-plan-dropdown"]';
    this._planOptionItem = '[data-testid="plan-option-item"]';
    this._confirmPlanChangeButton = '[data-testid="confirm-plan-change-button"]';
    this._processingStatusLabel = '[data-testid="processing-status-label"]';
    this._ratePlanStatusIndicator = '[data-testid="rateplan-status-indicator"]';
    this._planActivationDateLabel = '[data-testid="plan-activation-date"]';
    this._activePlanLabel = '[data-testid="active-plan-label"]';
    this._volteStatusIndicator = '[data-testid="volte-status-indicator"]';
    this._instantLinkSection = '[data-testid="instant-link-section"]';
    this._instantLinkRatePlanStatus = '[data-testid="instant-link-rateplan-status"]';
    this._instantLinkVolteStatus = '[data-testid="instant-link-volte-status"]';
    this._instantLinkAPNStatus = '[data-testid="instant-link-apn-status"]';
  }

  async navigateToLineManagement() {
    await this.page.click(this._lineManagementMenu);
    await this.page.waitForSelector(this._lineSearchInput);
  }

  async verifyCurrentPlan(expectedPlan) {
    const planText = await this.page.textContent(this._currentPlanLabel);
    return planText.includes(expectedPlan);
  }

  async getIncludedVoiceMinutes() {
    return await this.page.textContent(this._includedVoiceMinutes);
  }

  async getIncludedSMS() {
    return await this.page.textContent(this._includedSMS);
  }

  async getIncludedDataMB() {
    return await this.page.textContent(this._includedDataMB);
  }

  async verifyProductiveAPNsEnabled() {
    const apnSection = await this.page.isVisible(this._productiveAPNsSection);
    if (!apnSection) return false;
    const apnRows = await this.page.locator(this._apnStatusRow).all();
    for (const row of apnRows) {
      const status = await row.getAttribute('data-status');
      if (status !== 'enabled') return false;
    }
    return true;
  }

  async verifyUserHasPlanChangePermissions() {
    const permissionsElement = await this.page.locator(this._userPermissionsIndicator);
    const permissions = await permissionsElement.getAttribute('data-permissions');
    return permissions.includes('plan-change');
  }

  async openPlanChangeDialog() {
    await this.page.click(this._planChangeButton);
    await this.page.waitForSelector(this._planChangeDialog);
  }

  async selectTargetPlan(planName) {
    await this.page.click(this._targetPlanDropdown);
    await this.page.click(`${this._planOptionItem}[data-plan-name="${planName}"]`);
  }

  async confirmPlanChange() {
    await this.page.click(this._confirmPlanChangeButton);
    await this.page.waitForSelector(this._processingStatusLabel);
  }

  async getPlanChangeProcessingStatus() {
    await this.page.waitForSelector(`${this._processingStatusLabel}[data-status]`);
    const statusElement = await this.page.locator(this._processingStatusLabel);
    return await statusElement.getAttribute('data-status');
  }

  async verifyRatePlanUpdated(expectedPlan) {
    const ratePlanIndicator = await this.page.locator(this._ratePlanStatusIndicator);
    const currentRatePlan = await ratePlanIndicator.getAttribute('data-rateplan');
    return currentRatePlan === expectedPlan;
  }

  async getPlanActivationDate() {
    return await this.page.textContent(this._planActivationDateLabel);
  }

  async getCurrentActivePlan() {
    return await this.page.textContent(this._activePlanLabel);
  }

  async verifyAPNEnabled(apnName) {
    const apnRow = await this.page.locator(`${this._apnStatusRow}[data-apn-name="${apnName}"]`);
    const status = await apnRow.getAttribute('data-status');
    return status === 'enabled';
  }

  async verifyVoLTEEnabled() {
    const volteIndicator = await this.page.locator(this._volteStatusIndicator);
    const status = await volteIndicator.getAttribute('data-status');
    return status === 'enabled';
  }

  async verifyInstantLinkProvisioning() {
    await this.page.waitForSelector(this._instantLinkSection);
    const ratePlanSent = await this.page.locator(this._instantLinkRatePlanStatus).getAttribute('data-sent');
    const serviceVolte = await this.page.locator(this._instantLinkVolteStatus).getAttribute('data-sent');
    const apnAttributesSent = await this.page.locator(this._instantLinkAPNStatus).getAttribute('data-sent');
    return {
      ratePlanSent: ratePlanSent === 'true',
      serviceVolte: serviceVolte === 'true',
      apnAttributesSent: apnAttributesSent === 'true'
    };
  }
}

module.exports = BSCS7PlanManagementPage;