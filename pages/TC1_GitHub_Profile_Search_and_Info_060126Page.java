package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubProfileSearchPage {
    private Page page;
    
    // Search component locators
    private Locator searchInput;
    private Locator searchButton;
    
    // Metrics dashboard locators
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    
    // Profile information locators
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator webLink;
    private Locator followButton;
    
    // Followers list locators
    private Locator followersList;
    private Locator followersListContainer;
    private Locator firstFollowerAvatar;
    private Locator firstFollowerUsername;
    private Locator firstFollowerLink;
    
    // API indicator locator
    private Locator apiRequestIndicator;
    
    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Initialize search component locators (inferidos)
        this.searchInput = page.locator("[data-testid='github-user-search-input']");
        this.searchButton = page.locator("[data-testid='github-search-button']");
        
        // Initialize metrics dashboard locators (inferidos)
        this.reposMetric = page.locator("[data-testid='repos-metric']");
        this.followersMetric = page.locator("[data-testid='followers-metric']");
        this.followingMetric = page.locator("[data-testid='following-metric']");
        this.gistsMetric = page.locator("[data-testid='gists-metric']");
        
        // Initialize profile information locators (inferidos)
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.fullName = page.locator("[data-testid='user-full-name']");
        this.username = page.locator("[data-testid='user-username']");
        this.biography = page.locator("[data-testid='user-biography']");
        this.location = page.locator("[data-testid='user-location']");
        this.company = page.locator("[data-testid='user-company']");
        this.webLink = page.locator("[data-testid='user-web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Initialize followers list locators (inferidos)
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followersListContainer = page.locator("[data-testid='followers-list-container']");
        this.firstFollowerAvatar = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-avatar']");
        this.firstFollowerUsername = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-username']");
        this.firstFollowerLink = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-link']");
        
        // Initialize API indicator locator (inferido)
        this.apiRequestIndicator = page.locator("[data-testid='api-request-indicator']");
    }
    
    // Search component methods
    public boolean isSearchComponentVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }
    
    public void enterUsername(String username) {
        searchInput.fill(username);
    }
    
    public String getEnteredUsername() {
        return searchInput.inputValue();
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    // Metrics dashboard methods
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
    
    public String getReposCount() {
        return reposMetric.textContent();
    }
    
    public String getFollowersCount() {
        return followersMetric.textContent();
    }
    
    public String getFollowingCount() {
        return followingMetric.textContent();
    }
    
    public String getGistsCount() {
        return gistsMetric.textContent();
    }
    
    // Profile information methods
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }
    
    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }
    
    public boolean isUsernameVisible() {
        return username.isVisible();
    }
    
    public String getFullName() {
        return fullName.textContent();
    }
    
    public String getUsername() {
        return username.textContent();
    }
    
    public boolean isBiographyPresent() {
        return biography.count() > 0;
    }
    
    public boolean isLocationPresent() {
        return location.count() > 0;
    }
    
    public boolean isCompanyPresent() {
        return company.count() > 0;
    }
    
    public boolean isWebLinkPresent() {
        return webLink.count() > 0;
    }
    
    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }
    
    public boolean isFollowButtonEnabled() {
        return followButton.isEnabled();
    }
    
    // Followers list methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }
    
    public int getFollowersCount() {
        return page.locator("[data-testid='follower-item']").count();
    }
    
    public boolean isFirstFollowerAvatarVisible() {
        return firstFollowerAvatar.isVisible();
    }
    
    public boolean isFirstFollowerUsernameVisible() {
        return firstFollowerUsername.isVisible();
    }
    
    public boolean isFirstFollowerLinkClickable() {
        return firstFollowerLink.isVisible() && firstFollowerLink.isEnabled();
    }
    
    public boolean isFollowersListScrollable() {
        String overflowY = (String) followersListContainer.evaluate("el => window.getComputedStyle(el).overflowY");
        return overflowY.equals("auto") || overflowY.equals("scroll");
    }
    
    public void clickFirstFollowerLink() {
        firstFollowerLink.click();
    }
    
    // API indicator methods
    public boolean isApiRequestIndicatorVisible() {
        return apiRequestIndicator.isVisible();
    }
    
    public String getApiRequestIndicatorText() {
        return apiRequestIndicator.textContent();
    }
}