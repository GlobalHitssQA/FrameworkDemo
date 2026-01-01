package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Application
 * Locators: INFERIDOS (basados en buenas prácticas y metadata del proyecto)
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private final String baseUrl = "https://github.com";

    // Search Component Locators (inferidos)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator magnifyingGlassIcon;
    private final Locator searchComponent;

    // Profile Display Locators (inferidos)
    private final Locator userAvatar;
    private final Locator userName;
    private final Locator userFullName;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebLink;
    private final Locator followButton;

    // Metrics Dashboard Locators (inferidos)
    private final Locator reposCount;
    private final Locator followersCount;
    private final Locator followingCount;
    private final Locator gistsCount;

    // Error and Status Locators (inferidos)
    private final Locator errorMessage;
    private final Locator apiLimitIndicator;

    // Followers List Locators (inferidos)
    private final Locator followersList;
    private final Locator followerItem;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;

        // Search Component Locators - inferidos con data-testid semánticos
        this.searchComponent = page.locator("[data-testid='search-component']");
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.magnifyingGlassIcon = page.locator("[data-testid='search-button'] svg, [data-testid='search-icon'], .search-icon, [aria-label='Search']");

        // Profile Display Locators - inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar, img[alt*='avatar']");
        this.userName = page.locator("[data-testid='username'], .username, .user-login");
        this.userFullName = page.locator("[data-testid='user-fullname'], .fullname, .vcard-fullname");
        this.userBio = page.locator("[data-testid='user-bio'], .bio, .user-bio");
        this.userLocation = page.locator("[data-testid='user-location'], .location, [itemprop='homeLocation']");
        this.userCompany = page.locator("[data-testid='user-company'], .company, [itemprop='worksFor']");
        this.userWebLink = page.locator("[data-testid='user-website'], .website, [itemprop='url']");
        this.followButton = page.locator("[data-testid='follow-button'], .follow-button, button:has-text('Follow')");

        // Metrics Dashboard Locators - inferidos
        this.reposCount = page.locator("[data-testid='repos-count'], .repos-count, [data-metric='repos']");
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count, [data-metric='followers']");
        this.followingCount = page.locator("[data-testid='following-count'], .following-count, [data-metric='following']");
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count, [data-metric='gists']");

        // Error and Status Locators - inferidos
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, .alert-error");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator'], .api-limit, .rate-limit-warning");

        // Followers List Locators - inferidos
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, ul.followers");
        this.followerItem = page.locator("[data-testid='follower-item'], .follower-item, .followers-list li");
    }

    // Navigation Methods
    public void navigateToApplication() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    // Search Component Methods
    public boolean isSearchComponentVisible() {
        return searchComponent.isVisible();
    }

    public boolean isSearchButtonPresent() {
        return searchButton.count() > 0;
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isMagnifyingGlassIconVisible() {
        return magnifyingGlassIcon.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    // Profile Display Methods
    public boolean isProfileDisplayed() {
        return userAvatar.isVisible() || userName.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUsernameDisplayed() {
        return userName.isVisible();
    }

    public String getUsername() {
        return userName.textContent();
    }

    public String getFullName() {
        return userFullName.textContent();
    }

    public String getBio() {
        return userBio.textContent();
    }

    public String getLocation() {
        return userLocation.textContent();
    }

    public String getCompany() {
        return userCompany.textContent();
    }

    public String getWebsiteLink() {
        return userWebLink.getAttribute("href");
    }

    public void clickFollowButton() {
        followButton.click();
    }

    // Metrics Methods
    public String getReposCount() {
        return reposCount.textContent();
    }

    public String getFollowersCount() {
        return followersCount.textContent();
    }

    public String getFollowingCount() {
        return followingCount.textContent();
    }

    public String getGistsCount() {
        return gistsCount.textContent();
    }

    // Error Handling Methods
    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followerItem.count();
    }

    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }
}