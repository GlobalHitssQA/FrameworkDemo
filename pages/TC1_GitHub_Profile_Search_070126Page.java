package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {
    private Page page;
    
    // Locators - inferidos basados en las buenas prácticas y elementos UI identificados
    private Locator searchInput;
    private Locator searchButton;
    private Locator userAvatar;
    private Locator username;
    private Locator fullName;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator websiteLink;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator followersList;
    private Locator followButton;
    private Locator errorMessage;
    private Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Inicialización de locators inferidos con selectores robustos
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username'], input#github-search");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='Search'], button.search-btn");
        this.userAvatar = page.locator("[data-testid='user-avatar'], img.avatar, .profile-avatar img");
        this.username = page.locator("[data-testid='username'], .username, .profile-username");
        this.fullName = page.locator("[data-testid='full-name'], .full-name, .profile-name");
        this.biography = page.locator("[data-testid='user-bio'], .bio, .profile-bio");
        this.location = page.locator("[data-testid='user-location'], .location, .profile-location");
        this.company = page.locator("[data-testid='user-company'], .company, .profile-company");
        this.websiteLink = page.locator("[data-testid='user-website'], a.website, .profile-website a");
        this.reposMetric = page.locator("[data-testid='repos-metric'], .metric-repos, .dashboard .repos");
        this.followersMetric = page.locator("[data-testid='followers-metric'], .metric-followers, .dashboard .followers");
        this.followingMetric = page.locator("[data-testid='following-metric'], .metric-following, .dashboard .following");
        this.gistsMetric = page.locator("[data-testid='gists-metric'], .metric-gists, .dashboard .gists");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, .followers-container");
        this.followButton = page.locator("[data-testid='follow-button'], button.follow-btn, button[aria-label='Follow']");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, .user-not-found");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit'], .api-limit, .rate-limit-indicator");
    }

    public void navigateToSearchPage() {
        page.navigate("https://github.com");
    }

    public boolean isSearchInterfaceDisplayed() {
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

    public void waitForProfileDataToLoad() {
        page.waitForTimeout(2000);
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

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

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }

    public boolean isBiographyVisible() {
        return biography.isVisible();
    }

    public boolean isLocationVisible() {
        return location.isVisible();
    }

    public boolean isCompanyVisible() {
        return company.isVisible();
    }

    public boolean isWebsiteLinkVisible() {
        return websiteLink.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessage() {
        return errorMessage.textContent();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public void scrollFollowersList() {
        followersList.scrollIntoViewIfNeeded();
    }

    public String getUsernameText() {
        return username.textContent();
    }

    public String getFullNameText() {
        return fullName.textContent();
    }

    public String getBiographyText() {
        return biography.textContent();
    }
}