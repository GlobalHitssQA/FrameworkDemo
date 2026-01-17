class BreakdownPopupPage {
  constructor(page) {
    this.page = page;
    this.totalValueComponent = page.locator('[data-testid="total-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownItems = page.locator('[data-testid="breakdown-item"]');
    this.itemNames = page.locator('[data-testid="breakdown-item-name"]');
    this.itemValues = page.locator('[data-testid="breakdown-item-value"]');
  }

  async navigateToContractView() {
    await this.page.goto('/contracts');
  }

  async waitForContractLoaded() {
    await this.totalValueComponent.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async getBreakdownItemsCount() {
    return await this.breakdownItems.count();
  }

  async getItemNamesTextAlign() {
    const alignments = [];
    const count = await this.itemNames.count();
    for (let i = 0; i < count; i++) {
      const element = this.itemNames.nth(i);
      const textAlign = await element.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return computed.textAlign;
      });
      const normalizedAlign = textAlign === 'start' ? 'left' : textAlign;
      alignments.push(normalizedAlign);
    }
    return alignments;
  }

  async getMonetaryValuesTextAlign() {
    const alignments = [];
    const count = await this.itemValues.count();
    for (let i = 0; i < count; i++) {
      const element = this.itemValues.nth(i);
      const textAlign = await element.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return computed.textAlign;
      });
      const normalizedAlign = textAlign === 'end' ? 'right' : textAlign;
      alignments.push(normalizedAlign);
    }
    return alignments;
  }

  async getVerticalSpacingsBetweenItems() {
    const spacings = [];
    const count = await this.breakdownItems.count();
    if (count < 2) return spacings;
    const boundingBoxes = [];
    for (let i = 0; i < count; i++) {
      const box = await this.breakdownItems.nth(i).boundingBox();
      boundingBoxes.push(box);
    }
    for (let i = 0; i < boundingBoxes.length - 1; i++) {
      const currentBottom = boundingBoxes[i].y + boundingBoxes[i].height;
      const nextTop = boundingBoxes[i + 1].y;
      const spacing = nextTop - currentBottom;
      spacings.push(spacing);
    }
    return spacings;
  }
}

module.exports = BreakdownPopupPage;