package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (basados en buenas prácticas y metadata del proyecto)
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Component Locators - INFERIDOS
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;

    // Profile Data Locators - INFERIDOS
    private Locator userAvatar;
    private Locator userName;
    private Locator userUsername;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;

    // Metrics Dashboard Locators - INFERIDOS
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // Followers List Locators - INFERIDOS
    private Locator followersList;
    private Locator followersListItems;

    // API Indicator Locator - INFERIDO
    private Locator requestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Component - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");

        // Profile Data - INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Dashboard - INFERIDOS
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // Followers List - INFERIDOS
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followersListItems = page.locator("[data-testid='follower-item']");

        // API Indicator - INFERIDO
        this.requestsIndicator = page.locator("[data-testid='requests-indicator']");
    }

    // Navigation Methods
    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search Component Methods
    public boolean isSearchComponentDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    public boolean isSearchInputEnabled() {
        return searchInput.isEnabled();
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    // Error Message Methods
    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Profile Data Visibility Methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUserNameVisible() {
        return userName.isVisible();
    }

    public boolean isUserBioVisible() {
        return userBio.isVisible();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserUsername() {
        return userUsername.textContent();
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

    public String getUserWebLink() {
        return userWebLink.getAttribute("href");
    }

    // Metrics Dashboard Visibility Methods
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

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followersListItems.count();
    }

    // Follow Button Methods
    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    // API Requests Indicator Methods
    public boolean isRequestsIndicatorVisible() {
        return requestsIndicator.isVisible();
    }

    public String getRequestsIndicatorText() {
        return requestsIndicator.textContent();
    }
}