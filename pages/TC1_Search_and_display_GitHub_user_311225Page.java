package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (basados en buenas prácticas de desarrollo frontend)
 * La aplicación descrita es un buscador personalizado de perfiles GitHub,
 * no la página nativa de GitHub.
 */
public class GitHubProfileSearchPage {

    private final Page page;

    // Search Section Locators (inferidos)
    private final Locator searchInput;
    private final Locator searchButton;

    // Dashboard Metrics Locators (inferidos)
    private final Locator reposCounter;
    private final Locator followersCounter;
    private final Locator followingCounter;
    private final Locator gistsCounter;

    // Profile Section Locators (inferidos)
    private final Locator userAvatar;
    private final Locator fullName;
    private final Locator username;
    private final Locator biography;
    private final Locator location;
    private final Locator company;
    private final Locator webLink;
    private final Locator followButton;

    // Followers List Locators (inferidos)
    private final Locator followersList;
    private final Locator followerItems;
    private final Locator firstFollowerAvatar;
    private final Locator firstFollowerUsername;
    private final Locator firstFollowerLink;

    // API Counter Locator (inferido)
    private final Locator apiRequestCounter;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;

        // Search Section - locators inferidos con data-testid semánticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Dashboard Metrics - locators inferidos
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // Profile Section - locators inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.fullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.biography = page.locator("[data-testid='user-biography']");
        this.location = page.locator("[data-testid='user-location']");
        this.company = page.locator("[data-testid='user-company']");
        this.webLink = page.locator("[data-testid='user-weblink']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Followers List - locators inferidos
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.firstFollowerAvatar = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-avatar']");
        this.firstFollowerUsername = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-username']");
        this.firstFollowerLink = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-link']");

        // API Counter - locator inferido
        this.apiRequestCounter = page.locator("[data-testid='api-request-counter']");
    }

    // Navigation
    public void navigateTo(String url) {
        page.navigate(url);
    }

    // Search Actions
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Search Section Visibility
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    // Dashboard Metrics Visibility
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

    // Dashboard Metrics Values
    public int getReposCount() {
        return parseCounter(reposCounter.textContent());
    }

    public int getFollowersCount() {
        return parseCounter(followersCounter.textContent());
    }

    public int getFollowingCount() {
        return parseCounter(followingCounter.textContent());
    }

    public int getGistsCount() {
        return parseCounter(gistsCounter.textContent());
    }

    private int parseCounter(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }
        String numericText = text.replaceAll("[^0-9]", "");
        return numericText.isEmpty() ? 0 : Integer.parseInt(numericText);
    }

    // Profile Section Visibility
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
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

    public boolean isWebLinkVisible() {
        return webLink.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    // Profile Section Text Getters
    public String getFullNameText() {
        return fullName.textContent();
    }

    public String getUsernameText() {
        return username.textContent();
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

    public String getWebLinkText() {
        return webLink.textContent();
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followerItems.count();
    }

    public boolean isFirstFollowerAvatarVisible() {
        return firstFollowerAvatar.isVisible();
    }

    public boolean isFirstFollowerUsernameVisible() {
        return firstFollowerUsername.isVisible();
    }

    public boolean isFirstFollowerLinkVisible() {
        return firstFollowerLink.isVisible();
    }

    // API Counter Methods
    public boolean isApiRequestCounterVisible() {
        return apiRequestCounter.isVisible();
    }

    public String getApiRequestCounterText() {
        return apiRequestCounter.textContent();
    }

    // Avatar Image Load Verification
    public boolean isAvatarImageLoaded() {
        return (Boolean) page.evaluate(
            "() => {" +
            "  const img = document.querySelector('[data-testid=\"user-avatar\"]');" +
            "  return img && img.complete && img.naturalHeight > 0;" +
            "}"
        );
    }

    // Follow Button Action
    public void clickFollowButton() {
        followButton.click();
    }

    // Scroll Followers List
    public void scrollFollowersList() {
        followersList.evaluate("el => el.scrollTop = el.scrollHeight");
    }
}