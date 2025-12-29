package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub Profile Search Component.
 * Locators are INFERRED based on best practices as the custom search application URL is not available.
 */
public class GitHubProfileSearchPage {

    private Page page;

    // Search elements - INFERRED locators
    private Locator searchInput;
    private Locator searchButton;

    // Profile elements - INFERRED locators
    private Locator profileContainer;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followButton;

    // Metric counters - INFERRED locators
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // API limit indicator - INFERRED locator
    private Locator apiRequestsIndicator;

    // Error message - INFERRED locator
    private Locator errorMessage;

    private static final String BASE_URL = "https://github.com";

    public GitHubProfileSearchPage(Page page) {
        this.page = page;

        // Search elements - using semantic data-testid attributes (INFERRED)
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Profile container (INFERRED)
        this.profileContainer = page.locator("[data-testid='profile-container']");

        // User info elements (INFERRED)
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metric counters (INFERRED)
        this.reposCounter = page.locator("[data-testid='repos-count']");
        this.followersCounter = page.locator("[data-testid='followers-count']");
        this.followingCounter = page.locator("[data-testid='following-count']");
        this.gistsCounter = page.locator("[data-testid='gists-count']");

        // API requests indicator (INFERRED)
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");

        // Error message (INFERRED)
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void enterUsername(String usernameText) {
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void searchUser(String usernameText) {
        enterUsername(usernameText);
        clickSearchButton();
        page.waitForSelector("[data-testid='profile-container']", 
            new Page.WaitForSelectorOptions().setTimeout(10000));
    }

    public boolean isProfileVisible() {
        return profileContainer.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserFullName() {
        return userFullName.textContent().trim();
    }

    public String getUsername() {
        return username.textContent().trim();
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

    public String getUserWebsite() {
        return userWebsite.textContent().trim();
    }

    public int getReposCount() {
        String text = reposCounter.textContent().trim();
        return parseMetricValue(text);
    }

    public int getFollowersCount() {
        String text = followersCounter.textContent().trim();
        return parseMetricValue(text);
    }

    public int getFollowingCount() {
        String text = followingCounter.textContent().trim();
        return parseMetricValue(text);
    }

    public int getGistsCount() {
        String text = gistsCounter.textContent().trim();
        return parseMetricValue(text);
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }

    public String getApiRequestsRemaining() {
        return apiRequestsIndicator.textContent().trim();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    /**
     * Parses metric values that may contain 'k' suffix (e.g., "21.3k" -> 21300)
     */
    private int parseMetricValue(String text) {
        text = text.toLowerCase().replaceAll("[^0-9.k]", "");
        if (text.contains("k")) {
            double value = Double.parseDouble(text.replace("k", ""));
            return (int) (value * 1000);
        }
        return Integer.parseInt(text);
    }
}