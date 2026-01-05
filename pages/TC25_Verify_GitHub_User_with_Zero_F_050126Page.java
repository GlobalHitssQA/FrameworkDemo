package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (basados en estructura típica de aplicaciones de búsqueda GitHub)
    private Locator searchInput;
    private Locator searchButton;
    private Locator repositoriesCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private Locator username;
    private Locator fullName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    private Locator followersList;
    private Locator requestsIndicator;
    private Locator errorMessage;

    public GitHubSearchPage(Page page) {
        this.page = page;
        
        // Selectores inferidos siguiendo convenciones de data-testid y estructura semántica
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username'], #search-username");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search'], button.search-btn");
        this.repositoriesCounter = page.locator("[data-testid='repositories-count'], .repos-count, #repos-counter");
        this.followersCounter = page.locator("[data-testid='followers-count'], .followers-count, #followers-counter");
        this.followingCounter = page.locator("[data-testid='following-count'], .following-count, #following-counter");
        this.gistsCounter = page.locator("[data-testid='gists-count'], .gists-count, #gists-counter");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar img, img.avatar");
        this.username = page.locator("[data-testid='username'], .username, #user-username");
        this.fullName = page.locator("[data-testid='full-name'], .full-name, #user-fullname");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, #bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, #location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, #company");
        this.userWebLink = page.locator("[data-testid='user-web-link'], .user-website, a.web-link");
        this.followButton = page.locator("[data-testid='follow-button'], button.follow-btn, #follow-button");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, #followers-container");
        this.requestsIndicator = page.locator("[data-testid='requests-indicator'], .requests-remaining, #api-requests");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-msg, #user-not-found");
    }

    public void navigateToSearchPage() {
        page.navigate("https://github.com");
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isRepositoriesCountVisible() {
        return repositoriesCounter.isVisible();
    }

    public boolean isFollowersCountVisible() {
        return followersCounter.isVisible();
    }

    public boolean isFollowingCountVisible() {
        return followingCounter.isVisible();
    }

    public boolean isGistsCountVisible() {
        return gistsCounter.isVisible();
    }

    public String getUsername() {
        return username.textContent();
    }

    public String getFullName() {
        return fullName.textContent();
    }

    public String getRepositoriesCount() {
        return repositoriesCounter.textContent();
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

    public String getBio() {
        return userBio.textContent();
    }

    public String getLocation() {
        return userLocation.textContent();
    }

    public String getCompany() {
        return userCompany.textContent();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessage() {
        return errorMessage.textContent();
    }

    public String getRequestsIndicator() {
        return requestsIndicator.textContent();
    }
}