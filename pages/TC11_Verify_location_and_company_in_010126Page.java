package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - Basados en buenas prácticas para un componente de búsqueda de perfiles personalizado
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private final String baseUrl;

    // Locators - INFERIDOS (componente personalizado de búsqueda de perfiles)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator profileContainer;
    private final Locator leftSection;
    private final Locator userAvatar;
    private final Locator userName;
    private final Locator userUsername;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebsite;
    private final Locator followButton;
    private final Locator errorMessage;
    private final Locator metricsRepos;
    private final Locator metricsFollowers;
    private final Locator metricsFollowing;
    private final Locator metricsGists;
    private final Locator followersList;
    private final Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.baseUrl = "https://github.com";

        // Search component locators - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='username'], input[type='search'], #search-username");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search'], button:has(svg[class*='magnifying']), .search-btn");

        // Profile display locators - INFERIDOS
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-container, #profile-result, .user-profile");
        this.leftSection = page.locator("[data-testid='profile-left-section'], .profile-left, .user-details-section, aside.profile-sidebar");

        // User info locators - INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar-user, img[alt*='avatar'], .profile-avatar");
        this.userName = page.locator("[data-testid='user-fullname'], .user-fullname, .profile-name, h1.user-name");
        this.userUsername = page.locator("[data-testid='user-username'], .user-username, .profile-username, span.username");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .profile-bio, p.bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, [itemprop='homeLocation'], li:has(svg[class*='location']) span, .profile-location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, [itemprop='worksFor'], li:has(svg[class*='organization']) span, .profile-company");
        this.userWebsite = page.locator("[data-testid='user-website'], .user-website, a[rel='nofollow'], .profile-link");

        // Action buttons - INFERIDOS
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-btn");

        // Error handling - INFERIDOS
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, .user-not-found, .alert-error");

        // Metrics dashboard locators - INFERIDOS
        this.metricsRepos = page.locator("[data-testid='metric-repos'], .metric-repos, .repos-count, [data-metric='repositories']");
        this.metricsFollowers = page.locator("[data-testid='metric-followers'], .metric-followers, .followers-count, [data-metric='followers']");
        this.metricsFollowing = page.locator("[data-testid='metric-following'], .metric-following, .following-count, [data-metric='following']");
        this.metricsGists = page.locator("[data-testid='metric-gists'], .metric-gists, .gists-count, [data-metric='gists']");

        // Followers list - INFERIDOS
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, ul.followers, .followers-container");

        // API limit indicator - INFERIDOS
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator'], .api-limit, .rate-limit-warning, .api-requests-remaining");
    }

    public void navigateToSearchPage() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    public boolean isSearchComponentVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchInput.clear();
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public void searchUser(String username) {
        enterUsername(username);
        clickSearchButton();
    }

    public boolean isProfileDisplayed() {
        profileContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
        return profileContainer.isVisible();
    }

    public boolean isLeftSectionVisible() {
        return leftSection.isVisible();
    }

    public String getLocationText() {
        userLocation.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return userLocation.textContent().trim();
    }

    public String getCompanyText() {
        userCompany.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return userCompany.textContent().trim();
    }

    public boolean isLocationVisible() {
        return userLocation.isVisible();
    }

    public boolean isCompanyVisible() {
        return userCompany.isVisible();
    }

    public String getUserName() {
        return userName.textContent().trim();
    }

    public String getUserUsername() {
        return userUsername.textContent().trim();
    }

    public String getUserBio() {
        return userBio.textContent().trim();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }

    public String getReposCount() {
        return metricsRepos.textContent().trim();
    }

    public String getFollowersCount() {
        return metricsFollowers.textContent().trim();
    }

    public String getFollowingCount() {
        return metricsFollowing.textContent().trim();
    }

    public String getGistsCount() {
        return metricsGists.textContent().trim();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followersList.locator("li, .follower-item").count();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public String getWebsiteUrl() {
        return userWebsite.getAttribute("href");
    }
}