const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.searchIcon = page.locator('[data-testid="search-client-contract"]');
    this.contractList = page.locator('[data-testid="contract-list"]');
    this.activeContractItem = page.locator('[data-testid="contract-item-active"]');
    this.totalValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    this.monetaryValueFields = page.locator('[data-testid="monetary-value"]');
    this.distributionTooltip = page.locator('[data-testid="distribution-tooltip"]');
    
    this.buyingPowerMXN = page.locator('[data-testid="buying-power-mxn"]');
    this.cashMXN = page.locator('[data-testid="cash-mxn"]');
    this.cashUSD = page.locator('[data-testid="cash-usd"]');
    this.pendingSettlement = page.locator('[data-testid="pending-settlement"]');
    this.fundsValue = page.locator('[data-testid="funds-value"]');
    this.cedesAndNotes = page.locator('[data-testid="cedes-notes"]');
    this.moneyMarket = page.locator('[data-testid="money-market"]');
    this.capitalMarket = page.locator('[data-testid="capital-market"]');
    
    this.userProfileIndicator = page.locator('[data-testid="user-profile"]');
    this.authenticationStatus = page.locator('[data-testid="auth-status"]');
    
    this.monetaryFormatRegex = /^-?\$[\d,]+\.\d{2}$/;
    this.twoDecimalRegex = /\.\d{2}$/;
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await expect(this.userProfileIndicator).toBeVisible({ timeout: 10000 });
  }

  async configureBackendServicesWithValidValues() {
    await this.page.route('**/api/contract/values', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          buyingPowerMXN: 150000.50,
          cashMXN: 25000.00,
          cashUSD: 5000.00,
          pendingSettlement: 3500.75,
          funds: 80000.00,
          cedesAndNotes: 45000.00,
          moneyMarket: 60000.00,
          capitalMarket: 120000.25
        })
      });
    });
  }

  async clickSearchIcon() {
    await this.searchIcon.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.activeContractItem.first().click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.totalValueComponent).toBeVisible();
  }

  async verifyMonetaryFormat() {
    await this.totalValueComponent.click();
    await expect(this.breakdownPopup).toBeVisible();
    
    const valueFields = await this.monetaryValueFields.all();
    
    for (const field of valueFields) {
      const text = await field.textContent();
      const cleanedText = text.trim();
      
      if (!this.monetaryFormatRegex.test(cleanedText)) {
        return false;
      }
    }
    
    return true;
  }

  async configureBackendWithNegativeValues() {
    await this.page.route('**/api/contract/values', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          buyingPowerMXN: 150000.50,
          cashMXN: -25000.00,
          cashUSD: 5000.00,
          pendingSettlement: -3500.75,
          funds: 80000.00,
          cedesAndNotes: 45000.00,
          moneyMarket: -60000.00,
          capitalMarket: 120000.25
        })
      });
    });
  }

  async refreshContractData() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    await this.selectActiveContract();
  }

  async verifyDataValidationOccurred() {
    const consoleMessages = [];
    
    this.page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleMessages.push(msg.text());
      }
    });
    
    await this.page.waitForTimeout(1000);
    
    const hasValidationError = consoleMessages.some(
      (msg) => msg.includes('validation') || msg.includes('invalid')
    );
    
    const popupVisible = await this.breakdownPopup.isVisible();
    
    return popupVisible || hasValidationError;
  }

  async verifyNegativeValuesHandling() {
    await this.totalValueComponent.click();
    await expect(this.breakdownPopup).toBeVisible();
    
    const valueFields = await this.monetaryValueFields.all();
    
    for (const field of valueFields) {
      const text = await field.textContent();
      const cleanedText = text.trim();
      
      if (cleanedText.includes('-')) {
        const negativeFormatValid = /^-\$[\d,]+\.\d{2}$/.test(cleanedText);
        if (!negativeFormatValid) {
          return false;
        }
      }
    }
    
    return true;
  }

  async configureBackendWithExtendedDecimals() {
    await this.page.route('**/api/contract/values', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          buyingPowerMXN: 150000.123456789,
          cashMXN: 25000.999999,
          cashUSD: 5000.005,
          pendingSettlement: 3500.7777777,
          funds: 80000.111111,
          cedesAndNotes: 45000.50505050,
          moneyMarket: 60000.12345,
          capitalMarket: 120000.999
        })
      });
    });
  }

  async verifyTwoDecimalPlaces() {
    await this.totalValueComponent.click();
    await expect(this.breakdownPopup).toBeVisible();
    
    const valueFields = await this.monetaryValueFields.all();
    
    for (const field of valueFields) {
      const text = await field.textContent();
      const cleanedText = text.trim();
      
      const numericPart = cleanedText.replace(/[^\d.]/g, '');
      const decimalMatch = numericPart.match(/\.(\d+)$/);
      
      if (decimalMatch && decimalMatch[1].length > 2) {
        return false;
      }
    }
    
    return true;
  }

  async closeBreakdownPopup() {
    await this.breakdownCloseButton.click();
    await expect(this.breakdownPopup).not.toBeVisible();
  }
}

module.exports = ContractValuePage;