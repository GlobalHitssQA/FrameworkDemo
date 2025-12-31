package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * LOCATORS: INFERIDOS - Esta es una aplicación personalizada de búsqueda de perfiles GitHub,
 * no la página nativa de GitHub. Los locators están basados en buenas prácticas y 
 * convenciones semánticas de data-testid.
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Component Locators (INFERIDOS)
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchButtonIcon;

    // Metrics Dashboard Locators (INFERIDOS)
    private Locator metricsDashboard;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // User Profile Information Locators (INFERIDOS)
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator webLink;
    private Locator followButton;

    // Followers List Locators (INFERIDOS)
    private Locator followersListContainer;
    private Locator followerItems;
    private Locator followerAvatars;
    private Locator followerUsernames;
    private Locator followerProfileLinks;

    // API Counter Locator (INFERIDO)
    private Locator apiRequestCounter;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Component - Locators INFERIDOS basados en buenas prácticas
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchButtonIcon = page.locator("[data-testid='search-button'] svg, [data-testid='search-button-icon']");

        // Metrics Dashboard - Locators INFERIDOS
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard']");
        this.reposCounter = page.locator("[data-testid='repos-counter'], [data-testid='repos-count']");
        this.followersCounter = page.locator("[data-testid='followers-counter'], [data-testid='followers-count']");
        this.followingCounter = page.locator("[data-testid='following-counter'], [data-testid='following-count']");
        this.gistsCounter = page.locator("[data-testid='gists-counter'], [data-testid='gists-count']");

        // User Profile Information - Locators INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar img");
        this.fullName = page.locator("[data-testid='user-fullname'], [data-testid='full-name']");
        this.username = page.locator("[data-testid='user-username'], [data-testid='username']");
        this.biography = page.locator("[data-testid='user-biography'], [data-testid='bio']");
        this.location = page.locator("[data-testid='user-location'], [data-testid='location']");
        this.company = page.locator("[data-testid='user-company'], [data-testid='company']");
        this.webLink = page.locator("[data-testid='user-website'], [data-testid='web-link']");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow')");

        // Followers List - Locators INFERIDOS
        this.followersListContainer = page.locator("[data-testid='followers-list'], .followers-list");
        this.followerItems = page.locator("[data-testid='follower-item'], .follower-item");
        this.followerAvatars = page.locator("[data-testid='follower-avatar'], .follower-item img");
        this.followerUsernames = page.locator("[data-testid='follower-username'], .follower-item .username");
        this.followerProfileLinks = page.locator("[data-testid='follower-link'], .follower-item a");

        // API Counter - Locator INFERIDO
        this.apiRequestCounter = page.locator("[data-testid='api-counter'], [data-testid='api-request-counter'], .api-limit-indicator");
    }

    // Navigation Methods
    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search Component Methods
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isSearchButtonIconVisible() {
        return searchButtonIcon.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        page.waitForSelector("[data-testid='user-avatar'], .user-avatar", 
            new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    // Metrics Dashboard Methods
    public boolean isMetricsDashboardVisible() {
        return metricsDashboard.isVisible();
    }

    public boolean isReposCountVisible() {
        return reposCounter.isVisible();
    }

    public boolean isFollowersCountVisible() {
        return followersCounter.isVisible();
    }

    public boolean isFollowingCountVisible() {
        return followingCounter.isVisible();
    }

    public boolean isGistsCountVisible() {
        return gistsCounter.isVisible();
    }

    public String getReposCount() {
        return reposCounter.textContent().trim();
    }

    public String getFollowersCount() {
        return followersCounter.textContent().trim();
    }

    public String getFollowingCount() {
        return followingCounter.textContent().trim();
    }

    public String getGistsCount() {
        return gistsCounter.textContent().trim();
    }

    // User Profile Information Methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isBiographyVisible() {
        return biography.isVisible();
    }

    public boolean isLocationVisible() {
        return location.isVisible();
    }

    public boolean isCompanyVisible() {
        return company.isVisible();
    }

    public boolean isWebLinkVisible() {
        return webLink.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public String getFullName() {
        return fullName.textContent().trim();
    }

    public String getUsername() {
        return username.textContent().trim();
    }

    public String getBiography() {
        return biography.textContent().trim();
    }

    public String getLocation() {
        return location.textContent().trim();
    }

    public String getCompany() {
        return company.textContent().trim();
    }

    public String getWebLink() {
        return webLink.getAttribute("href");
    }

    public boolean isAvatarImageLoaded() {
        return (Boolean) userAvatar.evaluate("img => img.complete && img.naturalHeight !== 0");
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersListContainer.isVisible();
    }

    public boolean isFollowersListScrollable() {
        String overflow = (String) followersListContainer.evaluate(
            "el => window.getComputedStyle(el).overflow || window.getComputedStyle(el).overflowY");
        return overflow.contains("scroll") || overflow.contains("auto");
    }

    public int getFollowersListCount() {
        return followerItems.count();
    }

    public boolean areFollowerAvatarsVisible() {
        return followerAvatars.count() > 0 && followerAvatars.first().isVisible();
    }

    public boolean areFollowerUsernamesVisible() {
        return followerUsernames.count() > 0 && followerUsernames.first().isVisible();
    }

    public boolean areFollowerProfileLinksVisible() {
        return followerProfileLinks.count() > 0 && followerProfileLinks.first().isVisible();
    }

    public String getFirstFollowerProfileLink() {
        return followerProfileLinks.first().getAttribute("href");
    }

    public void clickFirstFollowerLink() {
        followerProfileLinks.first().click();
        page.waitForLoadState();
    }

    // API Counter Methods
    public boolean isApiRequestCounterVisible() {
        return apiRequestCounter.isVisible();
    }

    public String getApiRequestCounterText() {
        return apiRequestCounter.textContent().trim();
    }

    // Profile Page Verification
    public boolean isProfilePageLoaded() {
        return page.url().contains("github.com") && userAvatar.isVisible();
    }
}