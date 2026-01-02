package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfilePage {
    private Page page;
    
    // Locators - REALES (extraídos con Playwright MCP)
    private Locator searchInput;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userName;
    private Locator followersLink;
    private Locator followingLink;
    private Locator userBio;
    private Locator userLocation;
    private Locator userOrganization;
    private Locator followButton;
    private Locator repositoriesTab;
    private Locator overviewTab;

    public GitHubProfilePage(Page page) {
        this.page = page;
        // Real locators extracted from GitHub.com using Playwright
        this.searchInput = page.locator("input[name='q'], input[placeholder*='Search']");
        this.userAvatar = page.locator("a[href*='avatars.githubusercontent.com'] img, img[alt*='avatar']");
        this.userFullName = page.locator("h1 span[itemprop='name'], h1 > span:first-child");
        this.userName = page.locator("h1 span[itemprop='additionalName'], h1 > span:last-child");
        this.followersLink = page.locator("a[href*='tab=followers']");
        this.followingLink = page.locator("a[href*='tab=following']");
        this.userBio = page.locator("div[data-bio-text], .user-profile-bio");
        this.userLocation = page.locator("li[itemprop='homeLocation'] span, span:has-text('Portland')");
        this.userOrganization = page.locator("li[itemprop='worksFor'] span, span:has-text('Linux Foundation')");
        this.followButton = page.locator("a:has-text('Follow'), button:has-text('Follow')").first();
        this.repositoriesTab = page.locator("a[href*='tab=repositories']");
        this.overviewTab = page.locator("nav[aria-label='User profile'] a:has-text('Overview')");
    }

    public void navigateTo(String url) {
        page.navigate(url);
        page.waitForLoadState();
    }

    public void navigateToUserProfile(String username) {
        page.navigate("https://github.com/" + username);
        page.waitForLoadState();
    }

    public boolean isSearchComponentDisplayed() {
        return page.url().contains("github.com");
    }

    public boolean isUserProfileDisplayed() {
        return page.locator("h1").first().isVisible();
    }

    public boolean isAvatarVisible() {
        return page.locator("img[alt*='avatar'], a[href*='avatars'] img").first().isVisible();
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUsername() {
        return userName.textContent();
    }

    public void clickFollowersLink() {
        followersLink.first().click();
        page.waitForLoadState();
    }

    public void clickFollowingLink() {
        followingLink.click();
        page.waitForLoadState();
    }

    public String getFollowersCount() {
        return followersLink.first().textContent();
    }

    public String getFollowingCount() {
        return followingLink.textContent();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickRepositoriesTab() {
        repositoriesTab.click();
        page.waitForLoadState();
    }

    public boolean isLocationVisible() {
        return userLocation.isVisible();
    }

    public boolean isOrganizationVisible() {
        return userOrganization.isVisible();
    }
}

// ============================================
// GitHubFollowersPage.java
// ============================================

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class GitHubFollowersPage {
    private Page page;
    
    // Locators - REALES (extraídos con Playwright MCP de https://github.com/torvalds?tab=followers)
    private Locator followersListContainer;
    private Locator followerItems;
    private Locator followerAvatars;
    private Locator followerUsernames;
    private Locator followerProfileLinks;
    private Locator paginationNext;
    private Locator paginationPrevious;

    public GitHubFollowersPage(Page page) {
        this.page = page;
        // Real locators extracted from GitHub followers page
        // Each follower item is a generic div containing avatar link, username link, and follow button
        this.followersListContainer = page.locator("main div[class*='d-flex']:has(img[alt*='@'])").first();
        this.followerItems = page.locator("div:has(> a[href^='/']:has(img[alt*='@']))");
        this.followerAvatars = page.locator("a[href^='/'] img[alt*='@']");
        this.followerUsernames = page.locator("a[href^='/']:has-text(' '):not(:has(img))");
        this.followerProfileLinks = page.locator("a[href^='/']:has(img[alt*='@'])");
        this.paginationNext = page.locator("a:has-text('Next')");
        this.paginationPrevious = page.locator("div:has-text('Previous')");
    }

    public boolean isFollowersListVisible() {
        return page.url().contains("tab=followers") && 
               followerAvatars.first().isVisible();
    }

    public int getVisibleFollowersCount() {
        return followerAvatars.count();
    }

    public boolean doesFirstFollowerHaveAvatar() {
        return followerAvatars.first().isVisible();
    }

    public boolean doesFirstFollowerHaveUsername() {
        Locator firstFollowerLink = page.locator("a[href^='/']:has(img[alt*='@'])").first();
        return firstFollowerLink.isVisible();
    }

    public boolean doesFirstFollowerHaveProfileLink() {
        return followerProfileLinks.first().isVisible();
    }

    public boolean isPageScrollable() {
        Double scrollHeight = (Double) page.evaluate("() => document.documentElement.scrollHeight");
        Double clientHeight = (Double) page.evaluate("() => document.documentElement.clientHeight");
        return scrollHeight > clientHeight;
    }

    public void scrollToBottomOfFollowersList() {
        page.evaluate("() => window.scrollTo(0, document.documentElement.scrollHeight)");
        page.waitForTimeout(500);
    }

    public void scrollToTop() {
        page.evaluate("() => window.scrollTo(0, 0)");
        page.waitForTimeout(300);
    }

    public boolean hasScrolledDown() {
        Double scrollY = (Double) page.evaluate("() => window.scrollY");
        return scrollY > 0 || isPaginationVisible();
    }

    public boolean isLastFollowerVisible() {
        Locator lastFollower = followerAvatars.last();
        return lastFollower.isVisible();
    }

    public String getFirstFollowerUsername() {
        Locator firstLink = page.locator("a[href^='/']:has(img[alt*='@'])").first();
        String href = firstLink.getAttribute("href");
        return href != null ? href.replace("/", "") : "";
    }

    public void clickFirstFollowerProfileLink() {
        followerProfileLinks.first().click();
        page.waitForLoadState();
    }

    public boolean isPaginationVisible() {
        return paginationNext.isVisible() || paginationPrevious.isVisible();
    }

    public void clickNextPage() {
        if (paginationNext.isVisible()) {
            paginationNext.click();
            page.waitForLoadState();
        }
    }

    public Locator getFollowerByIndex(int index) {
        return followerProfileLinks.nth(index);
    }

    public void clickFollowerByUsername(String username) {
        page.locator("a[href='/" + username + "']").first().click();
        page.waitForLoadState();
    }
}