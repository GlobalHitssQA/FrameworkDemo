package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {
    private Page page;
    
    // Locators - Inferidos basados en buenas prácticas
    private Locator searchInput;
    private Locator searchButton;
    private Locator repositoriesCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private Locator username;
    private Locator fullName;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator website;
    private Locator followButton;
    private Locator followersList;
    private Locator requestsIndicator;
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Selectores inferidos con data-testid y CSS estables
        this.searchInput = page.locator("[data-testid='github-username-input'], input[type='text'][placeholder*='username'], #github-search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label='Search'], button.search-btn");
        this.repositoriesCounter = page.locator("[data-testid='repos-count'], .repos-counter, #repos-metric");
        this.followersCounter = page.locator("[data-testid='followers-count'], .followers-counter, #followers-metric");
        this.followingCounter = page.locator("[data-testid='following-count'], .following-counter, #following-metric");
        this.gistsCounter = page.locator("[data-testid='gists-count'], .gists-counter, #gists-metric");
        this.userAvatar = page.locator("[data-testid='user-avatar'], img.avatar, .profile-avatar");
        this.username = page.locator("[data-testid='username'], .username, .profile-username");
        this.fullName = page.locator("[data-testid='full-name'], .full-name, .profile-name");
        this.biography = page.locator("[data-testid='user-bio'], .bio, .profile-bio");
        this.location = page.locator("[data-testid='user-location'], .location, .profile-location");
        this.company = page.locator("[data-testid='user-company'], .company, .profile-company");
        this.website = page.locator("[data-testid='user-website'], .website, .profile-website");
        this.followButton = page.locator("[data-testid='follow-button'], button.follow-btn");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, #followers-container");
        this.requestsIndicator = page.locator("[data-testid='api-requests'], .requests-indicator, #api-limit");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-msg, .user-not-found");
    }

    public void navigateToSearchComponent() {
        page.navigate("https://github.com");
        page.waitForLoadState();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        page.waitForTimeout(2000);
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public String getRepositoriesCount() {
        return repositoriesCounter.textContent().trim();
    }

    public String getFollowersCount() {
        return followersCounter.textContent().trim();
    }

    public String getFollowingCount() {
        return followingCounter.textContent().trim();
    }

    public String getGistsCount() {
        return gistsCounter.textContent().trim();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public String getUsername() {
        return username.textContent().trim();
    }

    public String getFullName() {
        return fullName.textContent().trim();
    }

    public String getBiography() {
        return biography.textContent().trim();
    }

    public String getLocation() {
        return location.textContent().trim();
    }

    public String getCompany() {
        return company.textContent().trim();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessage() {
        return errorMessage.textContent().trim();
    }

    public String getRequestsIndicator() {
        return requestsIndicator.textContent().trim();
    }
}