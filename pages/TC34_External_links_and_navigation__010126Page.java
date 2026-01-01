package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.LoadState;

/**
 * Page Object for GitHub User Profile Page
 * Locators source: REAL (extracted with Playwright MCP)
 */
public class GitHubProfilePage {

    private final Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - REAL (extracted from GitHub via Playwright)
    private final Locator userAvatar;
    private final Locator fullName;
    private final Locator username;
    private final Locator followButton;
    private final Locator followersLink;
    private final Locator followingLink;
    private final Locator organizationInfo;
    private final Locator locationInfo;
    private final Locator repositoriesTab;
    private final Locator overviewTab;
    private final Locator projectsTab;
    
    // Followers page locators - REAL
    private final Locator followerAvatars;
    private final Locator followerUsernames;
    private final Locator followerFollowButtons;
    private final Locator paginationNext;
    
    // Edit controls (should not be visible for non-authenticated users)
    private final Locator editProfileButton;
    private final Locator settingsLink;

    public GitHubProfilePage(Page page) {
        this.page = page;
        
        // Profile header locators - REAL selectors from GitHub
        this.userAvatar = page.locator("a[href*='avatars.githubusercontent.com'] img");
        this.fullName = page.locator("h1 span.p-name, h1 span[itemprop='name']").first();
        this.username = page.locator("h1 span.p-nickname, h1 span[itemprop='additionalName']").first();
        this.followButton = page.locator("a[href*='/login?return_to']:has-text('Follow')").first();
        this.followersLink = page.locator("a[href*='tab=followers']");
        this.followingLink = page.locator("a[href*='tab=following']");
        
        // User info locators - REAL
        this.organizationInfo = page.locator("li[itemprop='worksFor'] span, li:has(svg[class*='octicon-organization']) span");
        this.locationInfo = page.locator("li[itemprop='homeLocation'] span, li:has(svg[class*='octicon-location']) span");
        
        // Navigation tabs - REAL
        this.overviewTab = page.locator("nav[aria-label='User profile'] a:has-text('Overview')");
        this.repositoriesTab = page.locator("nav[aria-label='User profile'] a:has-text('Repositories')");
        this.projectsTab = page.locator("nav[aria-label='User profile'] a:has-text('Projects')");
        
        // Followers page locators - REAL
        this.followerAvatars = page.locator("a[href^='/']:has(img[alt^='@'])");
        this.followerUsernames = page.locator("a[data-hovercard-type='user']");
        this.followerFollowButtons = page.locator("a[href*='/login?return_to']:has-text('Follow')");
        this.paginationNext = page.locator("a:has-text('Next')");
        
        // Edit controls - should not be visible
        this.editProfileButton = page.locator("button:has-text('Edit profile'), a:has-text('Edit profile')");
        this.settingsLink = page.locator("a[href*='/settings']");
    }

    // Navigation methods
    public void navigateToProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void clickFollowersLink() {
        followersLink.first().click();
    }

    public void waitForFollowersPage() {
        page.waitForURL("**?tab=followers");
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void clickFirstFollowerAvatar() {
        followerAvatars.first().click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void clickFirstFollowerUsername() {
        followerUsernames.first().click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void clickFollowButton() {
        followButton.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void clickRepositoriesTab() {
        repositoriesTab.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void clickOverviewTab() {
        overviewTab.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void clickProjectsTab() {
        projectsTab.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void clickNextPagination() {
        if (paginationNext.isVisible()) {
            paginationNext.click();
            page.waitForLoadState(LoadState.NETWORKIDLE);
        }
    }

    public void goBack() {
        page.goBack();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    // Visibility check methods
    public boolean isUserAvatarVisible() {
        return userAvatar.first().isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible() || page.locator("h1").first().isVisible();
    }

    public boolean isFollowersLinkVisible() {
        return followersLink.first().isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public boolean isEditProfileButtonVisible() {
        return editProfileButton.isVisible();
    }

    public boolean isSettingsLinkVisible() {
        return settingsLink.isVisible();
    }

    public boolean isPaginationNextVisible() {
        return paginationNext.isVisible();
    }

    // Text retrieval methods
    public String getFullName() {
        return fullName.isVisible() ? fullName.textContent().trim() : "";
    }

    public String getUsername() {
        return username.isVisible() ? username.textContent().trim() : "";
    }

    public String getFollowersCount() {
        return followersLink.first().textContent().trim();
    }

    public String getFollowingCount() {
        return followingLink.textContent().trim();
    }

    public String getOrganization() {
        return organizationInfo.first().isVisible() ? organizationInfo.first().textContent().trim() : "";
    }

    public String getLocation() {
        return locationInfo.first().isVisible() ? locationInfo.first().textContent().trim() : "";
    }

    public String getCurrentUrl() {
        return page.url();
    }

    // Count methods
    public int getFollowerAvatarsCount() {
        return followerAvatars.count();
    }

    public int getFollowerUsernamesCount() {
        return followerUsernames.count();
    }
}