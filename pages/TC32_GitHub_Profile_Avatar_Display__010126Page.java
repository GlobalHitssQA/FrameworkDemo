package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - basados en mejores prácticas y convenciones de data-testid
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private final String baseUrl = "https://github.com";

    // Locators - INFERIDOS (no extraídos de página real)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator errorMessage;
    private final Locator userAvatar;
    private final Locator userDetailsSection;
    private final Locator userName;
    private final Locator userFullName;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebsite;
    private final Locator followButton;
    private final Locator reposCount;
    private final Locator followersCount;
    private final Locator followingCount;
    private final Locator gistsCount;
    private final Locator followersSection;
    private final Locator followersList;
    private final Locator followerAvatars;
    private final Locator placeholderAvatar;
    private final Locator apiLimitIndicator;
    private final Locator profileContainer;
    private final Locator metricsContainer;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Search elements - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input'], #search-input, input[placeholder*='username'], input[type='search']");
        this.searchButton = page.locator("[data-testid='search-button'], #search-button, button[aria-label*='search'], button:has(svg)");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert']");
        
        // User profile elements - INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img.avatar, .profile-avatar img");
        this.userDetailsSection = page.locator("[data-testid='user-details'], .user-details, .profile-details");
        this.userName = page.locator("[data-testid='username'], .username, .profile-username");
        this.userFullName = page.locator("[data-testid='user-fullname'], .fullname, .profile-fullname, h1.name");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .profile-bio, p.bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, .profile-location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, .profile-company");
        this.userWebsite = page.locator("[data-testid='user-website'], .user-website, a.profile-link");
        this.followButton = page.locator("[data-testid='follow-button'], .follow-button, button:has-text('Follow')");
        
        // Metrics dashboard elements - INFERIDOS
        this.reposCount = page.locator("[data-testid='repos-count'], .repos-count, .metric-repos");
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count, .metric-followers");
        this.followingCount = page.locator("[data-testid='following-count'], .following-count, .metric-following");
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count, .metric-gists");
        this.metricsContainer = page.locator("[data-testid='metrics-dashboard'], .metrics-container, .dashboard-metrics");
        
        // Followers section elements - INFERIDOS
        this.followersSection = page.locator("[data-testid='followers-section'], .followers-section, .followers-list-container");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, ul.followers");
        this.followerAvatars = page.locator("[data-testid='follower-avatar'], .follower-avatar, .followers-list img.avatar");
        
        // Other elements - INFERIDOS
        this.placeholderAvatar = page.locator("[data-testid='placeholder-avatar'], .placeholder-avatar, img[src*='placeholder'], img[src*='default']");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator'], .api-limit, .rate-limit-warning");
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-container, #profile-container");
    }

    public void navigateToSearchPage() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean isProfileDataLoaded() {
        return profileContainer.isVisible() || userDetailsSection.isVisible();
    }

    public boolean isUserAvatarDisplayed() {
        return userAvatar.isVisible();
    }

    public boolean hasAvatarProperDimensions() {
        if (!userAvatar.isVisible()) {
            return false;
        }
        Double width = (Double) userAvatar.evaluate("el => el.naturalWidth");
        Double height = (Double) userAvatar.evaluate("el => el.naturalHeight");
        return width != null && height != null && width > 0 && height > 0;
    }

    public String getAvatarImageSrc() {
        return userAvatar.getAttribute("src");
    }

    public boolean isPlaceholderAvatarDisplayed() {
        return placeholderAvatar.isVisible();
    }

    public boolean isFollowersSectionDisplayed() {
        return followersSection.isVisible() || followersList.isVisible();
    }

    public boolean areAllFollowerAvatarsLoaded() {
        if (!isFollowersSectionDisplayed()) {
            return false;
        }
        int avatarCount = followerAvatars.count();
        if (avatarCount == 0) {
            return true; // No followers is a valid state
        }
        for (int i = 0; i < avatarCount; i++) {
            Locator avatar = followerAvatars.nth(i);
            if (!avatar.isVisible()) {
                return false;
            }
            String src = avatar.getAttribute("src");
            if (src == null || src.isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserFullName() {
        return userFullName.textContent();
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

    public String getFollowersCount() {
        return followersCount.textContent();
    }

    public String getFollowingCount() {
        return followingCount.textContent();
    }

    public String getGistsCount() {
        return gistsCount.textContent();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isApiLimitIndicatorDisplayed() {
        return apiLimitIndicator.isVisible();
    }

    public void scrollFollowersList() {
        if (followersSection.isVisible()) {
            followersSection.evaluate("el => el.scrollBy(0, 300)");
        }
    }

    public int getFollowerAvatarsCount() {
        return followerAvatars.count();
    }

    public void waitForProfileToLoad() {
        userDetailsSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
}