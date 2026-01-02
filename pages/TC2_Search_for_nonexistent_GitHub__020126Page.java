package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (aplicación personalizada de búsqueda de perfiles GitHub)
    // La aplicación descrita en el contexto es un buscador personalizado que usa la API de GitHub
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator userAvatar;
    private Locator userName;
    private Locator userFullName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator metricsDashboard;
    private Locator reposCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;
    private Locator followersList;
    private Locator followButton;
    private Locator profileWebLink;
    private Locator requestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search component locators - inferidos basados en buenas prácticas
        this.searchInput = page.locator("[data-testid='username-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Error state locators
        this.errorMessage = page.locator("[data-testid='error-message']");
        
        // User profile locators
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='username']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        
        // Metrics dashboard locators
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard']");
        this.reposCount = page.locator("[data-testid='repos-count']");
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.followingCount = page.locator("[data-testid='following-count']");
        this.gistsCount = page.locator("[data-testid='gists-count']");
        
        // Followers list locators
        this.followersList = page.locator("[data-testid='followers-list']");
        
        // Action buttons and links
        this.followButton = page.locator("[data-testid='follow-button']");
        this.profileWebLink = page.locator("[data-testid='profile-web-link']");
        
        // API requests indicator
        this.requestsIndicator = page.locator("[data-testid='requests-indicator']");
    }

    // Navigation methods
    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search interaction methods
    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    // Visibility check methods
    public boolean isSearchComponentDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public boolean isUserAvatarDisplayed() {
        return userAvatar.isVisible();
    }

    public boolean isUserNameDisplayed() {
        return userName.isVisible();
    }

    public boolean isMetricsDashboardDisplayed() {
        return metricsDashboard.isVisible();
    }

    public boolean isFollowersListDisplayed() {
        return followersList.isVisible();
    }

    public boolean isBiographyDisplayed() {
        return userBio.isVisible();
    }

    // Text getter methods
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

    public String getUserCompany() {
        return userCompany.textContent();
    }

    // Metrics getter methods
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

    public String getRequestsIndicatorText() {
        return requestsIndicator.textContent();
    }

    // Action methods
    public void clickFollowButton() {
        followButton.click();
    }

    public void clickProfileWebLink() {
        profileWebLink.click();
    }

    // Wait methods
    public void waitForErrorMessage() {
        errorMessage.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
}