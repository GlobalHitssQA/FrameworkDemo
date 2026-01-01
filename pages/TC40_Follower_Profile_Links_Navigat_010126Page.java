package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators are INFERRED based on component description - not extracted from real page
 * The component is a custom frontend application that searches GitHub profiles
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private final String baseUrl;

    // Locators - INFERIDOS (componente personalizado de búsqueda de perfiles)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator errorMessage;
    private final Locator profileContainer;
    private final Locator userAvatar;
    private final Locator userFullName;
    private final Locator userName;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebsite;
    private final Locator followButton;
    private final Locator reposCount;
    private final Locator followersCount;
    private final Locator followingCount;
    private final Locator gistsCount;
    private final Locator followersList;
    private final Locator followerItems;
    private final Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.baseUrl = System.getProperty("app.base.url", "http://localhost:3000");

        // Search component locators - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='username'], input[type='search'], #search-username");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search'], button:has(svg), .search-btn");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert']");

        // Profile section locators - INFERIDOS
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-container, .user-profile");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar, img.profile-avatar");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-name, h1.name, .profile-name");
        this.userName = page.locator("[data-testid='username'], .username, .login-name");
        this.userBio = page.locator("[data-testid='user-bio'], .bio, .user-bio");
        this.userLocation = page.locator("[data-testid='user-location'], .location, [aria-label*='location']");
        this.userCompany = page.locator("[data-testid='user-company'], .company, [aria-label*='company']");
        this.userWebsite = page.locator("[data-testid='user-website'], .website, a.blog-link");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-btn");

        // Metrics dashboard locators - INFERIDOS
        this.reposCount = page.locator("[data-testid='repos-count'], .repos-count, .metric-repos");
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count, .metric-followers");
        this.followingCount = page.locator("[data-testid='following-count'], .following-count, .metric-following");
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count, .metric-gists");

        // Followers list locators - INFERIDOS
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, .followers-section, aside.followers");
        this.followerItems = page.locator("[data-testid='follower-item'], .follower-item, .followers-list > div, .follower-card");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit'], .api-limit, .rate-limit-warning");
    }

    public void navigate() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    public boolean isSearchComponentVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        profileContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean isProfileDataVisible() {
        return profileContainer.isVisible() && userAvatar.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean areFollowerAvatarsVisible() {
        Locator avatars = followerItems.locator("img, [data-testid='follower-avatar']");
        return avatars.count() > 0 && avatars.first().isVisible();
    }

    public boolean areFollowerUsernamesVisible() {
        Locator usernames = followerItems.locator("a, span.username, [data-testid='follower-username']");
        return usernames.count() > 0 && usernames.first().isVisible();
    }

    public boolean areFollowerLinksClickable() {
        Locator links = followerItems.locator("a[href*='github.com'], a[data-testid='follower-link']");
        if (links.count() == 0) {
            links = followerItems.locator("a");
        }
        return links.count() > 0 && links.first().isEnabled();
    }

    public int getFollowersCount() {
        return followerItems.count();
    }

    public String getFollowerUsernameAtIndex(int index) {
        Locator follower = followerItems.nth(index);
        Locator usernameElement = follower.locator("a, span.username, [data-testid='follower-username']").first();
        String text = usernameElement.textContent();
        return text != null ? text.trim().replace("@", "") : "";
    }

    public void clickFollowerLinkAtIndex(int index) {
        Locator follower = followerItems.nth(index);
        Locator link = follower.locator("a[href*='github.com'], a[data-testid='follower-link']").first();
        if (!link.isVisible()) {
            link = follower.locator("a").first();
        }
        link.click();
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public String getUserLocation() {
        return userLocation.textContent();
    }

    public String getReposCount() {
        return reposCount.textContent();
    }

    public String getFollowersCountMetric() {
        return followersCount.textContent();
    }

    public String getFollowingCountMetric() {
        return followingCount.textContent();
    }

    public String getGistsCount() {
        return gistsCount.textContent();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean isApiLimitWarningVisible() {
        return apiLimitIndicator.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }
}