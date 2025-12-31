package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (aplicación personalizada sin URL real disponible)
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS basados en mejores prácticas y elementos UI descritos
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator errorMessage;
    private final Locator userAvatar;
    private final Locator userName;
    private final Locator userUsername;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebsite;
    private final Locator followButton;
    private final Locator reposCounter;
    private final Locator followersCounter;
    private final Locator followingCounter;
    private final Locator gistsCounter;
    private final Locator followersList;
    private final Locator metricsContainer;
    private final Locator rateLimitIndicator;
    private final Locator searchComponent;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Search component elements - INFERIDOS
        this.searchComponent = page.locator("[data-testid='search-component']");
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Error state elements - INFERIDOS
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.rateLimitIndicator = page.locator("[data-testid='rate-limit-indicator']");
        
        // User profile elements - INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-fullname']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Metrics elements - INFERIDOS
        this.metricsContainer = page.locator("[data-testid='metrics-container']");
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
        
        // Followers list - INFERIDO
        this.followersList = page.locator("[data-testid='followers-list']");
    }

    // Navigation methods
    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
    }

    // Search interaction methods
    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForApiResponse() {
        page.waitForLoadState();
        // Wait for either error message or user data to appear
        page.waitForSelector("[data-testid='error-message'], [data-testid='user-avatar']", 
            new Page.WaitForSelectorOptions().setTimeout(10000));
    }

    // Visibility check methods
    public boolean isSearchComponentVisible() {
        return searchComponent.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean areMetricsVisible() {
        return metricsContainer.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isRateLimitIndicatorVisible() {
        return rateLimitIndicator.isVisible();
    }

    // Enabled state check methods
    public boolean isSearchInputEnabled() {
        return searchInput.isEnabled();
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    // Text retrieval methods
    public String getErrorMessageText() {
        return errorMessage.textContent();
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
}