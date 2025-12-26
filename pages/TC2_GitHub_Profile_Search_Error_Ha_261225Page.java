package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - basados en buenas prácticas y metadata del proyecto
 */
public class GitHubProfileSearchPage {

    private Page page;
    
    // Base URL
    private static final String BASE_URL = "https://github.com";
    
    // Search Component Locators (inferidos)
    private Locator searchInput;
    private Locator searchButton;
    
    // Error State Locators (inferidos)
    private Locator errorMessage;
    private Locator emptyState;
    
    // Profile Metrics Locators (inferidos)
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    
    // Profile Information Locators (inferidos)
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    
    // Followers List Locators (inferidos)
    private Locator followersList;
    
    // API Limit Indicator (inferidos)
    private Locator apiRequestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Search Component - inferidos con data-testid semánticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Error State - inferidos
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.emptyState = page.locator("[data-testid='empty-state']");
        
        // Profile Metrics - inferidos
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
        
        // Profile Information - inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userName = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-weblink']");
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Followers List - inferidos
        this.followersList = page.locator("[data-testid='followers-list']");
        
        // API Indicator - inferidos
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
    }

    // Navigation Methods
    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search Component Methods
    public void enterUsername(String username) {
        searchInput.fill(username);
    }
    
    public String getSearchInputValue() {
        return searchInput.inputValue();
    }
    
    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }
    
    public void searchUser(String username) {
        enterUsername(username);
        clickSearchButton();
    }
    
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }
    
    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    // Error State Methods
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible() || emptyState.isVisible();
    }
    
    public String getErrorMessageText() {
        if (errorMessage.isVisible()) {
            return errorMessage.textContent();
        } else if (emptyState.isVisible()) {
            return emptyState.textContent();
        }
        return "";
    }

    // Profile Metrics Methods
    public boolean isReposCounterVisible() {
        return reposCounter.isVisible();
    }
    
    public String getReposCount() {
        return reposCounter.textContent();
    }
    
    public boolean isFollowersCounterVisible() {
        return followersCounter.isVisible();
    }
    
    public String getFollowersCount() {
        return followersCounter.textContent();
    }
    
    public boolean isFollowingCounterVisible() {
        return followingCounter.isVisible();
    }
    
    public String getFollowingCount() {
        return followingCounter.textContent();
    }
    
    public boolean isGistsCounterVisible() {
        return gistsCounter.isVisible();
    }
    
    public String getGistsCount() {
        return gistsCounter.textContent();
    }

    // Profile Information Methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }
    
    public boolean isUserFullNameVisible() {
        return userFullName.isVisible();
    }
    
    public String getUserFullName() {
        return userFullName.textContent();
    }
    
    public boolean isUserBioVisible() {
        return userBio.isVisible();
    }
    
    public String getUserBio() {
        return userBio.textContent();
    }
    
    public boolean isUserLocationVisible() {
        return userLocation.isVisible();
    }
    
    public String getUserLocation() {
        return userLocation.textContent();
    }
    
    public boolean isUserCompanyVisible() {
        return userCompany.isVisible();
    }
    
    public String getUserCompany() {
        return userCompany.textContent();
    }
    
    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }
    
    public void clickFollowButton() {
        followButton.click();
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }
    
    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    // API Requests Indicator Methods
    public boolean isApiRequestsIndicatorVisible() {
        return apiRequestsIndicator.isVisible();
    }
    
    public String getApiRequestsText() {
        return apiRequestsIndicator.textContent();
    }
}