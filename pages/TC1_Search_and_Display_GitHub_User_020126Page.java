package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * LOCATORS: INFERIDOS - Basados en buenas prácticas para una aplicación personalizada de búsqueda de perfiles GitHub
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Component Locators (INFERIDOS)
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;

    // Profile Section Locators (INFERIDOS)
    private Locator profileSection;
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator webLink;
    private Locator followButton;

    // Metrics Locators (INFERIDOS)
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // API Indicator (INFERIDO)
    private Locator apiRequestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Component - Locators inferidos usando data-testid y selectores semánticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");

        // Profile Section - Locators inferidos
        this.profileSection = page.locator("[data-testid='profile-section']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.fullName = page.locator("[data-testid='full-name']");
        this.username = page.locator("[data-testid='username']");
        this.biography = page.locator("[data-testid='biography']");
        this.location = page.locator("[data-testid='location']");
        this.company = page.locator("[data-testid='company']");
        this.webLink = page.locator("[data-testid='web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Counters - Locators inferidos
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // API Indicator - Locator inferido
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
    }

    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public void enterUsername(String usernameText) {
        searchInput.clear();
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForApiResponse() {
        profileSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean isProfileSectionVisible() {
        return profileSection.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public void checkBiographyVisibility() {
        // Biography is optional, so we just check if element exists
        if (biography.count() > 0) {
            biography.isVisible();
        }
    }

    public boolean isLocationVisible() {
        return location.isVisible();
    }

    public boolean isCompanyVisible() {
        return company.isVisible();
    }

    public void checkWebLinkVisibility() {
        // Web link is optional, so we just check if element exists
        if (webLink.count() > 0) {
            webLink.isVisible();
        }
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

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

    public String getReposCount() {
        return reposCounter.textContent();
    }

    public String getFollowersCount() {
        return followersCounter.textContent();
    }

    public String getFollowingCount() {
        return followingCounter.textContent();
    }

    public String getGistsCount() {
        return gistsCounter.textContent();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean isApiRequestsIndicatorVisible() {
        return apiRequestsIndicator.isVisible();
    }
}