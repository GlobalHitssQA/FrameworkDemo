package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Component Locators - INFERIDO (componente personalizado)
    private Locator searchInput;
    private Locator searchButton;

    // Metrics Dashboard Locators - INFERIDO
    private Locator reposCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;

    // Profile Section Locators - INFERIDO
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator webLink;
    private Locator followButton;

    // Followers Section Locators - INFERIDO
    private Locator followersList;
    private Locator followerItems;
    private Locator followerAvatars;
    private Locator followerUsernames;
    private Locator followerProfileLinks;

    // API Indicator Locator - INFERIDO
    private Locator apiRequestIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Component - INFERIDO
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Metrics Dashboard - INFERIDO
        this.reposCount = page.locator("[data-testid='repos-count']");
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.followingCount = page.locator("[data-testid='following-count']");
        this.gistsCount = page.locator("[data-testid='gists-count']");

        // Profile Section - INFERIDO
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.fullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.biography = page.locator("[data-testid='user-bio']");
        this.location = page.locator("[data-testid='user-location']");
        this.company = page.locator("[data-testid='user-company']");
        this.webLink = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Followers Section - INFERIDO
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatars = page.locator("[data-testid='follower-item'] [data-testid='follower-avatar']");
        this.followerUsernames = page.locator("[data-testid='follower-item'] [data-testid='follower-username']");
        this.followerProfileLinks = page.locator("[data-testid='follower-item'] a[href]");

        // API Indicator - INFERIDO
        this.apiRequestIndicator = page.locator("[data-testid='api-request-indicator']");
    }

    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String usernameText) {
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean isReposCountVisible() {
        return reposCount.isVisible();
    }

    public String getReposCount() {
        return reposCount.textContent();
    }

    public boolean isFollowersCountVisible() {
        return followersCount.isVisible();
    }

    public String getFollowersCount() {
        return followersCount.textContent();
    }

    public boolean isFollowingCountVisible() {
        return followingCount.isVisible();
    }

    public String getFollowingCount() {
        return followingCount.textContent();
    }

    public boolean isGistsCountVisible() {
        return gistsCount.isVisible();
    }

    public String getGistsCount() {
        return gistsCount.textContent();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }

    public String getFullName() {
        return fullName.textContent();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public String getUsername() {
        return username.textContent();
    }

    public boolean isBiographyVisible() {
        return biography.isVisible();
    }

    public String getBiography() {
        return biography.textContent();
    }

    public boolean isLocationVisible() {
        return location.isVisible();
    }

    public String getLocation() {
        return location.textContent();
    }

    public boolean isCompanyVisible() {
        return company.isVisible();
    }

    public String getCompany() {
        return company.textContent();
    }

    public boolean isWebLinkVisible() {
        return webLink.isVisible();
    }

    public String getWebLinkHref() {
        return webLink.getAttribute("href");
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followerItems.count();
    }

    public boolean doFollowersHaveAvatars() {
        int followerCount = followerItems.count();
        if (followerCount == 0) return false;
        return followerAvatars.count() == followerCount;
    }

    public boolean doFollowersHaveUsernames() {
        int followerCount = followerItems.count();
        if (followerCount == 0) return false;
        return followerUsernames.count() == followerCount;
    }

    public boolean doFollowersHaveProfileLinks() {
        int followerCount = followerItems.count();
        if (followerCount == 0) return false;
        return followerProfileLinks.count() >= followerCount;
    }

    public boolean isApiRequestIndicatorVisible() {
        return apiRequestIndicator.isVisible();
    }

    public String getApiUsageText() {
        return apiRequestIndicator.textContent();
    }

    public boolean isApiUsageFormatValid() {
        String usageText = getApiUsageText();
        return usageText != null && usageText.matches(".*\\d+/\\d+.*");
    }
}