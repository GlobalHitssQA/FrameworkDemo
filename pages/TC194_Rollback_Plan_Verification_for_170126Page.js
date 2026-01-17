class RollbackPlanPage {
  constructor(page) {
    this.page = page;
    this.rollbackDashboardUrl = '/admin/deployment/rollback';
    
    this.rollbackDocumentationLink = '[data-testid="rollback-documentation-link"]';
    this.rollbackPlanContainer = '[data-testid="rollback-plan-container"]';
    this.rollbackStepsList = '[data-testid="rollback-steps-list"]';
    this.backupVersionIndicator = '[data-testid="backup-version-indicator"]';
    this.createBackupButton = '[data-testid="create-backup-button"]';
    this.backupStatusBadge = '[data-testid="backup-status-badge"]';
    this.backupDataValidation = '[data-testid="backup-data-validation"]';
    this.simulateFailureButton = '[data-testid="simulate-failure-button"]';
    this.failureDetectionAlert = '[data-testid="failure-detection-alert"]';
    this.rollbackTriggerIndicator = '[data-testid="rollback-trigger-indicator"]';
    this.executeRollbackButton = '[data-testid="execute-rollback-button"]';
    this.rollbackProgressBar = '[data-testid="rollback-progress-bar"]';
    this.rollbackStatusMessage = '[data-testid="rollback-status-message"]';
    this.rollbackErrorContainer = '[data-testid="rollback-error-container"]';
    this.currentVersionLabel = '[data-testid="current-version-label"]';
    this.previousVersionLabel = '[data-testid="previous-version-label"]';
    this.dataIntegrityCheck = '[data-testid="data-integrity-check"]';
    this.componentAccessStatus = '[data-testid="component-access-status"]';
    this.componentFunctionalityStatus = '[data-testid="component-functionality-status"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.confirmRollbackModal = '[data-testid="confirm-rollback-modal"]';
    this.confirmRollbackButton = '[data-testid="confirm-rollback-button"]';
  }

  async navigateToRollbackDashboard() {
    await this.page.goto(this.rollbackDashboardUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isRollbackDocumentationAvailable() {
    return await this.page.locator(this.rollbackDocumentationLink).isVisible();
  }

  async verifyBackupVersionExists() {
    const indicator = this.page.locator(this.backupVersionIndicator);
    if (await indicator.isVisible()) {
      const status = await indicator.getAttribute('data-status');
      return status === 'available';
    }
    return false;
  }

  async openRollbackPlanDocumentation() {
    await this.page.locator(this.rollbackDocumentationLink).click();
    await this.page.waitForSelector(this.rollbackPlanContainer);
  }

  async verifyPlanContainsDetailedSteps() {
    const stepsList = this.page.locator(this.rollbackStepsList);
    const stepsCount = await stepsList.locator('li').count();
    return stepsCount >= 3;
  }

  async createComponentBackup() {
    await this.page.locator(this.createBackupButton).click();
    await this.page.waitForSelector(`${this.backupStatusBadge}[data-status="in-progress"]`);
    await this.page.waitForSelector(`${this.backupStatusBadge}[data-status="success"]`, { timeout: 60000 });
  }

  async getBackupStatus() {
    const statusBadge = this.page.locator(this.backupStatusBadge);
    return await statusBadge.getAttribute('data-status');
  }

  async verifyBackupContainsAllData() {
    const validation = this.page.locator(this.backupDataValidation);
    const validationStatus = await validation.getAttribute('data-complete');
    return validationStatus === 'true';
  }

  async simulateCriticalFailure() {
    await this.page.locator(this.simulateFailureButton).click();
    await this.page.waitForSelector(this.failureDetectionAlert);
  }

  async isFailureDetected() {
    return await this.page.locator(this.failureDetectionAlert).isVisible();
  }

  async isRollbackProcessTriggered() {
    const indicator = this.page.locator(this.rollbackTriggerIndicator);
    return await indicator.isVisible();
  }

  async executeRollbackProcedure() {
    await this.page.locator(this.executeRollbackButton).click();
    const modal = this.page.locator(this.confirmRollbackModal);
    if (await modal.isVisible()) {
      await this.page.locator(this.confirmRollbackButton).click();
    }
    await this.page.waitForSelector(`${this.rollbackStatusMessage}[data-status="completed"]`, { timeout: 120000 });
  }

  async getRollbackExecutionStatus() {
    const statusMessage = this.page.locator(this.rollbackStatusMessage);
    return await statusMessage.getAttribute('data-status');
  }

  async hasRollbackErrors() {
    const errorContainer = this.page.locator(this.rollbackErrorContainer);
    if (await errorContainer.isVisible()) {
      const errorCount = await errorContainer.locator('.error-item').count();
      return errorCount > 0;
    }
    return false;
  }

  async getCurrentComponentVersion() {
    const versionLabel = this.page.locator(this.currentVersionLabel);
    return await versionLabel.textContent();
  }

  async getPreviousComponentVersion() {
    const versionLabel = this.page.locator(this.previousVersionLabel);
    return await versionLabel.textContent();
  }

  async verifyAllDataIntact() {
    const integrityCheck = this.page.locator(this.dataIntegrityCheck);
    const status = await integrityCheck.getAttribute('data-integrity');
    return status === 'valid';
  }

  async isComponentAccessibleToUsers() {
    const accessStatus = this.page.locator(this.componentAccessStatus);
    const status = await accessStatus.getAttribute('data-accessible');
    return status === 'true';
  }

  async verifyComponentFunctionality() {
    const functionalityStatus = this.page.locator(this.componentFunctionalityStatus);
    const status = await functionalityStatus.getAttribute('data-functional');
    if (status !== 'true') {
      return false;
    }
    const contractComponent = this.page.locator(this.contractValueComponent);
    return await contractComponent.isVisible();
  }
};

module.exports = RollbackPlanPage;