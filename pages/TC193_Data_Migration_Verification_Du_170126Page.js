const { expect } = require('@playwright/test');

class MigrationPage {
  constructor(page) {
    this.page = page;
    
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownTrigger = '[data-testid="breakdown-trigger"]';
    this.searchInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown"]';
    this.monetaryValueFields = '[data-testid="monetary-value"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    this.upgradeStatusIndicator = '[data-testid="upgrade-status"]';
    this.migrationLogsContainer = '[data-testid="migration-logs"]';
    this.dataStructurePanel = '[data-testid="data-structure-panel"]';
    this.backupStatusIndicator = '[data-testid="backup-status"]';
    this.contractsTable = '[data-testid="contracts-table"]';
    this.configurationPanel = '[data-testid="configuration-panel"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsSection = '[data-testid="funds-section"]';
    this.cedesAndNotes = '[data-testid="cedes-notes"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BASE_URL || 'https://ota-acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTestDataExists() {
    const contractsExist = await this.page.locator(this.contractsTable).isVisible();
    const hasRows = await this.page.locator(`${this.contractsTable} tr`).count() > 0;
    return contractsExist && hasRows;
  }

  async verifyDataStructureDocumented() {
    const structurePanel = await this.page.locator(this.dataStructurePanel).isVisible();
    return structurePanel;
  }

  async verifyBackupAvailable() {
    const backupStatus = await this.page.locator(this.backupStatusIndicator).textContent();
    return backupStatus.toLowerCase().includes('available') || backupStatus.toLowerCase().includes('ready');
  }

  async identifyStoredData() {
    const contracts = await this.extractContractData();
    const values = await this.extractValueData();
    const configurations = await this.extractConfigurationData();
    
    return {
      contracts,
      values,
      configurations,
      timestamp: new Date().toISOString()
    };
  }

  async extractContractData() {
    const contractRows = await this.page.locator(`${this.contractsTable} tr`).all();
    const contracts = [];
    
    for (const row of contractRows) {
      const cells = await row.locator('td').allTextContents();
      if (cells.length > 0) {
        contracts.push({
          data: cells
        });
      }
    }
    return contracts;
  }

  async extractValueData() {
    const values = {};
    
    if (await this.page.locator(this.purchasingPowerMXN).isVisible()) {
      values.purchasingPowerMXN = await this.page.locator(this.purchasingPowerMXN).textContent();
    }
    if (await this.page.locator(this.cashMXN).isVisible()) {
      values.cashMXN = await this.page.locator(this.cashMXN).textContent();
    }
    if (await this.page.locator(this.cashUSD).isVisible()) {
      values.cashUSD = await this.page.locator(this.cashUSD).textContent();
    }
    if (await this.page.locator(this.pendingSettlement).isVisible()) {
      values.pendingSettlement = await this.page.locator(this.pendingSettlement).textContent();
    }
    if (await this.page.locator(this.fundsSection).isVisible()) {
      values.funds = await this.page.locator(this.fundsSection).textContent();
    }
    if (await this.page.locator(this.cedesAndNotes).isVisible()) {
      values.cedesAndNotes = await this.page.locator(this.cedesAndNotes).textContent();
    }
    if (await this.page.locator(this.moneyMarket).isVisible()) {
      values.moneyMarket = await this.page.locator(this.moneyMarket).textContent();
    }
    if (await this.page.locator(this.capitalMarket).isVisible()) {
      values.capitalMarket = await this.page.locator(this.capitalMarket).textContent();
    }
    if (await this.page.locator(this.contractValueComponent).isVisible()) {
      values.totalContractValue = await this.page.locator(this.contractValueComponent).textContent();
    }
    
    return values;
  }

  async extractConfigurationData() {
    const configPanel = this.page.locator(this.configurationPanel);
    if (await configPanel.isVisible()) {
      return await configPanel.textContent();
    }
    return null;
  }

  async documentCurrentDataStructure() {
    const structure = await this.page.locator(this.dataStructurePanel).isVisible();
    return structure;
  }

  async executeUpgradeProcess() {
    await this.page.locator('[data-testid="execute-upgrade-button"]').click();
    await this.page.waitForSelector(this.upgradeStatusIndicator, { state: 'visible' });
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && (element.textContent.includes('success') || element.textContent.includes('complete') || element.textContent.includes('failed'));
      },
      this.upgradeStatusIndicator,
      { timeout: 300000 }
    );
  }

  async getUpgradeStatus() {
    const statusText = await this.page.locator(this.upgradeStatusIndicator).textContent();
    if (statusText.toLowerCase().includes('success') || statusText.toLowerCase().includes('complete')) {
      return 'success';
    }
    return 'failed';
  }

  async getAllDataAfterUpgrade() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    return await this.identifyStoredData();
  }

  async verifyContractsDisplayed() {
    return await this.page.locator(this.contractsTable).isVisible();
  }

  async verifyTotalValuesDisplayed() {
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async verifyBreakdownPreserved() {
    await this.page.locator(this.breakdownTrigger).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
    
    const breakdownVisible = await this.page.locator(this.breakdownPopup).isVisible();
    const listItems = await this.page.locator(`${this.breakdownList} li`).count();
    
    await this.page.locator(this.closeBreakdownButton).click();
    
    return breakdownVisible && listItems > 0;
  }

  async comparePreAndPostUpgradeData(preData, postData) {
    this.comparisonResult = {
      contractsMatch: JSON.stringify(preData.contracts) === JSON.stringify(postData.contracts),
      valuesMatch: JSON.stringify(preData.values) === JSON.stringify(postData.values),
      configurationsMatch: JSON.stringify(preData.configurations) === JSON.stringify(postData.configurations)
    };
    return this.comparisonResult;
  }

  async verifyDataIntegrity(preData, postData) {
    const comparison = await this.comparePreAndPostUpgradeData(preData, postData);
    const isIdentical = comparison.contractsMatch && comparison.valuesMatch && comparison.configurationsMatch;
    
    let dataLoss = 0;
    if (!comparison.contractsMatch) dataLoss++;
    if (!comparison.valuesMatch) dataLoss++;
    if (!comparison.configurationsMatch) dataLoss++;
    
    return {
      isIdentical,
      dataLoss,
      details: comparison
    };
  }

  async checkMigrationLogsForCriticalErrors() {
    const logsContainer = this.page.locator(this.migrationLogsContainer);
    const criticalErrors = [];
    
    if (await logsContainer.isVisible()) {
      const logEntries = await logsContainer.locator('[data-testid="log-entry-error"], .error, .critical').all();
      
      for (const entry of logEntries) {
        const text = await entry.textContent();
        if (text.toLowerCase().includes('critical') || text.toLowerCase().includes('fatal')) {
          criticalErrors.push(text);
        }
      }
    }
    
    return criticalErrors;
  }
}

module.exports = MigrationPage;