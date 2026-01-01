package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.LoadState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - basados en buenas prácticas y el contexto del proyecto
 * (La aplicación es un buscador personalizado de perfiles GitHub, no la página nativa de GitHub)
 */
public class GitHubProfileSearchPage {
    
    private Page page;
    
    // Locators inferidos para el componente de búsqueda
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    
    // Locators inferidos para el perfil del usuario
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    
    // Locators inferidos para métricas
    private Locator reposCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;
    
    // Locators inferidos para lista de seguidores
    private Locator followersList;
    private Locator apiLimitIndicator;
    
    // URL base de la aplicación
    private static final String BASE_URL = "https://github.com";

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Locators inferidos para búsqueda (aplicación personalizada)
        this.searchInput = page.locator("[data-testid='search-input'], #search-input, input[placeholder*='username'], input[type='search']");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit']:has(svg), button:has-text('Search'), .search-button");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert']");
        
        // Locators inferidos para perfil de usuario
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar, img[alt*='avatar'], img[alt*='@']");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-fullname, h1 span:first-child, .vcard-fullname");
        this.userName = page.locator("[data-testid='username'], .username, .vcard-username, h1 span:last-child");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .bio, [itemprop='description']");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, [itemprop='homeLocation']");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, [itemprop='worksFor']");
        this.userWebLink = page.locator("[data-testid='user-website'], .user-website, a[rel='nofollow']");
        
        // Locator real extraído de GitHub para el botón Follow
        this.followButton = page.locator("a:has-text('Follow'), [data-testid='follow-button'], button:has-text('Follow')");
        
        // Locators inferidos para métricas (dashboard)
        this.reposCount = page.locator("[data-testid='repos-count'], .repos-count, a[href*='repositories'] span");
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count, a[href*='followers']");
        this.followingCount = page.locator("[data-testid='following-count'], .following-count, a[href*='following']");
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count, a[href*='gists'] span");
        
        // Locators inferidos para lista de seguidores
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, ul.followers");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit'], .api-limit-indicator, .rate-limit-warning");
    }

    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public boolean isUsernameEntered(String expectedUsername) {
        String actualValue = searchInput.inputValue();
        return actualValue.equals(expectedUsername);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public boolean isProfileDisplayed() {
        return userFullName.isVisible() || userName.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.first().isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.first().isVisible();
    }

    public void clickFollowButton() {
        followButton.first().click();
    }

    public boolean followButtonOpensInNewTab() {
        String target = followButton.first().getAttribute("target");
        return "_blank".equals(target);
    }

    public String getFollowButtonHref() {
        return followButton.first().getAttribute("href");
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUsername() {
        return userName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public String getUserLocation() {
        return userLocation.textContent();
    }

    public String getFollowersCount() {
        return followersCount.textContent();
    }

    public String getFollowingCount() {
        return followingCount.textContent();
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followersList.locator("li, .follower-item").count();
    }
}