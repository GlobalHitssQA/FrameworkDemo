package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators are INFERRED based on best practices for a custom GitHub profile search application
 */
public class GitHubProfileSearchPage {

    private Page page;
    
    // Base URL - inferido para componente de búsqueda de perfiles GitHub
    private static final String BASE_URL = "https://github.com";
    
    // Locators - INFERIDOS (aplicación personalizada de búsqueda de perfiles GitHub)
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileContainer;
    private Locator followersListContainer;
    private Locator followerItems;
    private Locator followerAvatars;
    private Locator followerUsernames;
    private Locator followerProfileLinks;
    private Locator mainProfileSection;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search component locators - inferidos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Profile section locators - inferidos
        this.profileContainer = page.locator("[data-testid='profile-container']");
        this.mainProfileSection = page.locator("[data-testid='main-profile-section']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userBio = page.locator("[data-testid='user-bio']");
        
        // Followers list locators - inferidos
        this.followersListContainer = page.locator("[data-testid='followers-list-container']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatars = page.locator("[data-testid='follower-avatar']");
        this.followerUsernames = page.locator("[data-testid='follower-username']");
        this.followerProfileLinks = page.locator("[data-testid='follower-profile-link']");
        
        // Error message locator - inferido
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    public void navigate() {
        page.navigate(BASE_URL);
    }

    public void navigateToUrl(String url) {
        page.navigate(url);
    }

    public boolean isSearchComponentVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        profileContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean isFollowersListVisible() {
        return followersListContainer.isVisible();
    }

    public boolean isFollowersListInRightSection() {
        String position = followersListContainer.evaluate(
            "el => getComputedStyle(el).position").toString();
        Double left = (Double) followersListContainer.evaluate(
            "el => el.getBoundingClientRect().left");
        Double windowWidth = (Double) page.evaluate("window.innerWidth");
        return left > windowWidth / 2;
    }

    public boolean areFollowerAvatarsDisplayed() {
        return followerAvatars.count() > 0 && followerAvatars.first().isVisible();
    }

    public boolean areFollowerUsernamesDisplayed() {
        return followerUsernames.count() > 0 && followerUsernames.first().isVisible();
    }

    public boolean areFollowerProfileLinksDisplayed() {
        return followerProfileLinks.count() > 0 && followerProfileLinks.first().isVisible();
    }

    public boolean isFollowersListScrollable() {
        Object result = followersListContainer.evaluate(
            "el => el.scrollHeight > el.clientHeight");
        return Boolean.TRUE.equals(result);
    }

    public String getFollowersListScrollPosition() {
        return followersListContainer.evaluate("el => el.scrollTop").toString();
    }

    public void scrollFollowersListDown() {
        followersListContainer.evaluate("el => el.scrollBy(0, 300)");
        page.waitForTimeout(500);
    }

    public void scrollFollowersListToTop() {
        followersListContainer.evaluate("el => el.scrollTo(0, 0)");
        page.waitForTimeout(500);
    }

    public boolean isMainProfileSectionVisible() {
        return mainProfileSection.isVisible();
    }

    public String getFirstFollowerProfileUrl() {
        return followerProfileLinks.first().getAttribute("href");
    }

    public void clickFirstFollowerProfileLink() {
        followerProfileLinks.first().click();
        page.waitForLoadState();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public int getFollowersCount() {
        return followerItems.count();
    }

    public Locator getFollowerItemAt(int index) {
        return followerItems.nth(index);
    }

    public String getFollowerUsernameAt(int index) {
        return followerUsernames.nth(index).textContent();
    }

    public String getFollowerAvatarSrcAt(int index) {
        return followerAvatars.nth(index).getAttribute("src");
    }

    public void waitForFollowersList() {
        followersListContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }
}