class PackageActivationPage {
  constructor(page) {
    this.page = page;
    this.packageManagementUrl = '/package-management';
    this.bscs7ConsoleUrl = '/bscs7/console';
    
    this.gmLineSelector = '[data-testid="gm-line-selector"]';
    this.activeLineOption = '[data-testid="active-gm-line-sold"]';
    this.packagesContainer = '[data-testid="packages-container"]';
    this.packageTypeDropdown = '[data-testid="package-type-dropdown"]';
    this.packageSizeDropdown = '[data-testid="package-size-dropdown"]';
    this.activatePackageButton = '[data-testid="activate-package-btn"]';
    this.packageStatusIndicator = '[data-testid="package-status"]';
    this.bscs7ConfigStatus = '[data-testid="bscs7-config-status"]';
    this.bscs7PackageList = '[data-testid="bscs7-package-list"]';
    this.bscs7PackageRow = '[data-testid="bscs7-package-row"]';
    this.packageQueueContainer = '[data-testid="package-queue-container"]';
    this.packageQueueViewButton = '[data-testid="view-package-queue-btn"]';
    this.queueSummaryActive = '[data-testid="queue-summary-active"]';
    this.queueSummaryQueued = '[data-testid="queue-summary-queued"]';
    this.queueOrderList = '[data-testid="queue-order-list"]';
  }

  async navigateToPackageManagement() {
    await this.page.goto(this.packageManagementUrl);
    await this.page.waitForSelector(this.packagesContainer);
  }

  async selectActiveGMLine() {
    await this.page.click(this.gmLineSelector);
    await this.page.click(this.activeLineOption);
  }

  async verifyPackagesAvailable() {
    const packages = await this.page.locator(this.packagesContainer).isVisible();
    return packages;
  }

  async verifyBSCS7Configuration() {
    const configStatus = await this.page.locator(this.bscs7ConfigStatus).textContent();
    return configStatus === 'configured';
  }

  async selectPackageType(type) {
    await this.page.click(this.packageTypeDropdown);
    await this.page.click(`[data-testid="package-type-option-${type.toLowerCase()}"]`);
  }

  async selectPackageSize(size) {
    await this.page.click(this.packageSizeDropdown);
    await this.page.click(`[data-testid="package-size-option-${size.toLowerCase()}"]`);
  }

  async clickActivatePackage() {
    await this.page.click(this.activatePackageButton);
    await this.page.waitForSelector(this.packageStatusIndicator);
  }

  async getPackageStatus(type, size) {
    const statusSelector = `[data-testid="package-status-${type.toLowerCase()}-${size.toLowerCase()}"]`;
    const status = await this.page.locator(statusSelector).textContent();
    return status.trim().toLowerCase();
  }

  async navigateToBSCS7Console() {
    await this.page.goto(this.bscs7ConsoleUrl);
    await this.page.waitForSelector(this.bscs7PackageList);
  }

  async queryPackageStatuses() {
    await this.page.click('[data-testid="query-packages-btn"]');
    await this.page.waitForSelector(this.bscs7PackageRow);
  }

  async getBSCS7PackageStatus(packageIndex) {
    const row = this.page.locator(this.bscs7PackageRow).nth(packageIndex - 1);
    const status = await row.locator('[data-testid="package-row-status"]').textContent();
    return status.trim().toLowerCase();
  }

  async openPackageQueueView() {
    await this.page.click(this.packageQueueViewButton);
    await this.page.waitForSelector(this.packageQueueContainer);
  }

  async getPackageQueueSummary() {
    const activeText = await this.page.locator(this.queueSummaryActive).textContent();
    const queuedText = await this.page.locator(this.queueSummaryQueued).textContent();
    const activeCount = parseInt(activeText.match(/\d+/)[0], 10);
    const queuedCount = parseInt(queuedText.match(/\d+/)[0], 10);
    return {
      totalPackages: activeCount + queuedCount,
      activeCount: activeCount,
      queuedCount: queuedCount
    };
  }

  async verifyQueueOrder() {
    const queueItems = await this.page.locator(`${this.queueOrderList} [data-testid="queue-item"]`).all();
    if (queueItems.length !== 3) return false;
    const firstItemOrder = await queueItems[0].getAttribute('data-order');
    const secondItemOrder = await queueItems[1].getAttribute('data-order');
    const thirdItemOrder = await queueItems[2].getAttribute('data-order');
    return parseInt(firstItemOrder) < parseInt(secondItemOrder) && parseInt(secondItemOrder) < parseInt(thirdItemOrder);
  }
}

module.exports = PackageActivationPage;