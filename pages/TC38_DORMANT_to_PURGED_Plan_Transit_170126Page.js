class PlanTransitionPage {
  constructor(page) {
    this.page = page;
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.currentPlanLabel = '[data-testid="current-plan-status"]';
    this.volteStatusLabel = '[data-testid="volte-status"]';
    this.trafficTypeLabel = '[data-testid="traffic-type"]';
    this.planChangeButton = '[data-testid="plan-change-button"]';
    this.targetPlanDropdown = '[data-testid="target-plan-dropdown"]';
    this.confirmChangeButton = '[data-testid="confirm-plan-change"]';
    this.confirmationMessageLabel = '[data-testid="confirmation-message"]';
    this.activationDateLabel = '[data-testid="plan-activation-date"]';
    this.simStatusLabel = '[data-testid="sim-status"]';
    this.activeServicesCount = '[data-testid="active-services-count"]';
    this.activeAPNsCount = '[data-testid="active-apns-count"]';
    this.instantLinkTab = '[data-testid="instant-link-tab"]';
    this.instantLinkRatePlan = '[data-testid="instant-link-rateplan"]';
    this.instantLinkServiceVoLTE = '[data-testid="instant-link-service-volte"]';
    this.instantLinkAPNsList = '[data-testid="instant-link-apns-list"]';
    this.lineManagementMenu = '[data-testid="line-management-menu"]';
  }

  async navigateToLineManagement() {
    await this.page.click(this.lineManagementMenu);
    await this.page.waitForSelector(this.lineSearchInput);
  }

  async searchLine() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.currentPlanLabel);
  }

  async getCurrentPlanStatus() {
    return await this.page.textContent(this.currentPlanLabel);
  }

  async getVoLTEStatus() {
    return await this.page.textContent(this.volteStatusLabel);
  }

  async getTrafficType() {
    return await this.page.textContent(this.trafficTypeLabel);
  }

  async openPlanChangeDialog() {
    await this.page.click(this.planChangeButton);
    await this.page.waitForSelector(this.targetPlanDropdown);
  }

  async selectTargetPlan(planName) {
    await this.page.click(this.targetPlanDropdown);
    await this.page.click(`[data-testid="plan-option-${planName}"]`);
  }

  async confirmPlanChange() {
    await this.page.click(this.confirmChangeButton);
    await this.page.waitForSelector(this.confirmationMessageLabel);
  }

  async getConfirmationMessage() {
    return await this.page.textContent(this.confirmationMessageLabel);
  }

  async getPlanActivationDate() {
    const dateText = await this.page.textContent(this.activationDateLabel);
    return dateText.trim();
  }

  async getSIMStatus() {
    return await this.page.textContent(this.simStatusLabel);
  }

  async getActiveServicesCount() {
    const countText = await this.page.textContent(this.activeServicesCount);
    return parseInt(countText, 10);
  }

  async getActiveAPNsCount() {
    const countText = await this.page.textContent(this.activeAPNsCount);
    return parseInt(countText, 10);
  }

  async navigateToInstantLinkProvisioning() {
    await this.page.click(this.instantLinkTab);
    await this.page.waitForSelector(this.instantLinkRatePlan);
  }

  async getInstantLinkRatePlan() {
    return await this.page.textContent(this.instantLinkRatePlan);
  }

  async hasInstantLinkServiceVoLTE() {
    return await this.page.isVisible(this.instantLinkServiceVoLTE);
  }

  async getInstantLinkAPNs() {
    const apnsText = await this.page.textContent(this.instantLinkAPNsList);
    if (!apnsText || apnsText.trim() === '') {
      return [];
    }
    return apnsText.split(',').map(apn => apn.trim()).filter(apn => apn !== '');
  }
}

module.exports = PlanTransitionPage;