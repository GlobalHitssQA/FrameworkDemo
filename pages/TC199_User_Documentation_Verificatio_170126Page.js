const { expect } = require('@playwright/test');

class DocumentationPage {
  constructor(page) {
    this.page = page;
    
    // Locators for documentation repository
    this.documentationRepository = '[data-testid="documentation-repository"]';
    this.searchInput = '[data-testid="documentation-search-input"]';
    this.searchButton = '[data-testid="documentation-search-button"]';
    this.componentDocLink = '[data-testid="contract-value-composition-doc"]';
    
    // Locators for documentation content
    this.documentationContainer = '[data-testid="documentation-content"]';
    this.purposeSection = '[data-testid="purpose-benefits-section"]';
    this.instructionsSection = '[data-testid="step-by-step-instructions"]';
    this.screenshotImage = '[data-testid="documentation-screenshot"]';
    this.diagramImage = '[data-testid="documentation-diagram"]';
    
    // Locators for breakdown items documentation
    this.breakdownSection = '[data-testid="breakdown-items-section"]';
    this.breakdownItemExplanation = (itemName) => `[data-testid="breakdown-item-${itemName.toLowerCase().replace(/\s+/g, '-')}"]`;
    
    // Locators for use cases and examples
    this.useCasesSection = '[data-testid="use-cases-section"]';
    this.practicalExamplesSection = '[data-testid="practical-examples-section"]';
    
    // Locators for support information
    this.supportSection = '[data-testid="support-contact-section"]';
    this.supportEmail = '[data-testid="support-email"]';
    this.supportPhone = '[data-testid="support-phone"]';
    this.helpChannelLink = '[data-testid="help-channel-link"]';
  }

  async navigateToDocumentationRepository() {
    await this.page.goto(process.env.DOCUMENTATION_URL || '/documentation');
    await this.page.waitForLoadState('networkidle');
  }

  async isRepositoryAccessible() {
    return await this.page.locator(this.documentationRepository).isVisible();
  }

  async searchForComponentDocumentation(searchTerm) {
    await this.page.locator(this.searchInput).fill(searchTerm);
    await this.page.locator(this.searchButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async openComponentDocumentation() {
    await this.page.locator(this.componentDocLink).click();
    await this.page.waitForLoadState('networkidle');
  }

  async isDocumentationVisible() {
    return await this.page.locator(this.documentationContainer).isVisible();
  }

  async hasPurposeAndBenefitsSection() {
    return await this.page.locator(this.purposeSection).isVisible();
  }

  async getPurposeSectionContent() {
    return await this.page.locator(this.purposeSection).textContent();
  }

  async hasStepByStepInstructions() {
    return await this.page.locator(this.instructionsSection).isVisible();
  }

  async hasScreenshotsOrDiagrams() {
    const hasScreenshots = await this.page.locator(this.screenshotImage).count() > 0;
    const hasDiagrams = await this.page.locator(this.diagramImage).count() > 0;
    return hasScreenshots || hasDiagrams;
  }

  async hasBreakdownItemExplanation(itemName) {
    const selector = this.breakdownItemExplanation(itemName);
    const itemExists = await this.page.locator(selector).isVisible().catch(() => false);
    if (!itemExists) {
      const breakdownContent = await this.page.locator(this.breakdownSection).textContent();
      return breakdownContent.toLowerCase().includes(itemName.toLowerCase());
    }
    return itemExists;
  }

  async hasUseCasesSection() {
    return await this.page.locator(this.useCasesSection).isVisible();
  }

  async hasPracticalExamples() {
    return await this.page.locator(this.practicalExamplesSection).isVisible();
  }

  async hasSupportContactInformation() {
    const hasEmail = await this.page.locator(this.supportEmail).isVisible().catch(() => false);
    const hasPhone = await this.page.locator(this.supportPhone).isVisible().catch(() => false);
    const hasHelpChannel = await this.page.locator(this.helpChannelLink).isVisible().catch(() => false);
    const hasSupportSection = await this.page.locator(this.supportSection).isVisible().catch(() => false);
    return hasEmail || hasPhone || hasHelpChannel || hasSupportSection;
  }
}

module.exports = DocumentationPage;