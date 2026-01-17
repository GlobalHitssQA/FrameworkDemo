class VersioningPage {
  constructor(page) {
    this.page = page;
    this.versionConfigUrl = '/admin/versioning';
    this.updateSimulationUrl = '/admin/versioning/simulate';
    this.systemLogsUrl = '/admin/logs';
    
    this.systemReleaseLabel = '[data-testid="system-release-label"]';
    this.componentVersionDisplay = '[data-testid="component-version-display"]';
    this.queryVersionButton = '[data-testid="query-version-btn"]';
    this.versionMetadataPanel = '[data-testid="version-metadata-panel"]';
    this.metadataVersionField = '[data-testid="metadata-version"]';
    this.metadataBuildDateField = '[data-testid="metadata-build-date"]';
    this.metadataComponentIdField = '[data-testid="metadata-component-id"]';
    this.futureVersionSelect = '[data-testid="future-version-select"]';
    this.futureVersionOption = '[data-testid="future-version-option"]';
    this.simulateUpdateButton = '[data-testid="simulate-update-btn"]';
    this.compatibilityStatusLabel = '[data-testid="compatibility-status"]';
    this.updateStatusLabel = '[data-testid="update-status"]';
    this.systemLogsContainer = '[data-testid="system-logs-container"]';
    this.logSearchInput = '[data-testid="log-search-input"]';
    this.logEntryVersionTag = '[data-testid="log-entry-version"]';
    this.updatedMetadataPanel = '[data-testid="updated-metadata-panel"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractCompositionComponent = '[data-testid="contract-composition-component"]';
  }

  async navigateToVersioningConfig() {
    await this.page.goto(this.versionConfigUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentSystemRelease() {
    await this.page.waitForSelector(this.systemReleaseLabel);
    return await this.page.textContent(this.systemReleaseLabel);
  }

  async queryComponentVersion() {
    await this.page.waitForSelector(this.queryVersionButton);
    await this.page.click(this.queryVersionButton);
    await this.page.waitForSelector(this.componentVersionDisplay);
  }

  async getDisplayedComponentVersion() {
    await this.page.waitForSelector(this.componentVersionDisplay);
    return await this.page.textContent(this.componentVersionDisplay);
  }

  async verifyVersionMetadataExists() {
    await this.page.waitForSelector(this.versionMetadataPanel);
    return await this.page.isVisible(this.versionMetadataPanel);
  }

  async getVersionMetadataInfo() {
    await this.page.waitForSelector(this.versionMetadataPanel);
    const version = await this.page.textContent(this.metadataVersionField);
    const buildDate = await this.page.textContent(this.metadataBuildDateField);
    const componentId = await this.page.textContent(this.metadataComponentIdField);
    return {
      version: version ? version.trim() : null,
      buildDate: buildDate ? buildDate.trim() : null,
      componentId: componentId ? componentId.trim() : null
    };
  }

  async navigateToUpdateSimulation() {
    await this.page.goto(this.updateSimulationUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async selectFutureReleaseVersion() {
    await this.page.waitForSelector(this.futureVersionSelect);
    await this.page.click(this.futureVersionSelect);
    await this.page.waitForSelector(this.futureVersionOption);
    await this.page.click(this.futureVersionOption + ':last-child');
  }

  async executeUpdateSimulation() {
    await this.page.waitForSelector(this.simulateUpdateButton);
    await this.page.click(this.simulateUpdateButton);
    await this.page.waitForSelector(this.updateStatusLabel);
  }

  async getCompatibilityStatus() {
    await this.page.waitForSelector(this.compatibilityStatusLabel);
    const status = await this.page.textContent(this.compatibilityStatusLabel);
    return status ? status.trim().toLowerCase() : null;
  }

  async getUpdateStatus() {
    await this.page.waitForSelector(this.updateStatusLabel);
    const status = await this.page.textContent(this.updateStatusLabel);
    return status ? status.trim().toLowerCase() : null;
  }

  async navigateToSystemLogs() {
    await this.page.goto(this.systemLogsUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async findVersionInLogs() {
    await this.page.waitForSelector(this.systemLogsContainer);
    await this.page.fill(this.logSearchInput, 'version update');
    await this.page.press(this.logSearchInput, 'Enter');
    await this.page.waitForTimeout(1000);
    return await this.page.isVisible(this.logEntryVersionTag);
  }

  async getUpdatedVersionMetadata() {
    await this.page.waitForSelector(this.updatedMetadataPanel);
    const versionText = await this.page.textContent(this.updatedMetadataPanel + ' ' + this.metadataVersionField);
    return {
      version: versionText ? versionText.trim() : null
    };
  }
}

module.exports = VersioningPage;