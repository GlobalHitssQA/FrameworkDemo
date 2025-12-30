package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (basados en buenas prácticas de data-testid)
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Component Locators (inferidos)
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;

    // Profile Section Locators (inferidos)
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator webLink;
    private Locator followButton;

    // Metrics Dashboard Locators (inferidos)
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // API Limit Indicator (inferido)
    private Locator apiLimitIndicator;

    // Not Available Indicators (inferidos)
    private Locator bioNotAvailable;
    private Locator locationNotAvailable;
    private Locator companyNotAvailable;
    private Locator webLinkNotAvailable;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Component - Locators inferidos basados en data-testid semanticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");

        // Profile Section - Locators inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.fullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.biography = page.locator("[data-testid='user-bio']");
        this.location = page.locator("[data-testid='user-location']");
        this.company = page.locator("[data-testid='user-company']");
        this.webLink = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Dashboard - Locators inferidos
        this.reposCounter = page.locator("[data-testid='metric-repos']");
        this.followersCounter = page.locator("[data-testid='metric-followers']");
        this.followingCounter = page.locator("[data-testid='metric-following']");
        this.gistsCounter = page.locator("[data-testid='metric-gists']");

        // API Limit Indicator - Locator inferido
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");

        // Not Available Indicators - Locators inferidos
        this.bioNotAvailable = page.locator("[data-testid='user-bio-unavailable']");
        this.locationNotAvailable = page.locator("[data-testid='user-location-unavailable']");
        this.companyNotAvailable = page.locator("[data-testid='user-company-unavailable']");
        this.webLinkNotAvailable = page.locator("[data-testid='user-website-unavailable']");
    }

    // Navigation Methods
    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
    }

    // Search Actions
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Visibility Checks - Search Component
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    // Visibility Checks - Profile Section
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isBioVisible() {
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

    public boolean isFollowButtonEnabled() {
        return followButton.isEnabled();
    }

    // Visibility Checks - Metrics Dashboard
    public boolean isReposCounterVisible() {
        return reposCounter.isVisible();
    }

    public boolean isFollowersCounterVisible() {
        return followersCounter.isVisible();
    }

    public boolean isFollowingCounterVisible() {
        return followingCounter.isVisible();
    }

    public boolean isGistsCounterVisible() {
        return gistsCounter.isVisible();
    }

    // Visibility Checks - API Limit
    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    // Not Available Checks
    public boolean isBioNotAvailable() {
        return bioNotAvailable.isVisible();
    }

    public boolean isLocationNotAvailable() {
        return locationNotAvailable.isVisible();
    }

    public boolean isCompanyNotAvailable() {
        return companyNotAvailable.isVisible();
    }

    public boolean isWebLinkNotAvailable() {
        return webLinkNotAvailable.isVisible();
    }

    // Text Getters
    public String getFullNameText() {
        return fullName.textContent();
    }

    public String getUsernameText() {
        return username.textContent();
    }

    public String getBioText() {
        return biography.textContent();
    }

    public String getLocationText() {
        return location.textContent();
    }

    public String getCompanyText() {
        return company.textContent();
    }

    public String getWebLinkText() {
        return webLink.textContent();
    }

    public String getWebLinkHref() {
        return webLink.getAttribute("href");
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public String getApiLimitText() {
        return apiLimitIndicator.textContent();
    }

    // Avatar Methods
    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    // Metrics Getters
    public String getReposCount() {
        return reposCounter.textContent();
    }

    public String getFollowersCount() {
        return followersCounter.textContent();
    }

    public String getFollowingCount() {
        return followingCounter.textContent();
    }

    public String getGistsCount() {
        return gistsCounter.textContent();
    }

    // Follow Button Action
    public void clickFollowButton() {
        followButton.click();
    }
}