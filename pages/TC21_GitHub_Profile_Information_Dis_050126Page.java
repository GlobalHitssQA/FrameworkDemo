package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfilePage {
    private Page page;
    private static final String BASE_URL = "https://github.com";
    
    // Search section locators (inferidos)
    private Locator searchInput;
    private Locator searchButton;
    
    // Profile information locators (inferidos)
    private Locator avatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator webLink;
    private Locator followButton;
    private Locator leftSection;
    
    // Metrics locators (inferidos)
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search elements
        this.searchInput = page.locator("input[data-testid='search-input'], input[placeholder*='username'], input[type='text'][class*='search']");
        this.searchButton = page.locator("button[data-testid='search-button'], button:has-text('Search'), button[type='submit']");
        
        // Profile left section
        this.leftSection = page.locator("[data-testid='profile-left-section'], .profile-left-section, aside");
        this.avatar = page.locator("img[data-testid='user-avatar'], img[alt*='avatar'], .avatar img, img[class*='avatar']");
        this.fullName = page.locator("[data-testid='user-fullname'], .user-fullname, h1[class*='name'], .profile-name");
        this.username = page.locator("[data-testid='user-username'], .user-username, [class*='username']");
        this.biography = page.locator("[data-testid='user-bio'], .user-bio, p[class*='bio'], .profile-bio");
        this.location = page.locator("[data-testid='user-location'], .user-location, [class*='location']");
        this.company = page.locator("[data-testid='user-company'], .user-company, [class*='company']");
        this.webLink = page.locator("[data-testid='user-website'], a[class*='website'], a[class*='link']");
        this.followButton = page.locator("button[data-testid='follow-button'], button:has-text('Follow'), button[class*='follow']");
        
        // Metrics
        this.reposCounter = page.locator("[data-testid='repos-count'], .repos-count, [class*='repos']");
        this.followersCounter = page.locator("[data-testid='followers-count'], .followers-count, [class*='followers']");
        this.followingCounter = page.locator("[data-testid='following-count'], .following-count, [class*='following']");
        this.gistsCounter = page.locator("[data-testid='gists-count'], .gists-count, [class*='gists']");
    }

    public void navigateTo() {
        page.navigate(BASE_URL);
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        avatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean isAvatarVisible() {
        return avatar.isVisible();
    }

    public String getAvatarSource() {
        return avatar.getAttribute("src");
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }

    public String getFullName() {
        return fullName.textContent();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public String getUsername() {
        return username.textContent();
    }

    public boolean isBiographyVisible() {
        return biography.isVisible();
    }

    public String getBiography() {
        return biography.textContent();
    }

    public boolean isLocationSectionVisible() {
        return location.count() > 0;
    }

    public String getLocation() {
        return location.textContent();
    }

    public boolean isCompanySectionVisible() {
        return company.count() > 0;
    }

    public String getCompany() {
        return company.textContent();
    }

    public boolean isWebLinkSectionVisible() {
        return webLink.count() > 0;
    }

    public boolean hasWebLink() {
        return webLink.isVisible();
    }

    public boolean isWebLinkClickable() {
        return webLink.isEnabled();
    }

    public String getWebLink() {
        return webLink.getAttribute("href");
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public boolean isFollowButtonEnabled() {
        return followButton.isEnabled();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isLeftSectionDisplayed() {
        return leftSection.isVisible();
    }

    public boolean areFieldsProperlyAligned() {
        // Verificación básica de que los elementos están dentro del contenedor izquierdo
        return leftSection.locator("img[class*='avatar']").count() > 0 &&
               leftSection.locator("*:has-text('@')").count() > 0;
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
}