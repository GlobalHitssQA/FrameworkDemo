package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators are INFERRED based on best practices and semantic naming conventions
 * as the application is a custom GitHub profile search tool
 */
public class GitHubProfileSearchPage {

    private Page page;
    private String baseUrl = "https://github.com";

    // Locators - INFERRED (based on best practices for custom search application)
    private Locator searchInput;
    private Locator searchButton;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    private Locator followersList;
    private Locator apiRequestsIndicator;
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initLocators();
    }

    private void initLocators() {
        // Search elements - inferred locators
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Metrics counters - inferred locators
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // User profile elements - inferred locators
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userName = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Followers list - inferred locator
        this.followersList = page.locator("[data-testid='followers-list']");

        // API indicator - inferred locator
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");

        // Error message - inferred locator
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    public void navigateToSearchComponent() {
        page.navigate(baseUrl);
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForApiResponse() {
        page.waitForSelector("[data-testid='repos-counter']", 
            new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

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

    public String getReposCounterValue() {
        return reposCounter.textContent().trim();
    }

    public String getFollowersCounterValue() {
        return followersCounter.textContent().trim();
    }

    public String getFollowingCounterValue() {
        return followingCounter.textContent().trim();
    }

    public String getGistsCounterValue() {
        return gistsCounter.textContent().trim();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserFullName() {
        return userFullName.textContent().trim();
    }

    public String getUserName() {
        return userName.textContent().trim();
    }

    public String getUserBio() {
        return userBio.textContent().trim();
    }

    public String getUserLocation() {
        return userLocation.textContent().trim();
    }

    public String getUserCompany() {
        return userCompany.textContent().trim();
    }

    public String getUserWebLink() {
        return userWebLink.getAttribute("href");
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isApiRequestsIndicatorVisible() {
        return apiRequestsIndicator.isVisible();
    }

    public String getApiRequestsIndicatorText() {
        return apiRequestsIndicator.textContent().trim();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }
}