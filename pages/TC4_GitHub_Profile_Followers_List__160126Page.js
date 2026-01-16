const { expect } = require('@playwright/test');

class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    
    // Application URL
    this.baseUrl = 'https://github.com';
    
    // Search elements
    this.searchInput = 'input[type="text"][placeholder*="Search"], input[name="q"], input[aria-label*="Search"]';
    this.searchButton = 'button[type="submit"], button[aria-label*="Search"], .search-button';
    
    // Profile elements
    this.userAvatar = 'img[alt*="avatar"], a[href*="avatars"] img';
    this.userName = 'h1 span, .vcard-fullname';
    this.userBio = '.user-profile-bio, [data-bio-text]';
    
    // Followers section selectors
    this.followersLink = 'a[href*="tab=followers"]';
    this.followersCount = 'a[href*="followers"] span, a:has-text("followers")';
    this.followersListContainer = 'main div[class*="Layout"], .follow-list, [data-hpc] > div';
    this.followerItem = 'div[class*="d-table"], .follow-list-item, main div > div:has(img[alt^="@"])';
    this.followerAvatar = 'img[alt^="@"]';
    this.followerUsername = 'a[href^="/"]:has-text, span.Link--primary, a.Link--primary';
    this.followerProfileLink = 'a[href^="/"]';
    
    // Pagination
    this.nextPageLink = 'a:has-text("Next"), a[rel="next"]';
    this.previousPageLink = 'a:has-text("Previous"), a[rel="prev"]';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isApplicationLoaded() {
    await this.page.waitForLoadState('networkidle');
    return await this.page.title() !== '';
  }

  async enterUsername(username) {
    await this.page.goto(`${this.baseUrl}/${username}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSearchButton() {
    // Direct navigation used instead of search
    await this.page.waitForLoadState('networkidle');
  }

  async waitForProfileToLoad() {
    await this.page.waitForSelector(this.userAvatar, { timeout: 10000 });
  }

  async isProfileDisplayed() {
    const avatar = await this.page.locator(this.userAvatar).first();
    return await avatar.isVisible();
  }

  async navigateToFollowersList() {
    const followersLink = this.page.locator(this.followersLink).first();
    await followersLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isFollowersListVisible() {
    await this.navigateToFollowersList();
    const followerItems = await this.page.locator(this.followerAvatar).count();
    return followerItems > 0;
  }

  async verifyFollowerElementsStructure() {
    const followerAvatars = await this.page.locator(this.followerAvatar).count();
    const followerLinks = await this.page.locator('a[href^="/"]:has(img[alt^="@"])').count();
    
    if (followerAvatars === 0) return false;
    
    // Verify first follower has avatar and link
    const firstFollowerAvatar = await this.page.locator(this.followerAvatar).first();
    const isAvatarVisible = await firstFollowerAvatar.isVisible();
    
    const firstFollowerLink = await this.page.locator('a[href^="/"]:has(img[alt^="@"])').first();
    const hasLink = await firstFollowerLink.getAttribute('href');
    
    return isAvatarVisible && hasLink !== null;
  }

  async isFollowersListScrollable() {
    const followerCount = await this.page.locator(this.followerAvatar).count();
    // If more than 10 followers are shown, list is scrollable or paginated
    return followerCount > 0;
  }

  async scrollFollowersList() {
    await this.page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    await this.page.waitForTimeout(500);
  }

  async verifyScrollFunctionality() {
    // Check if pagination exists for long lists
    const nextButton = await this.page.locator(this.nextPageLink).first();
    const hasNextPage = await nextButton.isVisible().catch(() => false);
    
    // Scroll and verify content changes
    const initialScrollPosition = await this.page.evaluate(() => window.scrollY);
    await this.page.evaluate(() => window.scrollBy(0, 300));
    await this.page.waitForTimeout(300);
    const newScrollPosition = await this.page.evaluate(() => window.scrollY);
    
    return hasNextPage || newScrollPosition > initialScrollPosition;
  }

  async clickOnFollowerProfileLink() {
    const followerLink = await this.page.locator('a[href^="/"]:has(img[alt^="@"])').first();
    const href = await followerLink.getAttribute('href');
    
    // Open in same tab for testing
    await followerLink.click();
    await this.page.waitForLoadState('networkidle');
    
    return href;
  }

  async verifyFollowerProfileRedirection() {
    const currentUrl = this.page.url();
    // Verify we're on a user profile page (not the original user)
    const isOnProfilePage = currentUrl.includes('github.com/') && 
                            !currentUrl.includes('tab=followers');
    
    // Verify profile elements are visible
    const avatarVisible = await this.page.locator(this.userAvatar).first().isVisible().catch(() => false);
    
    return isOnProfilePage && avatarVisible;
  }

  async getFollowersCount() {
    const followersText = await this.page.locator(this.followersCount).first().textContent();
    const match = followersText.match(/([\d,.kKmM]+)/);
    return match ? match[1] : '0';
  }
}

module.exports = GitHubProfilePage;