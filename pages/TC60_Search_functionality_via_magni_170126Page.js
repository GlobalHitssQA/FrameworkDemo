class ActicenterHeaderPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    this.header = '[data-testid="acticenter-header"]';
    this.searchIcon = '[data-testid="header-search-icon"]';
    this.searchIconAlt = '#header-search-btn';
    this.searchIconByRole = 'button[aria-label="Buscar cliente o contrato"]';
    this.headerContainer = '[data-testid="header-container"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async isHeaderVisible() {
    const header = this.page.locator(this.header);
    return await header.isVisible();
  }

  async locateSearchIcon() {
    const searchIcon = this.page.locator(this.searchIcon);
    const isVisible = await searchIcon.isVisible().catch(() => false);
    if (!isVisible) {
      const altIcon = this.page.locator(this.searchIconAlt);
      const isAltVisible = await altIcon.isVisible().catch(() => false);
      if (!isAltVisible) {
        await this.page.locator(this.searchIconByRole).waitFor({ state: 'visible', timeout: 5000 });
      }
    }
  }

  async isSearchIconVisible() {
    const searchIcon = this.page.locator(this.searchIcon);
    const isVisible = await searchIcon.isVisible().catch(() => false);
    if (isVisible) return true;
    const altIcon = this.page.locator(this.searchIconAlt);
    const isAltVisible = await altIcon.isVisible().catch(() => false);
    if (isAltVisible) return true;
    const roleIcon = this.page.locator(this.searchIconByRole);
    return await roleIcon.isVisible().catch(() => false);
  }

  async isSearchIconPositionedInHeader() {
    const header = this.page.locator(this.header);
    const searchIcon = this.page.locator(this.searchIcon);
    const headerBox = await header.boundingBox();
    const iconBox = await searchIcon.boundingBox().catch(() => null);
    if (!headerBox || !iconBox) {
      const altIcon = this.page.locator(this.searchIconAlt);
      const altIconBox = await altIcon.boundingBox().catch(() => null);
      if (!altIconBox) return false;
      return altIconBox.y >= headerBox.y && altIconBox.y <= headerBox.y + headerBox.height;
    }
    return iconBox.y >= headerBox.y && iconBox.y <= headerBox.y + headerBox.height;
  }

  async isSearchIconAccessible() {
    const searchIcon = this.page.locator(this.searchIcon);
    const isEnabled = await searchIcon.isEnabled().catch(() => false);
    if (isEnabled) return true;
    const altIcon = this.page.locator(this.searchIconAlt);
    const isAltEnabled = await altIcon.isEnabled().catch(() => false);
    if (isAltEnabled) return true;
    const roleIcon = this.page.locator(this.searchIconByRole);
    return await roleIcon.isEnabled().catch(() => false);
  }

  async clickSearchIcon() {
    const searchIcon = this.page.locator(this.searchIcon);
    const isVisible = await searchIcon.isVisible().catch(() => false);
    if (isVisible) {
      await searchIcon.click();
      return;
    }
    const altIcon = this.page.locator(this.searchIconAlt);
    const isAltVisible = await altIcon.isVisible().catch(() => false);
    if (isAltVisible) {
      await altIcon.click();
      return;
    }
    await this.page.locator(this.searchIconByRole).click();
  }
}

module.exports = ActicenterHeaderPage;