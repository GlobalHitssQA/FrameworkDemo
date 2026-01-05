package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class GitHubProfileSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator reposCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;
    private Locator userAvatar;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator followersList;
    private Locator profileInfo;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username' i], input.search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit']:has-text('Search'), button:has(svg.search-icon)");
        this.reposCount = page.locator("[data-testid='repos-count'], .metric-repos .count, .stats-repos .value");
        this.followersCount = page.locator("[data-testid='followers-count'], .metric-followers .count, .stats-followers .value");
        this.followingCount = page.locator("[data-testid='following-count'], .metric-following .count, .stats-following .value");
        this.gistsCount = page.locator("[data-testid='gists-count'], .metric-gists .count, .stats-gists .value");
        this.userAvatar = page.locator("[data-testid='user-avatar'], img.avatar, .profile-avatar img");
        this.username = page.locator("[data-testid='username'], .username, .profile-username");
        this.userBio = page.locator("[data-testid='user-bio'], .bio, .profile-bio");
        this.userLocation = page.locator("[data-testid='user-location'], .location, .profile-location");
        this.userCompany = page.locator("[data-testid='user-company'], .company, .profile-company");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, .followers-container");
        this.profileInfo = page.locator("[data-testid='profile-info'], .profile-info, .user-profile");
    }

    public void navigateToApplication() {
        page.navigate("https://github.com");
    }

    public boolean isApplicationLoaded() {
        return searchInput.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public boolean isProfileInfoVisible() {
        return profileInfo.isVisible();
    }

    public String getDisplayedUsername() {
        return username.textContent();
    }

    public boolean isReposCountVisible() {
        return reposCount.isVisible();
    }

    public boolean isFollowersCountVisible() {
        return followersCount.isVisible();
    }

    public boolean isFollowingCountVisible() {
        return followingCount.isVisible();
    }

    public boolean isGistsCountVisible() {
        return gistsCount.isVisible();
    }

    public String getReposCount() {
        return reposCount.textContent();
    }

    public String getFollowersCount() {
        return followersCount.textContent();
    }

    public String getFollowingCount() {
        return followingCount.textContent();
    }

    public String getGistsCount() {
        return gistsCount.textContent();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isBioSectionPresent() {
        return userBio.count() > 0;
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }
}