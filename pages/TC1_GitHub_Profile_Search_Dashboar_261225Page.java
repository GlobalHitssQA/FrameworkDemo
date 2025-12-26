package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (aplicación personalizada - no extraídos de página real)
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS basados en buenas prácticas para aplicación personalizada
    private Locator searchInput;
    private Locator searchButton;
    private Locator loadingIndicator;
    private Locator profileContainer;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator apiRequestsIndicator;
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initLocators();
    }

    private void initLocators() {
        // Search components - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Loading state - INFERIDO
        this.loadingIndicator = page.locator("[data-testid='loading-indicator']");
        
        // Profile container - INFERIDO
        this.profileContainer = page.locator("[data-testid='profile-container']");
        
        // Metrics counters - INFERIDOS
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
        
        // User profile elements - INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        
        // API requests indicator - INFERIDO
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
        
        // Error message - INFERIDO
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    // Navigation methods
    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search input methods
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchInputEnabled() {
        return searchInput.isEnabled();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    // Search button methods
    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    // Loading indicator methods
    public boolean isLoadingIndicatorVisible() {
        return loadingIndicator.isVisible();
    }

    public void waitForLoadingToDisappear() {
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
    }

    // Profile data methods
    public void waitForProfileDataToLoad() {
        profileContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isProfileDataLoaded() {
        return profileContainer.isVisible();
    }

    // Repos counter methods
    public boolean isReposCounterVisible() {
        return reposCounter.isVisible();
    }

    public String getReposCounterValue() {
        return reposCounter.textContent().trim();
    }

    // Followers counter methods
    public boolean isFollowersCounterVisible() {
        return followersCounter.isVisible();
    }

    public String getFollowersCounterValue() {
        return followersCounter.textContent().trim();
    }

    // Following counter methods
    public boolean isFollowingCounterVisible() {
        return followingCounter.isVisible();
    }

    public String getFollowingCounterValue() {
        return followingCounter.textContent().trim();
    }

    // Gists counter methods
    public boolean isGistsCounterVisible() {
        return gistsCounter.isVisible();
    }

    public String getGistsCounterValue() {
        return gistsCounter.textContent().trim();
    }

    // User profile element methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    public boolean isUserNameVisible() {
        return userName.isVisible();
    }

    public String getUserNameText() {
        return userName.textContent().trim();
    }

    public boolean isUserBioVisible() {
        return userBio.isVisible();
    }

    public String getUserBioText() {
        return userBio.textContent().trim();
    }

    public boolean isUserLocationVisible() {
        return userLocation.isVisible();
    }

    public String getUserLocationText() {
        return userLocation.textContent().trim();
    }

    public boolean isUserCompanyVisible() {
        return userCompany.isVisible();
    }

    public String getUserCompanyText() {
        return userCompany.textContent().trim();
    }

    // API requests indicator methods
    public boolean isApiRequestsIndicatorVisible() {
        return apiRequestsIndicator.isVisible();
    }

    public String getApiRequestsIndicatorText() {
        return apiRequestsIndicator.textContent().trim();
    }

    // Error message methods
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }
}