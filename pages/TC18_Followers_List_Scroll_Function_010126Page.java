package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - basados en buenas prácticas y convenciones semánticas
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (basados en data-testid semánticos y selectores CSS estables)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator searchComponent;
    private final Locator profileDashboard;
    private final Locator userAvatar;
    private final Locator userName;
    private final Locator userFullName;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebsite;
    private final Locator followButton;
    private final Locator followersCount;
    private final Locator followingCount;
    private final Locator reposCount;
    private final Locator gistsCount;
    private final Locator followersListContainer;
    private final Locator followerItems;
    private final Locator followerAvatar;
    private final Locator followerLink;
    private final Locator errorMessage;
    private final Locator apiLimitIndicator;

    private int lastScrollPosition = 0;
    private int totalAccessedFollowers = 0;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;

        // Search Component Locators - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchComponent = page.locator("[data-testid='search-component']");

        // Profile Dashboard Locators - INFERIDOS
        this.profileDashboard = page.locator("[data-testid='profile-dashboard']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Dashboard Locators - INFERIDOS
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.followingCount = page.locator("[data-testid='following-count']");
        this.reposCount = page.locator("[data-testid='repos-count']");
        this.gistsCount = page.locator("[data-testid='gists-count']");

        // Followers List Locators - INFERIDOS
        this.followersListContainer = page.locator("[data-testid='followers-list-container']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatar = page.locator("[data-testid='follower-avatar']");
        this.followerLink = page.locator("[data-testid='follower-link']");

        // Error and Status Locators - INFERIDOS
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");
    }

    // Navigation Methods
    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search Methods
    public void enterUsername(String username) {
        searchInput.waitFor();
        searchInput.clear();
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public void searchForUser(String username) {
        enterUsername(username);
        clickSearchButton();
    }

    // Visibility Check Methods
    public boolean isSearchComponentVisible() {
        return searchComponent.isVisible();
    }

    public boolean isProfileDashboardVisible() {
        return profileDashboard.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersListContainer.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    // Scroll Methods
    public boolean isFollowersListScrollable() {
        return (boolean) followersListContainer.evaluate(
            "element => element.scrollHeight > element.clientHeight"
        );
    }

    public void scrollFollowersList() {
        lastScrollPosition = (int) followersListContainer.evaluate(
            "element => element.scrollTop"
        );
        followersListContainer.evaluate(
            "element => element.scrollBy({ top: 200, behavior: 'smooth' })"
        );
        page.waitForTimeout(500); // Wait for smooth scroll animation
    }

    public void scrollFollowersListToBottom() {
        followersListContainer.evaluate(
            "element => element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })"
        );
        page.waitForTimeout(1000); // Wait for scroll to complete
    }

    public boolean hasFollowersListScrolled() {
        int currentScrollPosition = (int) followersListContainer.evaluate(
            "element => element.scrollTop"
        );
        return currentScrollPosition > lastScrollPosition;
    }

    // Followers Count Methods
    public int getVisibleFollowersCount() {
        return followerItems.count();
    }

    public int getTotalAccessedFollowersCount() {
        // Count all unique followers accessed through scrolling
        totalAccessedFollowers = followerItems.count();
        return totalAccessedFollowers;
    }

    // Profile Information Getters
    public String getUserName() {
        return userName.textContent();
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public String getUserLocation() {
        return userLocation.textContent();
    }

    public String getUserCompany() {
        return userCompany.textContent();
    }

    public String getFollowersCountText() {
        return followersCount.textContent();
    }

    public String getFollowingCountText() {
        return followingCount.textContent();
    }

    public String getReposCountText() {
        return reposCount.textContent();
    }

    public String getGistsCountText() {
        return gistsCount.textContent();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Avatar Methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    // Follower Item Methods
    public Locator getFollowerItemByIndex(int index) {
        return followerItems.nth(index);
    }

    public String getFollowerLinkHref(int index) {
        return followerItems.nth(index).locator("[data-testid='follower-link']").getAttribute("href");
    }

    public void clickFollowerByIndex(int index) {
        followerItems.nth(index).locator("[data-testid='follower-link']").click();
    }

    // Follow Button Methods
    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    // Website Link Methods
    public void clickUserWebsite() {
        userWebsite.click();
    }

    public String getUserWebsiteHref() {
        return userWebsite.getAttribute("href");
    }
}