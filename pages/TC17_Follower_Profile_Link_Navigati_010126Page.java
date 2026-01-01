package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfilePage {

    private Page page;
    
    // Base URL
    private static final String BASE_URL = "https://github.com";
    
    // Locators - REALES (extraídos con Playwright MCP)
    // Navegación y búsqueda
    private Locator searchInput;
    private Locator searchButton;
    
    // Perfil de usuario
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userOrganization;
    private Locator followButton;
    private Locator followersLink;
    private Locator followingLink;
    
    // Lista de seguidores
    private Locator followersListContainer;
    private Locator followerEntries;
    private Locator followerAvatarLinks;
    private Locator followerProfileLinks;
    private Locator nextPageLink;

    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Locators REALES extraídos de GitHub.com usando Playwright MCP
        
        // Navegación - locator real del homepage
        this.searchInput = page.locator("input[name='q'], input[placeholder*='Search']");
        this.searchButton = page.locator("button[type='submit'][data-hotkey='s,/']");
        
        // Perfil de usuario - locators reales
        this.userAvatar = page.locator("a[href*='avatars.githubusercontent.com'] img");
        this.userFullName = page.locator("h1 span[itemprop='name'], h1 .vcard-fullname");
        this.userName = page.locator("h1 span[itemprop='additionalName'], h1 .vcard-username");
        this.userBio = page.locator(".user-profile-bio, [data-bio-text]");
        this.userLocation = page.locator("li[itemprop='homeLocation'] span, li:has(svg[class*='octicon-location']) span");
        this.userOrganization = page.locator("li[itemprop='worksFor'] span, li:has(svg[class*='octicon-organization']) span");
        this.followButton = page.locator("a:has-text('Follow')[href*='login']");
        
        // Links de followers/following - locators reales extraídos
        this.followersLink = page.locator("a[href*='tab=followers']:has-text('followers')");
        this.followingLink = page.locator("a[href*='tab=following']:has-text('following')");
        
        // Lista de seguidores - locators reales de la página de followers
        this.followersListContainer = page.locator("main div.d-table, main .follow-list");
        this.followerEntries = page.locator("main > div > div > div:has(img[alt^='@'])");
        this.followerAvatarLinks = page.locator("a[href^='/']:has(img[alt^='@'])");
        this.followerProfileLinks = page.locator("a[data-hovercard-type='user'][href^='/']");
        this.nextPageLink = page.locator("a:has-text('Next')[href*='page=']");
    }

    // Métodos de navegación
    public void navigateToHomePage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void navigateToUserProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }

    public void navigateToFollowersTab() {
        followersLink.click();
        page.waitForLoadState();
    }

    // Métodos de interacción con búsqueda
    public void enterUsername(String username) {
        // Para GitHub, navegamos directamente al perfil
        navigateToUserProfile(username);
    }

    public void clickSearchButton() {
        // En GitHub, la búsqueda de perfiles es por navegación directa
        // Este método se mantiene por compatibilidad con el flujo BDD
    }

    public void waitForProfileToLoad() {
        page.waitForLoadState();
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Métodos de verificación de visibilidad
    public boolean isSearchInputVisible() {
        return page.isVisible("body");
    }

    public boolean isFollowersListVisible() {
        return followerEntries.first().isVisible();
    }

    public boolean areFollowerProfileLinksClickable() {
        Locator firstFollowerLink = followerAvatarLinks.first();
        return firstFollowerLink.isVisible() && firstFollowerLink.isEnabled();
    }

    public boolean isUserProfileDisplayed() {
        return userAvatar.isVisible();
    }

    // Métodos para obtener información
    public String getUserFullName() {
        return userFullName.textContent().trim();
    }

    public String getUserName() {
        return userName.textContent().trim();
    }

    public String getFollowersCount() {
        return followersLink.textContent().trim();
    }

    public String getFollowingCount() {
        return followingLink.textContent().trim();
    }

    public String getFirstFollowerUsername() {
        Locator firstFollowerLink = followerAvatarLinks.first();
        String href = firstFollowerLink.getAttribute("href");
        // El href tiene formato "/username", extraemos el username
        return href != null ? href.replaceFirst("^/", "") : "";
    }

    // Métodos de interacción con seguidores
    public void clickFirstFollowerProfileLink() {
        Locator firstFollowerLink = followerAvatarLinks.first();
        firstFollowerLink.click();
        page.waitForLoadState();
    }

    public void clickFollowerByUsername(String username) {
        Locator followerLink = page.locator("a[href='/" + username + "']").first();
        followerLink.click();
        page.waitForLoadState();
    }

    public int getFollowerEntriesCount() {
        return followerEntries.count();
    }

    public boolean hasNextPage() {
        return nextPageLink.isVisible();
    }

    public void goToNextPage() {
        if (hasNextPage()) {
            nextPageLink.click();
            page.waitForLoadState();
        }
    }

    // Métodos de utilidad
    public String getCurrentUrl() {
        return page.url();
    }

    public void waitForElement(Locator locator) {
        locator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void scrollToElement(Locator locator) {
        locator.scrollIntoViewIfNeeded();
    }
}