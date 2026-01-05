package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubProfileSearchPage {
    private Page page;
    
    // Locators - inferidos basados en buenas prácticas y elementos UI comunes
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator repoCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;
    private Locator userLocation;
    private Locator userCompany;
    private Locator requestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        // Locators inferidos con selectores robustos
        this.searchInput = page.locator("input[data-testid='search-input'], input[placeholder*='username'], input[type='text'][name='username'], #search-input");
        this.searchButton = page.locator("button[data-testid='search-button'], button[type='submit'], button:has-text('Search'), .search-button");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert'], .alert-error, .error-text");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar, img[alt*='avatar']");
        this.userName = page.locator("[data-testid='user-name'], .user-name, h1.name, .profile-name");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .bio, p.bio");
        this.repoCount = page.locator("[data-testid='repo-count'], .repo-count, #repositories-count");
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count, #followers-count");
        this.followingCount = page.locator("[data-testid='following-count'], .following-count, #following-count");
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count, #gists-count");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, .location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, .company");
        this.requestsIndicator = page.locator("[data-testid='requests-indicator'], .requests-indicator, .api-limit");
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean isUserProfileDisplayed() {
        return userAvatar.isVisible() && userName.isVisible();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public String getRepoCount() {
        return repoCount.textContent();
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

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getLocationText() {
        return userLocation.textContent();
    }

    public String getCompanyText() {
        return userCompany.textContent();
    }

    public String getRequestsIndicator() {
        return requestsIndicator.textContent();
    }

    public void waitForSearchResults() {
        page.waitForTimeout(2000);
    }
}