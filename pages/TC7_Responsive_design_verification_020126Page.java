package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Page
 * Locators: REALES (extraídos con Playwright MCP)
 */
public class GitHubProfilePage {

    private final Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - REALES extraídos con Playwright
    private final Locator searchInput;
    private final Locator userAvatar;
    private final Locator userFullName;
    private final Locator username;
    private final Locator followButton;
    private final Locator followersLink;
    private final Locator followingLink;
    private final Locator repositoriesTab;
    private final Locator projectsTab;
    private final Locator userLocation;
    private final Locator userOrganization;
    private final Locator profileSection;
    private final Locator navigationMenu;
    private final Locator followersList;
    private final Locator followerItem;
    private final Locator pinnedRepositories;
    private final Locator homepageLink;

    public GitHubProfilePage(Page page) {
        this.page = page;
        
        // Search page locators - REALES
        this.searchInput = page.locator("input[aria-label='Search GitHub']");
        
        // Profile page locators - REALES extraídos de github.com/torvalds
        this.userAvatar = page.locator("img[alt*='View'][alt*='full-sized avatar']");
        this.userFullName = page.locator("h1 span[itemprop='name'], h1 > span:first-child").first();
        this.username = page.locator("h1 span[itemprop='additionalName'], h1 > span:nth-child(2)").first();
        this.followButton = page.locator("a:has-text('Follow')").first();
        this.followersLink = page.locator("a[href*='tab=followers']");
        this.followingLink = page.locator("a[href*='tab=following']");
        this.repositoriesTab = page.locator("nav[aria-label='User profile'] a[href*='tab=repositories']");
        this.projectsTab = page.locator("nav[aria-label='User profile'] a[href*='tab=projects']");
        this.userLocation = page.locator("li[itemprop='homeLocation'], li:has(svg[class*='octicon-location'])");
        this.userOrganization = page.locator("li[itemprop='worksFor'], li:has(svg[class*='octicon-organization'])");
        this.profileSection = page.locator("main");
        this.navigationMenu = page.locator("nav[aria-label='User profile']");
        this.followersList = page.locator("main > div:nth-child(2) > div:nth-child(2)");
        this.followerItem = page.locator("a[href*='@']:has(img[alt*='@'])");
        this.pinnedRepositories = page.locator("h2:has-text('Pinned') + ol, div:has(h2:has-text('Pinned')) ol");
        this.homepageLink = page.locator("a[href='/']:has(img), a[aria-label*='Homepage']").first();
    }

    public void navigate() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void navigateToUserProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }

    public void navigateToSearch() {
        page.navigate(BASE_URL + "/search");
        page.waitForLoadState();
    }

    public void searchUser(String username) {
        searchInput.fill(username);
        searchInput.press("Enter");
        page.waitForLoadState();
    }

    public boolean isPageLoaded() {
        return page.url().contains("github.com");
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUserFullNameVisible() {
        return userFullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public boolean isFollowersCountVisible() {
        return followersLink.isVisible();
    }

    public boolean isFollowingCountVisible() {
        return followingLink.isVisible();
    }

    public boolean isRepositoriesTabVisible() {
        return repositoriesTab.isVisible();
    }

    public boolean isProfileSectionVisible() {
        return profileSection.isVisible();
    }

    public boolean isNavigationAccessible() {
        return navigationMenu.isVisible() || page.locator("button:has-text('More')").isVisible();
    }

    public boolean hasHorizontalScroll() {
        return (Boolean) page.evaluate("() => document.documentElement.scrollWidth > document.documentElement.clientWidth");
    }

    public void setViewportSize(int width, int height) {
        page.setViewportSize(width, height);
        page.waitForTimeout(500);
    }

    public void clickFollowersLink() {
        followersLink.click();
        page.waitForLoadState();
    }

    public void scrollFollowersList() {
        page.evaluate("() => window.scrollBy(0, 500)");
        page.waitForTimeout(300);
    }

    public void navigateBack() {
        page.goBack();
        page.waitForLoadState();
    }

    public boolean isFollowersLinkClickable() {
        return followersLink.isEnabled();
    }

    public boolean isRepositoriesTabClickable() {
        return repositoriesTab.isEnabled();
    }

    public boolean areProfileLinksWorking() {
        return followersLink.isVisible() && followingLink.isVisible();
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUsername() {
        return username.textContent();
    }

    public String getFollowersCount() {
        return followersLink.textContent();
    }

    public String getFollowingCount() {
        return followingLink.textContent();
    }

    public String getUserLocation() {
        if (userLocation.isVisible()) {
            return userLocation.textContent();
        }
        return "";
    }

    public String getUserOrganization() {
        if (userOrganization.isVisible()) {
            return userOrganization.textContent();
        }
        return "";
    }

    public boolean isPinnedRepositoriesVisible() {
        return pinnedRepositories.isVisible();
    }

    public int getFollowerItemsCount() {
        return followerItem.count();
    }

    public void clickRepositoriesTab() {
        repositoriesTab.click();
        page.waitForLoadState();
    }

    public void clickProjectsTab() {
        projectsTab.click();
        page.waitForLoadState();
    }

    public void clickHomepage() {
        homepageLink.click();
        page.waitForLoadState();
    }
}