package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Application
 * Locators are INFERRED based on best practices for a custom GitHub profile search component.
 * This is NOT the native GitHub page but a custom application that consumes GitHub API.
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Component Locators (INFERRED)
    private Locator searchInput;
    private Locator searchButton;

    // Profile Info Locators (INFERRED)
    private Locator profileContainer;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;

    // Metrics Locators (INFERRED)
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator apiRequestsIndicator;

    // Followers List Locators (INFERRED)
    private Locator followersSection;
    private Locator followersList;
    private Locator followerItems;
    private Locator followerAvatar;
    private Locator followerUsername;
    private Locator followerProfileLink;

    // Error Message Locator (INFERRED)
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Component - using semantic data-testid attributes (INFERRED)
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Profile Container (INFERRED)
        this.profileContainer = page.locator("[data-testid='profile-container']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");

        // Metrics Counters (INFERRED)
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");

        // Followers List Section (INFERRED)
        this.followersSection = page.locator("[data-testid='followers-section']");
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatar = page.locator("[data-testid='follower-item'] [data-testid='follower-avatar']");
        this.followerUsername = page.locator("[data-testid='follower-item'] [data-testid='follower-username']");
        this.followerProfileLink = page.locator("[data-testid='follower-item'] [data-testid='follower-profile-link']");

        // Error Message (INFERRED)
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    // Navigation Methods
    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search Methods
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void searchUser(String username) {
        enterUsername(username);
        clickSearchButton();
    }

    // Visibility Methods
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isSearchInputEnabled() {
        return searchInput.isEnabled();
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    public boolean isProfileContainerVisible() {
        return profileContainer.isVisible();
    }

    public boolean isFollowersSectionVisible() {
        return followersSection.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    // Wait Methods
    public void waitForProfileToLoad() {
        profileContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void waitForNavigation() {
        page.waitForLoadState();
    }

    public void waitForPageLoad() {
        page.waitForLoadState();
    }

    // Followers List Methods
    public int getFollowersCount() {
        return followerItems.count();
    }

    public boolean doesFirstFollowerHaveAvatar() {
        return followerItems.first().locator("[data-testid='follower-avatar']").isVisible();
    }

    public boolean doesFirstFollowerHaveUsername() {
        return followerItems.first().locator("[data-testid='follower-username']").isVisible();
    }

    public boolean doesFirstFollowerHaveProfileLink() {
        return followerItems.first().locator("[data-testid='follower-profile-link']").isVisible();
    }

    public String getFirstFollowerUsername() {
        return followerItems.first().locator("[data-testid='follower-username']").textContent().trim();
    }

    public void clickFirstFollowerProfileLink() {
        followerItems.first().locator("[data-testid='follower-profile-link']").click();
    }

    public boolean isFollowersListScrollable() {
        String overflow = followersList.evaluate("el => window.getComputedStyle(el).overflowY").toString();
        boolean hasScroll = overflow.equals("scroll") || overflow.equals("auto");
        
        Double scrollHeight = (Double) followersList.evaluate("el => el.scrollHeight");
        Double clientHeight = (Double) followersList.evaluate("el => el.clientHeight");
        
        return hasScroll && scrollHeight > clientHeight;
    }

    public void scrollFollowersList() {
        followersList.evaluate("el => el.scrollTop = el.scrollHeight / 2");
    }

    public void scrollToBottomOfFollowersList() {
        followersList.evaluate("el => el.scrollTop = el.scrollHeight");
    }

    // GitHub Profile Page Validation (for redirection)
    public boolean isGitHubProfilePageLoaded() {
        // Check if we're on a GitHub profile page after redirection
        String url = page.url();
        return url.contains("github.com/") && 
               page.locator("img[alt*='@']").first().isVisible();
    }

    // Getter Methods for Metrics
    public String getReposCount() {
        return reposCounter.textContent().trim();
    }

    public String getFollowersCountText() {
        return followersCounter.textContent().trim();
    }

    public String getFollowingCount() {
        return followingCounter.textContent().trim();
    }

    public String getGistsCount() {
        return gistsCounter.textContent().trim();
    }

    public String getApiRequestsInfo() {
        return apiRequestsIndicator.textContent().trim();
    }

    // Profile Info Getters
    public String getUserName() {
        return userName.textContent().trim();
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

    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    // Error Handling
    public String getErrorMessage() {
        return errorMessage.textContent().trim();
    }
}