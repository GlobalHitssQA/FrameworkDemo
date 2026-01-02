package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * LOCATORS: inferidos - Esta es una aplicación personalizada de búsqueda de perfiles GitHub
 * que consume la API de GitHub, no el sitio github.com directamente
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Component Locators (inferidos)
    private Locator searchInput;
    private Locator searchButton;

    // Profile Section Locators (inferidos)
    private Locator profileSection;
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator websiteLink;
    private Locator followButton;

    // Metrics Locators (inferidos)
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // API Status Locators (inferidos)
    private Locator apiRequestsIndicator;

    // Error Message Locator (inferido)
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Component - inferidos basados en buenas prácticas
        this.searchInput = page.locator("[data-testid='username-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Profile Section - inferidos
        this.profileSection = page.locator("[data-testid='profile-section']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.fullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.biography = page.locator("[data-testid='user-biography']");
        this.location = page.locator("[data-testid='user-location']");
        this.company = page.locator("[data-testid='user-company']");
        this.websiteLink = page.locator("[data-testid='user-website-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Counters - inferidos
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // API Status - inferido
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");

        // Error Message - inferido
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    // Navigation Methods
    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search Methods
    public void enterUsername(String usernameText) {
        searchInput.clear();
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void searchForUser(String usernameText) {
        enterUsername(usernameText);
        clickSearchButton();
    }

    // Wait Methods
    public void waitForProfileToLoad() {
        profileSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public void waitForErrorMessage() {
        errorMessage.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
    }

    // Visibility Methods
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
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

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public boolean isFollowButtonEnabled() {
        return followButton.isEnabled();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    // Getter Methods
    public String getFullName() {
        return fullName.textContent();
    }

    public String getUsername() {
        return username.textContent();
    }

    public String getBiography() {
        return biography.textContent();
    }

    public String getLocation() {
        return location.textContent();
    }

    public String getCompany() {
        return company.textContent();
    }

    public String getWebsiteLink() {
        return websiteLink.getAttribute("href");
    }

    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
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

    public String getApiRequestsStatus() {
        return apiRequestsIndicator.textContent();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Click Methods
    public void clickFollowButton() {
        followButton.click();
    }

    public void clickWebsiteLink() {
        websiteLink.click();
    }
}