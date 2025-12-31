package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Finder Component
 * Locators: INFERIDOS (la aplicación descrita es un componente personalizado que consume la API de GitHub)
 */
public class GitHubProfileFinderPage {

    private Page page;
    private String baseUrl = "https://github.com";

    // Search Section Locators (inferidos)
    private Locator searchInput;
    private Locator searchButton;
    private Locator loadingIndicator;

    // Profile Container Locator (inferido)
    private Locator profileContainer;

    // Left Section - User Personal Details Locators (inferidos)
    private Locator userAvatar;
    private Locator userFullName;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsiteLink;
    private Locator followButton;

    // Dashboard - Metrics Locators (inferidos)
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // Right Section - Followers List Locators (inferidos)
    private Locator followersList;
    private Locator followerAvatar;
    private Locator followerUsername;
    private Locator followerProfileLink;

    public GitHubProfileFinderPage(Page page) {
        this.page = page;
        initLocators();
    }

    private void initLocators() {
        // Search Section (inferidos - basados en buenas prácticas de data-testid)
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.loadingIndicator = page.locator("[data-testid='loading-indicator']");

        // Profile Container (inferido)
        this.profileContainer = page.locator("[data-testid='profile-container']");

        // Left Section - User Personal Details (inferidos)
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsiteLink = page.locator("[data-testid='user-website-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Dashboard - Metrics (inferidos)
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // Right Section - Followers List (inferidos)
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerAvatar = page.locator("[data-testid='follower-avatar']");
        this.followerUsername = page.locator("[data-testid='follower-username']");
        this.followerProfileLink = page.locator("[data-testid='follower-profile-link']");
    }

    // Navigation
    public void navigateToProfileFinder() {
        page.navigate(baseUrl);
    }

    // Search Section Methods
    public void enterUsername(String usernameText) {
        searchInput.fill(usernameText);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isLoadingIndicatorVisible() {
        return loadingIndicator.isVisible();
    }

    // Profile Container Methods
    public void waitForProfileToLoad() {
        profileContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean isProfileContainerVisible() {
        return profileContainer.isVisible();
    }

    // Left Section - User Personal Details Methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUserFullNameVisible() {
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

    public boolean isUserWebsiteLinkVisible() {
        return userWebsiteLink.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public String getUserFullNameText() {
        return userFullName.textContent();
    }

    public String getUsernameText() {
        return username.textContent();
    }

    public String getUserBioText() {
        return userBio.textContent();
    }

    public String getUserLocationText() {
        return userLocation.textContent();
    }

    public String getUserCompanyText() {
        return userCompany.textContent();
    }

    public String getUserWebsiteLinkText() {
        return userWebsiteLink.textContent();
    }

    // Dashboard - Metrics Methods
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

    // Right Section - Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isFollowerAvatarVisible() {
        return followerAvatar.first().isVisible();
    }

    public boolean isFollowerUsernameVisible() {
        return followerUsername.first().isVisible();
    }

    public boolean isFollowerProfileLinkVisible() {
        return followerProfileLink.first().isVisible();
    }

    public int getFollowersCount() {
        return followerAvatar.count();
    }

    public void clickFollowerProfileLink(int index) {
        followerProfileLink.nth(index).click();
    }
}