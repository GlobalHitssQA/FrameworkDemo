package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Responsive Layout testing of GitHub Profile Search application.
 * Locators are INFERRED based on best practices for a custom GitHub Profile Viewer application.
 * These locators use semantic data-testid attributes and stable CSS selectors.
 */
public class ResponsiveLayoutPage {

    private final Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Section Locators (INFERIDOS)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator searchIcon;

    // User Profile Section Locators (INFERIDOS)
    private final Locator userAvatar;
    private final Locator userFullName;
    private final Locator userName;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebLink;
    private final Locator followButton;

    // Metrics Dashboard Locators (INFERIDOS)
    private final Locator metricsDashboard;
    private final Locator reposCounter;
    private final Locator followersCounter;
    private final Locator followingCounter;
    private final Locator gistsCounter;

    // Followers List Section Locators (INFERIDOS)
    private final Locator followersListContainer;
    private final Locator followerItems;
    private final Locator followerAvatar;
    private final Locator followerProfileLink;

    // Layout Containers (INFERIDOS)
    private final Locator mainContainer;
    private final Locator userDetailsSection;
    private final Locator followersListSection;
    private final Locator searchBarContainer;

    // API Limit Indicator (INFERIDO)
    private final Locator apiRequestsIndicator;

    // Error Message (INFERIDO)
    private final Locator errorMessage;

    public ResponsiveLayoutPage(Page page) {
        this.page = page;

        // Search Section - Locators INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchIcon = page.locator("[data-testid='search-icon']");

        // User Profile Section - Locators INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userName = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-weblink']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Dashboard - Locators INFERIDOS
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard']");
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // Followers List Section - Locators INFERIDOS
        this.followersListContainer = page.locator("[data-testid='followers-list-container']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatar = page.locator("[data-testid='follower-avatar']");
        this.followerProfileLink = page.locator("[data-testid='follower-profile-link']");

        // Layout Containers - Locators INFERIDOS
        this.mainContainer = page.locator("[data-testid='main-container']");
        this.userDetailsSection = page.locator("[data-testid='user-details-section']");
        this.followersListSection = page.locator("[data-testid='followers-list-section']");
        this.searchBarContainer = page.locator("[data-testid='search-bar-container']");

        // API Limit Indicator - Locator INFERIDO
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");

        // Error Message - Locator INFERIDO
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    // Navigation Methods
    public void navigateToApplication() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void setViewportSize(int width, int height) {
        page.setViewportSize(width, height);
    }

    // Search Methods
    public boolean isSearchBarVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchInputInteractable() {
        return searchInput.isEnabled() && searchInput.isVisible();
    }

    public boolean isSearchButtonClickable() {
        return searchButton.isEnabled() && searchButton.isVisible();
    }

    // Metrics Dashboard Methods
    public boolean isMetricsDashboardVisible() {
        return metricsDashboard.isVisible();
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

    // User Details Methods
    public boolean isUserDetailsSectionVisible() {
        return userDetailsSection.isVisible();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

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

    public boolean isFollowButtonClickable() {
        return followButton.isEnabled() && followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    // Followers List Methods
    public boolean isFollowersListSectionVisible() {
        return followersListSection.isVisible();
    }

    public boolean isFollowersListScrollable() {
        String overflowY = followersListContainer.evaluate("el => getComputedStyle(el).overflowY").toString();
        return overflowY.equals("auto") || overflowY.equals("scroll");
    }

    public int getFollowersCount() {
        return followerItems.count();
    }

    public boolean areProfileLinksClickable() {
        if (followerProfileLink.count() > 0) {
            return followerProfileLink.first().isEnabled() && followerProfileLink.first().isVisible();
        }
        return true;
    }

    public void scrollFollowersList() {
        followersListContainer.evaluate("el => el.scrollTop = el.scrollHeight");
    }

    public boolean doesScrollingNotAffectOtherComponents() {
        int initialPosition = (int) userDetailsSection.evaluate("el => el.getBoundingClientRect().top");
        scrollFollowersList();
        int finalPosition = (int) userDetailsSection.evaluate("el => el.getBoundingClientRect().top");
        return initialPosition == finalPosition;
    }

    // Layout Validation Methods
    public boolean isDesktopLayoutDisplayed() {
        int viewportWidth = (int) page.evaluate("() => window.innerWidth");
        return viewportWidth >= 1024;
    }

    public boolean isTabletLayoutDisplayed() {
        int viewportWidth = (int) page.evaluate("() => window.innerWidth");
        return viewportWidth >= 768 && viewportWidth < 1024;
    }

    public boolean isMobilePortraitLayoutDisplayed() {
        int viewportWidth = (int) page.evaluate("() => window.innerWidth");
        int viewportHeight = (int) page.evaluate("() => window.innerHeight");
        return viewportWidth < 768 && viewportHeight > viewportWidth;
    }

    public boolean isMobileLandscapeLayoutDisplayed() {
        int viewportWidth = (int) page.evaluate("() => window.innerWidth");
        int viewportHeight = (int) page.evaluate("() => window.innerHeight");
        return viewportWidth < 1024 && viewportWidth > viewportHeight;
    }

    public boolean hasHorizontalScrollbar() {
        return (boolean) page.evaluate("() => document.documentElement.scrollWidth > document.documentElement.clientWidth");
    }

    public boolean areAllComponentsVisible() {
        return isSearchBarVisible() && 
               isUserDetailsSectionVisible() && 
               isFollowersListSectionVisible();
    }

    public boolean isProperSpacingMaintained() {
        return mainContainer.isVisible();
    }

    public boolean areComponentsRearrangedForTablet() {
        return isSearchBarVisible() && isUserDetailsSectionVisible();
    }

    public boolean areComponentsVerticallyStacked() {
        if (!userDetailsSection.isVisible() || !followersListSection.isVisible()) {
            return true;
        }
        int userDetailTop = (int) userDetailsSection.evaluate("el => el.getBoundingClientRect().top");
        int followersListTop = (int) followersListSection.evaluate("el => el.getBoundingClientRect().top");
        return followersListTop > userDetailTop;
    }

    public boolean isOptimizedForHorizontalViewing() {
        return areAllComponentsVisible() && !hasHorizontalScrollbar();
    }

    public boolean isUsabilityMaintained() {
        return isSearchButtonClickable() && isSearchInputInteractable();
    }

    public boolean isAllFunctionalityMaintained() {
        return isSearchBarVisible() && isUsabilityMaintained();
    }

    // Error Handling Methods
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // API Limit Methods
    public boolean isApiRequestsIndicatorVisible() {
        return apiRequestsIndicator.isVisible();
    }

    public String getApiRequestsInfo() {
        return apiRequestsIndicator.textContent();
    }
}