package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - basados en buenas prácticas para una aplicación de búsqueda de perfiles GitHub
 */
public class GitHubProfileSearchPage {

    private Page page;
    private String baseUrl;

    // Locators - INFERIDOS (no extraídos de página real)
    // Search Section
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;

    // Profile Section
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator websiteLink;
    private Locator followButton;

    // Metrics Dashboard
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator metricsDashboard;

    // Followers List
    private Locator followersList;
    private Locator followersListItems;

    // API Indicator
    private Locator apiRequestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.baseUrl = System.getProperty("app.base.url", "http://localhost:3000");
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Section - Locators inferidos con data-testid semánticos
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
        this.websiteLink = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Dashboard - Locators inferidos para contadores
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard']");

        // Followers List - Locators inferidos
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followersListItems = page.locator("[data-testid='follower-item']");

        // API Indicator - Locator inferido
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
    }

    // Navigation
    public void navigate() {
        page.navigate(baseUrl);
    }

    public void navigateToUrl(String url) {
        page.navigate(url);
    }

    // Search Actions
    public void enterUsername(String usernameText) {
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void searchUser(String usernameText) {
        enterUsername(usernameText);
        clickSearchButton();
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    // Wait Methods
    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public void waitForErrorMessage() {
        errorMessage.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
    }

    // Visibility Checks
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public boolean isReposMetricVisible() {
        return reposCounter.isVisible();
    }

    public boolean isFollowersMetricVisible() {
        return followersCounter.isVisible();
    }

    public boolean isFollowingMetricVisible() {
        return followingCounter.isVisible();
    }

    public boolean isGistsMetricVisible() {
        return gistsCounter.isVisible();
    }

    public boolean isMetricsDashboardFormatted() {
        return metricsDashboard.isVisible();
    }

    // Get Text Methods
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

    public String getWebsiteUrl() {
        return websiteLink.getAttribute("href");
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }

    // Get Metrics Values
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

    // Helper method to parse metric values (handles formats like "1.2k", "500", etc.)
    private int parseMetricValue(String text) {
        text = text.toLowerCase().replaceAll("[^0-9.kmb]", "");
        if (text.isEmpty()) {
            return 0;
        }
        double multiplier = 1;
        if (text.endsWith("k")) {
            multiplier = 1000;
            text = text.substring(0, text.length() - 1);
        } else if (text.endsWith("m")) {
            multiplier = 1000000;
            text = text.substring(0, text.length() - 1);
        } else if (text.endsWith("b")) {
            multiplier = 1000000000;
            text = text.substring(0, text.length() - 1);
        }
        try {
            return (int) (Double.parseDouble(text) * multiplier);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    // Followers List Methods
    public int getFollowersListCount() {
        return followersListItems.count();
    }

    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    // API Requests Indicator
    public boolean isApiRequestsIndicatorVisible() {
        return apiRequestsIndicator.isVisible();
    }

    public String getApiRequestsIndicatorText() {
        return apiRequestsIndicator.textContent().trim();
    }

    // Follow Button
    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public String getFollowButtonText() {
        return followButton.textContent().trim();
    }
}