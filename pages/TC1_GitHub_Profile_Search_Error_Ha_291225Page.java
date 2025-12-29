package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search component.
 * LOCATORS: INFERIDOS - Basados en buenas prácticas de nomenclatura.
 * La URL real del componente personalizado no estaba disponible para extracción.
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS basados en buenas prácticas
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator userAvatar;
    private Locator userName;
    private Locator userUsername;
    private Locator userBio;
    private Locator reposCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;
    private Locator followersList;
    private Locator apiRequestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search components - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-username-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Error state - INFERIDOS
        this.errorMessage = page.locator("[data-testid='error-message']");

        // Profile information - INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");

        // Metrics - INFERIDOS
        this.reposCount = page.locator("[data-testid='repos-count']");
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.followingCount = page.locator("[data-testid='following-count']");
        this.gistsCount = page.locator("[data-testid='gists-count']");

        // Additional elements - INFERIDOS
        this.followersList = page.locator("[data-testid='followers-list']");
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
    }

    // Navigation methods
    public void navigateToProfileFinder() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search interaction methods
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        // Wait for API response
        page.waitForTimeout(2000);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    // Visibility check methods
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUserNameVisible() {
        return userName.isVisible();
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

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    // Text retrieval methods
    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public String getUserNameText() {
        return userName.textContent();
    }

    public String getUserUsernameText() {
        return userUsername.textContent();
    }

    public String getUserBioText() {
        return userBio.textContent();
    }

    public String getReposCountText() {
        return reposCount.textContent();
    }

    public String getFollowersCountText() {
        return followersCount.textContent();
    }

    public String getFollowingCountText() {
        return followingCount.textContent();
    }

    public String getGistsCountText() {
        return gistsCount.textContent();
    }

    // Wait methods
    public void waitForErrorMessage() {
        errorMessage.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
}