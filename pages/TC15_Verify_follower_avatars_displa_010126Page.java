package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.LoadState;
import java.util.List;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (aplicación personalizada basada en API de GitHub)
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private final String baseUrl = "https://github.com"; // URL base inferida

    // Locators - INFERIDOS basados en buenas prácticas y elementos UI testeables
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator errorMessage;
    private final Locator userAvatar;
    private final Locator userName;
    private final Locator userFullName;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebLink;
    private final Locator followButton;
    private final Locator followersSection;
    private final Locator followersList;
    private final Locator followerItems;
    private final Locator followerAvatars;
    private final Locator metricsRepos;
    private final Locator metricsFollowers;
    private final Locator metricsFollowing;
    private final Locator metricsGists;
    private final Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Search components - inferidos
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='username'], #search-input, .search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search'], .search-button, button:has(svg.search-icon)");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert']");
        
        // User profile components - inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img.avatar");
        this.userName = page.locator("[data-testid='username'], .username, .user-login");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-fullname, .full-name");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, .location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, .company");
        this.userWebLink = page.locator("[data-testid='user-website'], .user-website, a.website-link");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-button");
        
        // Followers section - inferidos
        this.followersSection = page.locator("[data-testid='followers-section'], .followers-section, section.followers");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, ul.followers");
        this.followerItems = page.locator("[data-testid='follower-item'], .follower-item, .followers-list li");
        this.followerAvatars = page.locator("[data-testid='follower-avatar'], .follower-item img, .follower-avatar");
        
        // Metrics dashboard - inferidos
        this.metricsRepos = page.locator("[data-testid='metric-repos'], .metric-repos, [data-metric='repos']");
        this.metricsFollowers = page.locator("[data-testid='metric-followers'], .metric-followers, [data-metric='followers']");
        this.metricsFollowing = page.locator("[data-testid='metric-following'], .metric-following, [data-metric='following']");
        this.metricsGists = page.locator("[data-testid='metric-gists'], .metric-gists, [data-metric='gists']");
        
        // API limit indicator - inferido
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator'], .api-limit, .rate-limit-warning");
    }

    // Navigation methods
    public void navigateToSearchPage() {
        page.navigate(baseUrl);
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    // Search interaction methods
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        page.waitForLoadState(LoadState.NETWORKIDLE);
        userAvatar.waitFor();
    }

    // Validation methods
    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public boolean isUsernameEntered(String expectedUsername) {
        String actualValue = searchInput.inputValue();
        return actualValue != null && actualValue.equals(expectedUsername);
    }

    public boolean isFollowersListVisible() {
        return followersSection.isVisible() && followersList.isVisible();
    }

    public boolean allFollowersHaveAvatars() {
        int followerCount = followerItems.count();
        if (followerCount == 0) {
            return false;
        }
        
        int avatarCount = followerAvatars.count();
        return avatarCount >= followerCount;
    }

    public boolean areAvatarsProperlyFormatted() {
        int avatarCount = followerAvatars.count();
        if (avatarCount == 0) {
            return false;
        }
        
        for (int i = 0; i < avatarCount; i++) {
            Locator avatar = followerAvatars.nth(i);
            
            // Verify avatar is visible
            if (!avatar.isVisible()) {
                return false;
            }
            
            // Verify avatar has src attribute (image loaded from GitHub API)
            String src = avatar.getAttribute("src");
            if (src == null || src.isEmpty()) {
                return false;
            }
            
            // Verify consistent sizing via bounding box
            var boundingBox = avatar.boundingBox();
            if (boundingBox == null || boundingBox.width <= 0 || boundingBox.height <= 0) {
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

    // Getter methods for metrics
    public String getReposCount() {
        return metricsRepos.textContent();
    }

    public String getFollowersCount() {
        return metricsFollowers.textContent();
    }

    public String getFollowingCount() {
        return metricsFollowing.textContent();
    }

    public String getGistsCount() {
        return metricsGists.textContent();
    }

    // User profile getters
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

    public boolean isApiLimitWarningDisplayed() {
        return apiLimitIndicator.isVisible();
    }

    // Follower interaction methods
    public int getFollowerItemsCount() {
        return followerItems.count();
    }

    public void clickFollowerAtIndex(int index) {
        followerItems.nth(index).click();
    }

    public List<String> getAllFollowerAvatarSources() {
        return followerAvatars.all().stream()
            .map(avatar -> avatar.getAttribute("src"))
            .toList();
    }
}