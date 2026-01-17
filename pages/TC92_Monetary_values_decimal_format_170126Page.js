class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos basados en mejores prácticas
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.breakdownCategoryItem = '[data-testid="breakdown-category-item"]';
    this.monetaryValueField = '[data-testid="monetary-value"]';
    this.authenticatedUserIndicator = '[data-testid="user-authenticated"]';
    
    // Categorías específicas del desglose
    this.poderCompraMXN = '[data-testid="category-poder-compra-mxn"]';
    this.efectivoMXN = '[data-testid="category-efectivo-mxn"]';
    this.efectivoUSD = '[data-testid="category-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="category-pendientes-liquidar"]';
    this.fondos = '[data-testid="category-fondos"]';
    this.cedesPagares = '[data-testid="category-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="category-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="category-mercado-capitales"]';
    
    // Patrón regex para validar formato monetario con dos decimales
    this.monetaryFormatRegex = /^\$[\d,]+\.\d{2}$/;
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authenticatedUserIndicator, { state: 'visible', timeout: 30000 });
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectContractWithDecimalValues() {
    await this.page.click(this.contractListItem);
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 15000 });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownCategoriesCount() {
    const categories = await this.page.$$(this.breakdownCategoryItem);
    return categories.length;
  }

  async verifyAllMonetaryValuesHaveTwoDecimals() {
    const monetaryElements = await this.page.$$(this.monetaryValueField);
    
    for (const element of monetaryElements) {
      const text = await element.textContent();
      const cleanedText = text.trim();
      
      if (!this.monetaryFormatRegex.test(cleanedText)) {
        console.log(`Invalid format found: ${cleanedText}`);
        return false;
      }
    }
    return true;
  }

  async verifyDecimalRoundingIsCorrect() {
    const monetaryElements = await this.page.$$(this.monetaryValueField);
    
    for (const element of monetaryElements) {
      const text = await element.textContent();
      const cleanedText = text.trim();
      
      // Extraer el valor numérico
      const numericValue = cleanedText.replace(/[$,]/g, '');
      const decimalPart = numericValue.split('.')[1];
      
      if (!decimalPart || decimalPart.length !== 2) {
        return false;
      }
    }
    return true;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getMonetaryValueByCategory(categorySelector) {
    const categoryElement = await this.page.$(categorySelector);
    if (!categoryElement) {
      return null;
    }
    const valueElement = await categoryElement.$(this.monetaryValueField);
    return valueElement ? await valueElement.textContent() : null;
  }
}

module.exports = ContractBreakdownPage;