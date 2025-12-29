package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * LOCATORS: inferidos - basados en buenas prácticas de testing y convenciones semánticas
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github-profile-search.example.com";

    // Search Section Locators (inferidos)
    private Locator searchInput;
    private Locator searchButton;

    // Profile Section Locators (inferidos)
    private Locator userProfileContainer;
    private Locator userAvatar;
    private Locator userName;
    private Locator userUsername;
    private Locator userBio;

    // Metrics Locators (inferidos)
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // Followers Section Locators (inferidos)
    private Locator followersSection;
    private Locator followersListContainer;
    private Locator followerItems;
    private Locator followerAvatars;
    private Locator followerUsernames;
    private Locator followerProfileLinks;

    // API Status Locator (inferido)
    private Locator apiStatusIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Section - inferidos con data-testid semánticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Profile Section - inferidos
        this.userProfileContainer = page.locator("[data-testid='user-profile-container']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");

        // Metrics Section - inferidos
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");

        // Followers Section - inferidos
        this.followersSection = page.locator("[data-testid='followers-section']");
        this.followersListContainer = page.locator("[data-testid='followers-list-container']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatars = page.locator("[data-testid='follower-item'] [data-testid='follower-avatar']");
        this.followerUsernames = page.locator("[data-testid='follower-item'] [data-testid='follower-username']");
        this.followerProfileLinks = page.locator("[data-testid='follower-item'] [data-testid='follower-profile-link']");

        // API Status - inferido
        this.apiStatusIndicator = page.locator("[data-testid='api-status-indicator']");
    }

    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void navigateBack() {
        page.goBack();
        page.waitForLoadState();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isApiAvailable() {
        return apiStatusIndicator.isVisible() && 
               !apiStatusIndicator.textContent().contains("limit");
    }

    public void enterSearchQuery(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        userProfileContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean isUserProfileDisplayed() {
        return userProfileContainer.isVisible() && 
               userAvatar.isVisible() && 
               userName.isVisible();
    }

    public boolean isFollowersSectionVisible() {
        return followersSection.isVisible() && 
               followersListContainer.isVisible();
    }

    public boolean isFollowersListVerticallyAligned() {
        // Verificar que la lista está en la sección derecha y alineada verticalmente
        String containerDisplay = followersListContainer.evaluate(
            "el => window.getComputedStyle(el).display").toString();
        String flexDirection = followersListContainer.evaluate(
            "el => window.getComputedStyle(el).flexDirection").toString();
        
        return containerDisplay.contains("flex") || 
               containerDisplay.contains("block") || 
               flexDirection.contains("column");
    }

    public boolean areAllFollowerAvatarsVisible() {
        int followerCount = followerItems.count();
        if (followerCount == 0) return false;
        
        for (int i = 0; i < followerCount; i++) {
            Locator avatar = followerItems.nth(i).locator("[data-testid='follower-avatar']");
            if (!avatar.isVisible()) {
                return false;
            }
            // Verificar que la imagen se cargó correctamente
            Boolean isLoaded = (Boolean) avatar.evaluate(
                "img => img.complete && img.naturalHeight !== 0");
            if (!isLoaded) {
                return false;
            }
        }
        return true;
    }

    public boolean areAllFollowerUsernamesVisible() {
        int followerCount = followerItems.count();
        if (followerCount == 0) return false;
        
        for (int i = 0; i < followerCount; i++) {
            Locator username = followerItems.nth(i).locator("[data-testid='follower-username']");
            if (!username.isVisible() || username.textContent().trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean doAllFollowersHaveProfileLinks() {
        int followerCount = followerItems.count();
        if (followerCount == 0) return false;
        
        for (int i = 0; i < followerCount; i++) {
            Locator link = followerItems.nth(i).locator("[data-testid='follower-profile-link']");
            if (!link.isVisible()) {
                return false;
            }
            String href = link.getAttribute("href");
            if (href == null || href.isEmpty() || !href.contains("github.com")) {
                return false;
            }
        }
        return true;
    }

    public String getFirstFollowerUsername() {
        return followerItems.first()
            .locator("[data-testid='follower-username']")
            .textContent()
            .trim();
    }

    public void clickOnFirstFollowerLink() {
        followerItems.first()
            .locator("[data-testid='follower-profile-link']")
            .click();
        page.waitForLoadState();
    }

    public boolean isOnFollowerProfilePage(String followerUsername) {
        String currentUrl = page.url();
        return currentUrl.contains("github.com/" + followerUsername);
    }

    public boolean isFollowersListScrollable() {
        // Verificar que el contenedor tiene overflow scroll/auto
        String overflowY = followersListContainer.evaluate(
            "el => window.getComputedStyle(el).overflowY").toString();
        
        // Verificar que el contenido excede el contenedor
        Double scrollHeight = (Double) followersListContainer.evaluate(
            "el => el.scrollHeight");
        Double clientHeight = (Double) followersListContainer.evaluate(
            "el => el.clientHeight");
        
        boolean hasScrollableOverflow = overflowY.equals("scroll") || 
                                         overflowY.equals("auto");
        boolean contentExceedsContainer = scrollHeight > clientHeight;
        
        return hasScrollableOverflow && contentExceedsContainer;
    }

    public boolean canScrollFollowersList() {
        // Obtener posición inicial del scroll
        Double initialScrollTop = (Double) followersListContainer.evaluate(
            "el => el.scrollTop");
        
        // Realizar scroll hacia abajo
        followersListContainer.evaluate("el => el.scrollTop = el.scrollTop + 100");
        
        // Pequeña espera para que el scroll se aplique
        page.waitForTimeout(300);
        
        // Obtener nueva posición
        Double newScrollTop = (Double) followersListContainer.evaluate(
            "el => el.scrollTop");
        
        // Verificar que el scroll funcionó
        boolean scrollWorked = newScrollTop > initialScrollTop;
        
        // Realizar scroll hacia arriba para verificar bidireccionalidad
        followersListContainer.evaluate("el => el.scrollTop = 0");
        page.waitForTimeout(300);
        
        Double finalScrollTop = (Double) followersListContainer.evaluate(
            "el => el.scrollTop");
        
        boolean scrollBackWorked = finalScrollTop < newScrollTop;
        
        return scrollWorked && scrollBackWorked;
    }

    // Métodos adicionales de utilidad
    public int getFollowersCount() {
        String countText = followersCounter.textContent().trim();
        return Integer.parseInt(countText.replaceAll("[^0-9]", ""));
    }

    public int getDisplayedFollowersCount() {
        return followerItems.count();
    }

    public String getUserFullName() {
        return userName.textContent().trim();
    }

    public String getUserUsername() {
        return userUsername.textContent().trim();
    }
}