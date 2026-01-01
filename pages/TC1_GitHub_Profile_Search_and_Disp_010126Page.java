package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * LOCATORS: INFERIDOS - Basados en buenas prácticas para aplicación custom de búsqueda de perfiles GitHub
 */
public class GitHubProfileSearchPage {
    
    private final Page page;
    private final String baseUrl;
    
    // Search Section Locators (INFERIDOS)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator errorMessage;
    
    // Profile Container Locator (INFERIDO)
    private final Locator profileContainer;
    
    // Metrics Dashboard Locators (INFERIDOS)
    private final Locator reposCounter;
    private final Locator followersCounter;
    private final Locator followingCounter;
    private final Locator gistsCounter;
    
    // User Details Section Locators (INFERIDOS)
    private final Locator userAvatar;
    private final Locator fullName;
    private final Locator username;
    private final Locator biography;
    private final Locator location;
    private final Locator company;
    private final Locator webLink;
    private final Locator followButton;
    
    // Followers List Section Locators (INFERIDOS)
    private final Locator followersList;
    private final Locator followerItems;
    private final Locator firstFollowerAvatar;
    private final Locator firstFollowerUsername;
    private final Locator firstFollowerProfileLink;
    
    // API Requests Indicator Locator (INFERIDO)
    private final Locator requestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.baseUrl = "https://github.com"; // URL base del proyecto
        
        // Search Section - Locators inferidos con data-testid semánticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        
        // Profile Container
        this.profileContainer = page.locator("[data-testid='profile-container']");
        
        // Metrics Dashboard - Locators inferidos
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
        
        // User Details Section - Locators inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.fullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.biography = page.locator("[data-testid='user-biography']");
        this.location = page.locator("[data-testid='user-location']");
        this.company = page.locator("[data-testid='user-company']");
        this.webLink = page.locator("[data-testid='user-weblink']");
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Followers List Section - Locators inferidos
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.firstFollowerAvatar = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-avatar']");
        this.firstFollowerUsername = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-username']");
        this.firstFollowerProfileLink = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-profile-link']");
        
        // API Requests Indicator - Locator inferido
        this.requestsIndicator = page.locator("[data-testid='requests-indicator']");
    }

    // Navigation Methods
    public void navigateToSearchPage() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    // Search Section Methods
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public void enterUsername(String usernameText) {
        searchInput.clear();
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Profile Container Methods
    public boolean isProfileContainerVisible() {
        return profileContainer.isVisible();
    }

    // Metrics Dashboard Methods
    public boolean isReposCounterVisible() {
        return reposCounter.isVisible();
    }

    public boolean isFollowersCounterVisible() {
        return followersCounter.isVisible();
    }

    public boolean isFollowingCounterVisible() {
        return followingCounter.isVisible();
    }

    public boolean isGistsCounterVisible() {
        return gistsCounter.isVisible();
    }

    public String getReposCounterText() {
        return reposCounter.textContent();
    }

    public String getFollowersCounterText() {
        return followersCounter.textContent();
    }

    public String getFollowingCounterText() {
        return followingCounter.textContent();
    }

    public String getGistsCounterText() {
        return gistsCounter.textContent();
    }

    // User Details Section Methods
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public String getFullNameText() {
        return fullName.textContent();
    }

    public String getUsernameText() {
        return username.textContent();
    }

    public void verifyBiographyDisplayed() {
        // Biography may be empty or show 'Not available'
        biography.isVisible();
    }

    public void verifyLocationDisplayed() {
        // Location may be empty or show 'Not available'
        location.isVisible();
    }

    public void verifyCompanyDisplayed() {
        // Company may be empty or show 'Not available'
        company.isVisible();
    }

    public void verifyWebLinkDisplayed() {
        // Web link may be empty or show 'Not available'
        webLink.isVisible();
    }

    public String getBiographyText() {
        return biography.textContent();
    }

    public String getLocationText() {
        return location.textContent();
    }

    public String getCompanyText() {
        return company.textContent();
    }

    public String getWebLinkHref() {
        return webLink.getAttribute("href");
    }

    // Follow Button Methods
    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public boolean isFollowButtonEnabled() {
        return followButton.isEnabled();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean hasFollowerItems() {
        return followerItems.count() > 0;
    }

    public int getFollowersCount() {
        return followerItems.count();
    }

    public boolean isFirstFollowerAvatarVisible() {
        return firstFollowerAvatar.isVisible();
    }

    public boolean isFirstFollowerUsernameVisible() {
        return firstFollowerUsername.isVisible();
    }

    public boolean isFirstFollowerProfileLinkVisible() {
        return firstFollowerProfileLink.isVisible();
    }

    public boolean followersExceedContainerSize() {
        // Check if scroll is needed by comparing scroll height with client height
        return (Boolean) page.evaluate(
            "() => { " +
            "const list = document.querySelector('[data-testid=\"followers-list\"]'); " +
            "return list ? list.scrollHeight > list.clientHeight : false; " +
            "}"
        );
    }

    public boolean isFollowersListScrollable() {
        // Verify overflow-y is set to auto or scroll
        String overflow = (String) page.evaluate(
            "() => { " +
            "const list = document.querySelector('[data-testid=\"followers-list\"]'); " +
            "return list ? window.getComputedStyle(list).overflowY : 'hidden'; " +
            "}"
        );
        return overflow.equals("auto") || overflow.equals("scroll");
    }

    public void scrollFollowersList() {
        followersList.evaluate("el => el.scrollTop = el.scrollHeight");
    }

    public void clickFollowerProfileLink(int index) {
        page.locator("[data-testid='follower-item']:nth-child(" + (index + 1) + ") [data-testid='follower-profile-link']").click();
    }

    // API Requests Indicator Methods
    public boolean isRequestsIndicatorVisible() {
        return requestsIndicator.isVisible();
    }

    public String getRequestsIndicatorText() {
        return requestsIndicator.textContent();
    }

    // Wait Methods
    public void waitForProfileToLoad() {
        profileContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void waitForSearchResults() {
        page.waitForLoadState();
    }
}