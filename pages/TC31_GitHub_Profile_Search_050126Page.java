package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.ScrollBehavior;

public class GitHubSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (basados en buenas prácticas)
    private Locator searchInput;
    private Locator searchButton;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator bio;
    private Locator location;
    private Locator company;
    private Locator webLink;
    private Locator followButton;
    private Locator followersList;
    private Locator followerItems;
    private Locator requestCounter;
    private Locator errorMessage;
    private Locator emptyState;
    private Locator profileContainer;

    public GitHubSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search elements
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username'], #search-input, .search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit'], .search-button, button:has-text('Search')");
        
        // Metrics
        this.reposMetric = page.locator("[data-testid='repos-metric'], .metric-repos, #repos-count");
        this.followersMetric = page.locator("[data-testid='followers-metric'], .metric-followers, #followers-count");
        this.followingMetric = page.locator("[data-testid='following-metric'], .metric-following, #following-count");
        this.gistsMetric = page.locator("[data-testid='gists-metric'], .metric-gists, #gists-count");
        
        // Profile information
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img.avatar");
        this.fullName = page.locator("[data-testid='user-fullname'], .user-fullname, .profile-name");
        this.username = page.locator("[data-testid='username'], .username, .profile-username");
        this.bio = page.locator("[data-testid='user-bio'], .user-bio, .profile-bio");
        this.location = page.locator("[data-testid='user-location'], .user-location, .profile-location");
        this.company = page.locator("[data-testid='user-company'], .user-company, .profile-company");
        this.webLink = page.locator("[data-testid='user-weblink'], .user-website, a.profile-link");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-btn");
        
        // Followers section
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, .followers-container");
        this.followerItems = page.locator("[data-testid='follower-item'], .follower-item, .follower");
        
        // Other elements
        this.requestCounter = page.locator("[data-testid='request-counter'], .request-counter, .api-limit");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, .alert-error");
        this.emptyState = page.locator("[data-testid='empty-state'], .empty-state, .no-results");
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-container, .user-profile");
    }

    public void navigate(String url) {
        page.navigate(url);
    }

    public boolean isSearchInputVisible() {
        return searchInput.first().isVisible();
    }

    public void enterUsername(String username) {
        searchInput.first().clear();
        searchInput.first().fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.first().inputValue();
    }

    public void clickSearchButton() {
        searchButton.first().click();
    }

    public void waitForProfileDataToLoad() {
        page.waitForTimeout(2000);
    }

    public boolean isProfileDataVisible() {
        return profileContainer.first().isVisible() || userAvatar.first().isVisible();
    }

    public boolean isReposMetricVisible() {
        return reposMetric.first().isVisible();
    }

    public boolean isFollowersMetricVisible() {
        return followersMetric.first().isVisible();
    }

    public boolean isFollowingMetricVisible() {
        return followingMetric.first().isVisible();
    }

    public boolean isGistsMetricVisible() {
        return gistsMetric.first().isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.first().isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.first().isVisible();
    }

    public boolean isUsernameVisible() {
        return username.first().isVisible();
    }

    public boolean isBioSectionVisible() {
        return bio.count() > 0;
    }

    public boolean isLocationSectionVisible() {
        return location.count() > 0;
    }

    public boolean isCompanySectionVisible() {
        return company.count() > 0;
    }

    public boolean isFollowButtonVisible() {
        return followButton.first().isVisible();
    }

    public void waitForFollowersListToLoad() {
        page.waitForTimeout(1500);
    }

    public boolean isFollowersListVisible() {
        return followersList.first().isVisible();
    }

    public int getFollowersCount() {
        return followerItems.count();
    }

    public void scrollFollowersList() {
        if (followersList.count() > 0) {
            followersList.first().evaluate("element => element.scrollTop = element.scrollHeight");
        }
    }

    public String getFirstFollowerProfileUrl() {
        if (followerItems.count() > 0) {
            Locator firstFollowerLink = followerItems.first().locator("a");
            return firstFollowerLink.getAttribute("href");
        }
        return "";
    }

    public void clickFirstFollowerLink() {
        if (followerItems.count() > 0) {
            followerItems.first().locator("a").first().click();
        }
    }

    public boolean isWebLinkVisible() {
        return webLink.count() > 0 && webLink.first().isVisible();
    }

    public void clickWebLink() {
        if (isWebLinkVisible()) {
            webLink.first().click();
        }
    }

    public boolean isRequestCounterVisible() {
        return requestCounter.count() > 0 && requestCounter.first().isVisible();
    }

    public String getRequestCounterText() {
        if (isRequestCounterVisible()) {
            return requestCounter.first().textContent();
        }
        return "";
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.count() > 0 && errorMessage.first().isVisible();
    }

    public boolean isEmptyStateVisible() {
        return emptyState.count() > 0 && emptyState.first().isVisible();
    }
}