class BSCS7PlanChangePage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = page.locator('[data-testid="bscs7-username"]');
    this.loginPasswordInput = page.locator('[data-testid="bscs7-password"]');
    this.loginButton = page.locator('[data-testid="bscs7-login-btn"]');
    
    this.planChangeMenuOption = page.locator('[data-testid="menu-plan-change"]');
    this.lineSearchInput = page.locator('[data-testid="line-search-input"]');
    this.searchLineButton = page.locator('[data-testid="search-line-btn"]');
    
    this.sourceRateplanDropdown = page.locator('[data-testid="source-rateplan-select"]');
    this.destinationRateplanDropdown = page.locator('[data-testid="destination-rateplan-select"]');
    this.executePlanChangeButton = page.locator('[data-testid="execute-plan-change-btn"]');
    
    this.planChangeSuccessMessage = page.locator('[data-testid="plan-change-success-msg"]');
    this.currentRateplanLabel = page.locator('[data-testid="current-rateplan-label"]');
    this.activationDateLabel = page.locator('[data-testid="activation-date-label"]');
    
    this.lineStatusSection = page.locator('[data-testid="line-status-section"]');
    this.servicesStatusTable = page.locator('[data-testid="services-status-table"]');
    this.apnsStatusTable = page.locator('[data-testid="apns-status-table"]');
    this.volteStatusIndicator = page.locator('[data-testid="volte-status-indicator"]');
    this.includedPackagesTable = page.locator('[data-testid="included-packages-table"]');
    
    this.queryLineStatusButton = page.locator('[data-testid="query-line-status-btn"]');
    this.refreshStatusButton = page.locator('[data-testid="refresh-status-btn"]');
    
    this.systemDateTimeDisplay = page.locator('[data-testid="system-datetime-display"]');
    this.confirmationModal = page.locator('[data-testid="confirmation-modal"]');
    this.confirmButton = page.locator('[data-testid="confirm-btn"]');
    this.cancelButton = page.locator('[data-testid="cancel-btn"]');
  }

  async recordCurrentDateTime() {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDateTime;
  }

  async navigateToPlanChangeSection() {
    await this.planChangeMenuOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectSourceRateplan() {
    await this.sourceRateplanDropdown.click();
    await this.page.locator('[data-testid="rateplan-option"]').first().click();
  }

  async selectDestinationRateplan() {
    await this.destinationRateplanDropdown.click();
    await this.page.locator('[data-testid="rateplan-option"]').nth(1).click();
  }

  async executePlanChange() {
    await this.executePlanChangeButton.click();
    if (await this.confirmationModal.isVisible()) {
      await this.confirmButton.click();
    }
    await this.page.waitForLoadState('networkidle');
    return await this.planChangeSuccessMessage.isVisible();
  }

  async verifyPlanChangeProcessed() {
    return await this.planChangeSuccessMessage.isVisible();
  }

  async queryCurrentLineStatus() {
    await this.queryLineStatusButton.click();
    await this.page.waitForLoadState('networkidle');
    return await this.lineStatusSection.textContent();
  }

  async verifyRateplanUpdatedImmediately() {
    const currentRateplan = await this.currentRateplanLabel.textContent();
    return currentRateplan !== null && currentRateplan.length > 0;
  }

  async getNewPlanActivationDate() {
    return await this.activationDateLabel.textContent();
  }

  async verifyAllServicesActive() {
    await this.refreshStatusButton.click();
    await this.page.waitForLoadState('networkidle');
    
    const servicesActive = await this.servicesStatusTable.locator('[data-status="active"]').count() > 0;
    const includedActive = await this.includedPackagesTable.locator('[data-status="active"]').count() > 0;
    const apnsActive = await this.apnsStatusTable.locator('[data-status="active"]').count() > 0;
    const volteActive = await this.volteStatusIndicator.getAttribute('data-status') === 'active';
    
    return {
      services: servicesActive,
      includedPackages: includedActive,
      apns: apnsActive,
      volte: volteActive
    };
  }
};

module.exports = BSCS7PlanChangePage;