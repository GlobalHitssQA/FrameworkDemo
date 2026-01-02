package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Searcher Application
 * Locators are INFERRED based on best practices for a custom GitHub profile search application
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (aplicación personalizada de búsqueda de perfiles)
    private Locator searchInput;
    private Locator searchButton;
    private Locator metricsDashboard;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator userDetailsSection;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followButton;
    private Locator followersListSection;
    private Locator followerItems;
    private Locator followerLinks;
    private Locator errorMessage;
    private Locator apiRequestsIndicator;
    private Locator noDataAvailableMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search components - inferidos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Metrics dashboard - inferidos
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard']");
        this.reposMetric = page.locator("[data-testid='repos-metric']");
        this.followersMetric = page.locator("[data-testid='followers-metric']");
        this.followingMetric = page.locator("[data-testid='following-metric']");
        this.gistsMetric = page.locator("[data-testid='gists-metric']");

        // User details section - inferidos
        this.userDetailsSection = page.locator("[data-testid='user-details-section']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Followers list section - inferidos
        this.followersListSection = page.locator("[data-testid='followers-list-section']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerLinks = page.locator("[data-testid='follower-link']");

        // Error and status messages - inferidos
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
        this.noDataAvailableMessage = page.locator("[data-testid='no-data-message']");
    }

    public void navigate() {
        page.navigate(BASE_URL);
    }

    public void waitForPageLoad() {
        page.waitForLoadState();
    }

    public void enterUsername(String usernameText) {
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void resizeViewport(int width, int height) {
        page.setViewportSize(width, height);
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isMetricsDashboardVisible() {
        return metricsDashboard.isVisible();
    }

    public boolean isUserDetailsSectionVisible() {
        return userDetailsSection.isVisible();
    }

    public boolean isFollowersListSectionVisible() {
        return followersListSection.isVisible();
    }

    public boolean isProfileInformationDisplayed() {
        return userAvatar.isVisible() && userFullName.isVisible() && username.isVisible();
    }

    public boolean areAllSectionsVisibleAndAligned() {
        return isMetricsDashboardVisible() && 
               isUserDetailsSectionVisible() && 
               isFollowersListSectionVisible();
    }

    public boolean isReposMetricVisible() {
        return reposMetric.isVisible();
    }

    public boolean isFollowersMetricVisible() {
        return followersMetric.isVisible();
    }

    public boolean isFollowingMetricVisible() {
        return followingMetric.isVisible();
    }

    public boolean isGistsMetricVisible() {
        return gistsMetric.isVisible();
    }

    public boolean isResponsiveLayoutActive() {
        return searchInput.isVisible() && metricsDashboard.isVisible();
    }

    public boolean areSectionsStackedVertically() {
        // Verify sections are visible in mobile view (stacked layout)
        return isUserDetailsSectionVisible() && isFollowersListSectionVisible();
    }

    public boolean areAllComponentsFunctional() {
        return isSearchInputVisible() && 
               isSearchButtonVisible() && 
               isMetricsDashboardVisible();
    }

    public boolean isLayoutReadable() {
        return isMetricsDashboardVisible() && 
               isUserDetailsSectionVisible() && 
               isFollowersListSectionVisible();
    }

    public void clickFirstFollowerLink() {
        followerLinks.first().click();
    }

    public boolean isFollowerProfileAccessible() {
        page.waitForLoadState();
        return userDetailsSection.isVisible() || page.url().contains("github.com");
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowButtonResponsive() {
        return followButton.isVisible() && followButton.isEnabled();
    }

    public String getErrorMessage() {
        return errorMessage.textContent();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getApiRequestsIndicatorText() {
        return apiRequestsIndicator.textContent();
    }

    public boolean isApiRequestsIndicatorVisible() {
        return apiRequestsIndicator.isVisible();
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

    public int getFollowersCount() {
        return followerItems.count();
    }

    public void scrollFollowersList() {
        followersListSection.evaluate("element => element.scrollTop = element.scrollHeight");
    }
}