class PackageQueuePage {
  constructor(page) {
    this.page = page;
    
    this.packageManagementSection = page.locator('[data-testid="package-management-section"]');
    this.gmLineStatusIndicator = page.locator('[data-testid="gm-line-status"]');
    this.queueSystemStatus = page.locator('[data-testid="bscs7-queue-status"]');
    this.packageTypeSelector = page.locator('[data-testid="package-type-selector"]');
    this.packageSizeSelector = page.locator('[data-testid="package-size-selector"]');
    this.activatePackageButton = page.locator('[data-testid="activate-package-btn"]');
    this.packageListContainer = page.locator('[data-testid="package-list-container"]');
    this.dataConsumptionInput = page.locator('[data-testid="data-consumption-input"]');
    this.simulateConsumptionButton = page.locator('[data-testid="simulate-consumption-btn"]');
    this.activePackageIndicator = page.locator('[data-testid="active-package-indicator"]');
    this.queuedPackageIndicator = page.locator('[data-testid="queued-package-indicator"]');
    this.depletedPackageIndicator = page.locator('[data-testid="depleted-package-indicator"]');
  }

  getPackageRow(packageType, packageSize) {
    return this.page.locator(`[data-testid="package-row-${packageType}-${packageSize}"]`);
  }

  getPackageStatusElement(packageType, packageSize) {
    return this.getPackageRow(packageType, packageSize).locator('[data-testid="package-status"]');
  }

  getPackageConsumedElement(packageType, packageSize) {
    return this.getPackageRow(packageType, packageSize).locator('[data-testid="package-consumed"]');
  }

  getPackageRemainingElement(packageType, packageSize) {
    return this.getPackageRow(packageType, packageSize).locator('[data-testid="package-remaining"]');
  }

  getPackagePercentageElement(packageType, packageSize) {
    return this.getPackageRow(packageType, packageSize).locator('[data-testid="package-percentage"]');
  }

  async navigateToPackageManagement() {
    await this.page.goto('/package-management');
    await this.packageManagementSection.waitFor({ state: 'visible' });
  }

  async verifyUserHasActiveGMLine() {
    await this.gmLineStatusIndicator.waitFor({ state: 'visible' });
    const status = await this.gmLineStatusIndicator.textContent();
    if (!status.includes('Active') && !status.includes('SOLD')) {
      throw new Error('User does not have an active GM line on SOLD plan');
    }
  }

  async verifyQueueSystemOperational() {
    await this.queueSystemStatus.waitFor({ state: 'visible' });
    const status = await this.queueSystemStatus.textContent();
    if (!status.includes('Operational')) {
      throw new Error('BSCS7 queue system is not operational');
    }
  }

  async activatePackage(packageType, packageSize) {
    await this.packageTypeSelector.selectOption({ label: packageType });
    await this.packageSizeSelector.selectOption({ label: packageSize });
    await this.activatePackageButton.click();
    await this.page.waitForResponse(response => 
      response.url().includes('/api/packages/activate') && response.status() === 200
    );
  }

  async getPackageStatus(packageType, packageSize) {
    const statusElement = this.getPackageStatusElement(packageType, packageSize);
    await statusElement.waitFor({ state: 'visible' });
    const statusText = await statusElement.textContent();
    return statusText.toLowerCase().trim();
  }

  async getPackageConsumption(packageType, packageSize) {
    const consumedElement = this.getPackageConsumedElement(packageType, packageSize);
    return await consumedElement.textContent();
  }

  async getPackageConsumedAmount(packageType, packageSize) {
    const consumedElement = this.getPackageConsumedElement(packageType, packageSize);
    return await consumedElement.textContent();
  }

  async getPackageRemainingAmount(packageType, packageSize) {
    const remainingElement = this.getPackageRemainingElement(packageType, packageSize);
    return await remainingElement.textContent();
  }

  async getPackageConsumptionPercentage(packageType, packageSize) {
    const percentageElement = this.getPackagePercentageElement(packageType, packageSize);
    return await percentageElement.textContent();
  }

  async simulateDataConsumption(amount) {
    await this.dataConsumptionInput.fill(amount.replace('GB', ''));
    await this.simulateConsumptionButton.click();
    await this.page.waitForResponse(response => 
      response.url().includes('/api/consumption/simulate') && response.status() === 200
    );
  }

  async isPackageReadyForConsumption(packageType, packageSize) {
    const status = await this.getPackageStatus(packageType, packageSize);
    return status === 'active';
  }
};

module.exports = PackageQueuePage;