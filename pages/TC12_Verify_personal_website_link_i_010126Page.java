package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.options.LoadState;

public class GitHubProfileSearchPage {

    private Page page;
    
    // Locators inferidos para el componente de búsqueda (aplicación custom)
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchComponent;
    
    // Locators reales extraídos de GitHub con Playwright
    private Locator profileContainer;
    private Locator personalDetailsSection;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userBio;
    private Locator websiteLink;
    private Locator followersLink;
    private Locator followingLink;

    private static final String BASE_URL = "https://github.com";

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Locators INFERIDOS para el componente de búsqueda personalizado
        this.searchInput = page.locator("[data-testid='search-input']"); // inferido
        this.searchButton = page.locator("[data-testid='search-button']"); // inferido
        this.searchComponent = page.locator("[data-testid='github-profile-search']"); // inferido
        
        // Locators REALES extraídos de la página de perfil de GitHub
        this.profileContainer = page.locator("main"); // real
        this.personalDetailsSection = page.locator("main >> div.Layout-sidebar").first(); // real
        this.userAvatar = page.locator("img[alt^='View'][alt$='full-sized avatar']"); // real
        this.userFullName = page.locator("h1.vcard-names span[itemprop='name']"); // real - alternativa basada en estructura
        this.userBio = page.locator("div.user-profile-bio div"); // real
        this.websiteLink = page.locator("ul.vcard-details li:has(svg.octicon-link) a"); // real
        this.followersLink = page.locator("a:has-text('followers')"); // real
        this.followingLink = page.locator("a:has-text('following')"); // real
    }

    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
        page.waitForLoadState(LoadState.DOMCONTENTLOADED);
    }

    public boolean isSearchComponentDisplayed() {
        return searchComponent.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public boolean isProfileLoaded() {
        return profileContainer.isVisible();
    }

    public boolean isPersonalDetailsSectionVisible() {
        return personalDetailsSection.isVisible();
    }

    public boolean isWebsiteLinkVisible() {
        return websiteLink.isVisible();
    }

    public String getWebsiteLinkUrl() {
        return websiteLink.getAttribute("href");
    }

    public String getWebsiteLinkText() {
        return websiteLink.textContent();
    }

    public void clickWebsiteLink() {
        websiteLink.click();
    }

    public Page waitForNewTab(BrowserContext context) {
        Page newPage = context.waitForPage(() -> {
            websiteLink.click();
        });
        newPage.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return newPage;
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getFollowersCount() {
        return followersLink.textContent();
    }

    public String getFollowingCount() {
        return followingLink.textContent();
    }
}