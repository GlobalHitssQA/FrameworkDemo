package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Finder Component
 * Locators: INFERIDOS - basados en buenas prácticas de testing y el diseño descrito
 */
public class GitHubProfileFinderPage {

    private Page page;

    // Locators - INFERIDOS (basados en data-testid semánticos y selectores CSS estables)
    private Locator searchInput;
    private Locator searchButton;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator metricsDashboard;
    private Locator userDetailsSection;
    private Locator followersList;
    private Locator followerItem;
    private Locator followerAvatar;
    private Locator followerLink;
    private Locator errorMessage;
    private Locator rateLimitIndicator;

    public GitHubProfileFinderPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search elements - inferidos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // User profile elements - inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics dashboard elements - inferidos
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard']");
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // Layout sections - inferidos
        this.userDetailsSection = page.locator("[data-testid='user-details-section']");
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItem = page.locator("[data-testid='follower-item']");
        this.followerAvatar = page.locator("[data-testid='follower-avatar']");
        this.followerLink = page.locator("[data-testid='follower-link']");

        // Error and status elements - inferidos
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.rateLimitIndicator = page.locator("[data-testid='rate-limit-indicator']");
    }

    public void navigate(String url) {
        page.navigate(url);
        page.waitForLoadState();
    }

    public boolean isPageLoaded() {
        return searchInput.isVisible();
    }

    public void searchForUser(String usernameText) {
        searchInput.clear();
        searchInput.fill(usernameText);
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUserNameVisible() {
        return userFullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isUserBioVisible() {
        return userBio.isVisible();
    }

    public boolean isUserLocationVisible() {
        return userLocation.isVisible();
    }

    public boolean isUserCompanyVisible() {
        return userCompany.isVisible();
    }

    public boolean isUserWebLinkVisible() {
        return userWebLink.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public boolean isMetricsDashboardVisible() {
        return metricsDashboard.isVisible();
    }

    public boolean areMetricsCountersVisible() {
        return reposCounter.isVisible() &&
               followersCounter.isVisible() &&
               followingCounter.isVisible() &&
               gistsCounter.isVisible();
    }

    public boolean isUserDetailsSectionVisible() {
        return userDetailsSection.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean areAllMainElementsVisible() {
        return isSearchInputVisible() &&
               isSearchButtonVisible() &&
               isUserAvatarVisible() &&
               isUserNameVisible() &&
               isMetricsDashboardVisible() &&
               isFollowersListVisible();
    }

    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    public boolean isFollowersListScrollable() {
        Object scrollHeight = followersList.evaluate("element => element.scrollHeight");
        Object clientHeight = followersList.evaluate("element => element.clientHeight");
        return ((Number) scrollHeight).doubleValue() > ((Number) clientHeight).doubleValue();
    }

    public boolean isSearchButtonClickable() {
        return searchButton.isEnabled();
    }

    public boolean isSearchInputEnabled() {
        return searchInput.isEnabled();
    }

    public boolean areFollowerLinksVisible() {
        return followerLink.first().isVisible();
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

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessage() {
        return errorMessage.textContent();
    }

    public boolean isRateLimitIndicatorVisible() {
        return rateLimitIndicator.isVisible();
    }

    public int getFollowersListItemCount() {
        return followerItem.count();
    }

    public void clickFollowerLink(int index) {
        followerLink.nth(index).click();
    }

    public void clickFollowButton() {
        followButton.click();
    }
}