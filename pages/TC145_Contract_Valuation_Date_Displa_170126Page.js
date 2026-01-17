class ContractValuationPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.mainScreen = '[data-testid="main-dashboard"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.valuationDateLabel = '[data-testid="valuation-date-label"]';
    this.valuationDateValue = '[data-testid="valuation-date-value"]';
    this.contractLoadingIndicator = '[data-testid="contract-loading"]';
  }

  async navigateToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreen);
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractSearchInput);
  }

  async searchAndSelectActiveContract() {
    const contractNumber = process.env.TEST_CONTRACT_NUMBER || '';
    if (contractNumber) {
      await this.page.fill(this.contractSearchInput, contractNumber);
      await this.page.waitForTimeout(500);
    }
    await this.page.click(`${this.contractListItem}:first-child`);
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this.contractLoadingIndicator, { state: 'hidden', timeout: 10000 }).catch(() => {});
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 15000 });
  }

  async isValuationDateVisible() {
    await this.page.waitForSelector(this.valuationDateValue, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.valuationDateValue);
  }

  async getValuationDateText() {
    await this.page.waitForSelector(this.valuationDateValue);
    return await this.page.textContent(this.valuationDateValue);
  }

  isValidDateFormat(dateString) {
    if (!dateString || dateString.trim() === '') {
      return false;
    }
    const datePatterns = [
      /^\d{2}\/\d{2}\/\d{4}$/,
      /^\d{4}-\d{2}-\d{2}$/,
      /^\d{2}-\d{2}-\d{4}$/,
      /^\d{1,2}\s+de\s+\w+\s+de\s+\d{4}$/i,
      /^\w+\s+\d{1,2},\s+\d{4}$/i
    ];
    return datePatterns.some(pattern => pattern.test(dateString.trim()));
  }

  async getExpectedSystemDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  compareDates(displayedDate, expectedDate) {
    if (!displayedDate || !expectedDate) {
      return false;
    }
    const normalizeDate = (dateStr) => {
      const cleaned = dateStr.trim().replace(/\s+/g, ' ');
      return cleaned;
    };
    const displayed = normalizeDate(displayedDate);
    const expected = normalizeDate(expectedDate);
    if (displayed === expected) {
      return true;
    }
    const parseDate = (str) => {
      const formats = [
        { regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, order: ['d', 'm', 'y'] },
        { regex: /^(\d{4})-(\d{2})-(\d{2})$/, order: ['y', 'm', 'd'] },
        { regex: /^(\d{2})-(\d{2})-(\d{4})$/, order: ['d', 'm', 'y'] }
      ];
      for (const fmt of formats) {
        const match = str.match(fmt.regex);
        if (match) {
          const parts = {};
          fmt.order.forEach((key, idx) => { parts[key] = parseInt(match[idx + 1], 10); });
          return new Date(parts.y, parts.m - 1, parts.d);
        }
      }
      return null;
    };
    const displayedParsed = parseDate(displayed);
    const expectedParsed = parseDate(expected);
    if (displayedParsed && expectedParsed) {
      return displayedParsed.getTime() === expectedParsed.getTime();
    }
    return false;
  }
}

module.exports = ContractValuationPage;