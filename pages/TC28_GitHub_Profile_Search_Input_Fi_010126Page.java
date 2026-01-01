package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub Profile Search Application
 * Locators: INFERIDOS (basados en buenas prácticas y convenciones semánticas)
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (data-testid semánticos y selectores CSS estables)
    private Locator searchContainer;
    private Locator usernameInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followButton;
    private Locator reposCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;
    private Locator followersList;
    private Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search component locators - INFERIDOS
        this.searchContainer = page.locator("[data-testid='search-container']");
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");

        // User profile locators - INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics dashboard locators - INFERIDOS
        this.reposCount = page.locator("[data-testid='repos-count']");
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.followingCount = page.locator("[data-testid='following-count']");
        this.gistsCount = page.locator("[data-testid='gists-count']");

        // Followers list and API indicator - INFERIDOS
        this.followersList = page.locator("[data-testid='followers-list']");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");
    }

    // Navigation methods
    public void navigateToApplication() {
        page.navigate(BASE_URL);
    }

    // Search component interaction methods
    public boolean isSearchComponentVisible() {
        return searchContainer.isVisible();
    }

    public boolean isUsernameInputVisible() {
        return usernameInput.isVisible();
    }

    public boolean isUsernameInputEnabled() {
        return usernameInput.isEnabled();
    }

    public boolean isUsernameInputFocused() {
        return usernameInput.evaluate("el => el === document.activeElement").equals(true);
    }

    public void clickUsernameInput() {
        usernameInput.click();
    }

    public void fillUsernameInput(String username) {
        usernameInput.fill(username);
    }

    public String getUsernameInputValue() {
        return usernameInput.inputValue();
    }

    public void clearUsernameInput() {
        usernameInput.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    // Error message methods
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // User profile methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUsername() {
        return username.textContent();
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

    public String getUserWebsite() {
        return userWebsite.textContent();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    // Metrics methods
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

    // Followers list methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public void scrollFollowersList() {
        followersList.evaluate("el => el.scrollTop = el.scrollHeight");
    }

    // API limit indicator methods
    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public String getApiLimitText() {
        return apiLimitIndicator.textContent();
    }
}