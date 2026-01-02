package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Searcher Component
 * Locators are INFERRED based on best practices for a custom component
 * The real GitHub website does not have these elements - this is for a custom app
 */
public class GitHubProfileSearchPage {

    private Page page;
    
    // INFERRED LOCATORS - Component-specific selectors
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator followersList;
    private Locator followerItems;
    private Locator apiRequestsIndicator;
    private Locator metricsDashboard;
    private Locator userDetailsSection;
    private Locator componentContainer;

    private static final String BASE_URL = "https://github.com";

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search elements - INFERRED
        this.searchInput = page.locator("[data-testid='username-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");

        // User profile elements - INFERRED
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userName = page.locator("[data-testid='username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics counters - INFERRED
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // Followers list - INFERRED
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");

        // API indicator - INFERRED
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");

        // Layout sections - INFERRED
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard']");
        this.userDetailsSection = page.locator("[data-testid='user-details-section']");
        this.componentContainer = page.locator("[data-testid='github-profile-searcher']");
    }

    public void navigateTo() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void searchForUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForLoadState();
    }

    public void resizeViewport(int width, int height) {
        page.setViewportSize(width, height);
    }

    // Visibility checks
    public boolean isSearchBarVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public boolean isComponentVisible() {
        return componentContainer.isVisible();
    }

    public boolean isMetricsDashboardVisible() {
        return metricsDashboard.isVisible();
    }

    public boolean isUserDetailsSectionVisible() {
        return userDetailsSection.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean areFollowerAvatarsVisible() {
        return followerItems.first().locator("img").isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    // Functional checks
    public boolean hasHorizontalScrollbar() {
        return (Boolean) page.evaluate("() => document.documentElement.scrollWidth > document.documentElement.clientWidth");
    }

    public boolean isMobileLayoutActive() {
        Integer viewportWidth = page.viewportSize().width;
        return viewportWidth != null && viewportWidth < 768;
    }

    public boolean isDesktopLayoutActive() {
        Integer viewportWidth = page.viewportSize().width;
        return viewportWidth != null && viewportWidth >= 1024;
    }

    public boolean isSearchInputFunctional() {
        return searchInput.isEnabled();
    }

    public boolean isSearchButtonClickable() {
        return searchButton.isEnabled();
    }

    public boolean isFollowButtonClickable() {
        return followButton.isEnabled();
    }

    public boolean areFollowerLinksClickable() {
        if (followerItems.count() > 0) {
            return followerItems.first().locator("a").isEnabled();
        }
        return false;
    }

    public boolean isFollowersListScrollable() {
        return (Boolean) page.evaluate("(selector) => { const el = document.querySelector(selector); return el ? el.scrollHeight > el.clientHeight : false; }", "[data-testid='followers-list']");
    }

    public void clickFirstFollower() {
        if (followerItems.count() > 0) {
            followerItems.first().click();
        }
    }

    // Getters for text content
    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUserName() {
        return userName.textContent();
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

    public String getApiRequestsIndicator() {
        return apiRequestsIndicator.textContent();
    }

    public String getErrorMessage() {
        return errorMessage.textContent();
    }

    public int getFollowersListCount() {
        return followerItems.count();
    }

    // Actions
    public void clickFollowButton() {
        followButton.click();
    }

    public void scrollFollowersList() {
        followersList.evaluate("el => el.scrollTop = el.scrollHeight");
    }

    public void clickUserWebLink() {
        userWebLink.click();
    }
}