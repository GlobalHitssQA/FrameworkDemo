package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub Search Page
 * Locators: REALES (extraídos con Playwright MCP)
 */
public class GitHubSearchPage {
    
    private Page page;
    
    // Locators reales extraídos de GitHub
    private Locator searchInput;
    private Locator usersFilterLink;
    private Locator searchResultsHeading;
    private Locator firstUserResultLink;
    
    private static final String SEARCH_URL = "https://github.com/search";
    
    public GitHubSearchPage(Page page) {
        this.page = page;
        // Locator real: textbox con role "Search GitHub"
        this.searchInput = page.getByRole(com.microsoft.playwright.options.AriaRole.TEXTBOX, 
            new Page.GetByRoleOptions().setName("Search GitHub"));
        // Locator real: link con texto "Users" en la lista de filtros
        this.usersFilterLink = page.locator("a[href*='type=users']").first();
        // Locator real: heading de resultados
        this.searchResultsHeading = page.locator("h2[class*='results']");
        // Locator real: primer resultado de usuario (link al perfil)
        this.firstUserResultLink = page.locator("div[data-testid='results-list'] a[href^='/']:not([href*='login'])").first();
    }
    
    public void navigateToSearchPage() {
        page.navigate(SEARCH_URL);
        page.waitForLoadState();
    }
    
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }
    
    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }
    
    public String getSearchInputValue() {
        return searchInput.inputValue();
    }
    
    public void submitSearch() {
        searchInput.press("Enter");
        page.waitForLoadState();
    }
    
    public void clickUsersFilter() {
        // Locator real: link con texto "Users" y contador de resultados
        page.locator("a").filter(new Locator.FilterOptions().setHasText("Users")).first().click();
        page.waitForLoadState();
    }
    
    public boolean isUsersResultsVisible() {
        return page.locator("h1:has-text('users Search Results')").isVisible() ||
               page.url().contains("type=users");
    }
    
    public void clickFirstUserResult() {
        // Locator real: primer link de usuario en los resultados
        // Basado en la estructura: heading con nombre y username
        page.locator("h3 a[href^='/']").first().click();
        page.waitForLoadState();
    }
}

/**
 * Page Object for GitHub User Profile Page
 * Locators: REALES (extraídos con Playwright MCP)
 */
class GitHubProfilePage {
    
    private Page page;
    
    // Locators reales extraídos del perfil de GitHub
    private Locator userAvatar;
    private Locator fullNameHeading;
    private Locator usernameSpan;
    private Locator bioElement;
    private Locator locationElement;
    private Locator organizationElement;
    private Locator followersLink;
    private Locator followingLink;
    private Locator repositoriesLink;
    private Locator followButton;
    private Locator blogLink;
    
    public GitHubProfilePage(Page page) {
        this.page = page;
        // Locator real: avatar del usuario con alt text descriptivo
        this.userAvatar = page.locator("img[alt*='View'][alt*='avatar']");
        // Locator real: heading h1 con nombre completo (estructura: h1 > span.vcard-fullname)
        this.fullNameHeading = page.locator("h1[class*='vcard-names'] span").first();
        // Locator real: username en el heading (segundo span)
        this.usernameSpan = page.locator("h1[class*='vcard-names'] span").nth(1);
        // Locator real: biografía del usuario
        this.bioElement = page.locator("div[data-bio-text]");
        // Locator real: ubicación en listitem con "Home location"
        this.locationElement = page.locator("li[itemprop='homeLocation'], li:has-text('Portland')");
        // Locator real: organización en listitem
        this.organizationElement = page.locator("li[itemprop='worksFor'], li:has-text('Organization')");
        // Locator real: link de followers con contador
        this.followersLink = page.locator("a[href*='tab=followers']");
        // Locator real: link de following
        this.followingLink = page.locator("a[href*='tab=following']");
        // Locator real: link de repositorios con contador
        this.repositoriesLink = page.locator("a[href*='tab=repositories']");
        // Locator real: botón Follow
        this.followButton = page.locator("a:has-text('Follow'), button:has-text('Follow')").first();
        // Locator real: link del blog/website
        this.blogLink = page.locator("a[rel='nofollow me']");
    }
    
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }
    
    public String getFullName() {
        // Locator real extraído: span con clase vcard-fullname dentro de h1
        Locator nameLocator = page.locator("h1 span").first();
        if (nameLocator.isVisible()) {
            return nameLocator.textContent().trim();
        }
        return null;
    }
    
    public String getUsername() {
        // Locator real extraído: span con el username después del nombre
        Locator usernameLocator = page.locator("h1 span").nth(1);
        if (usernameLocator.isVisible()) {
            return usernameLocator.textContent().trim();
        }
        return null;
    }
    
    public String getBio() {
        if (bioElement.isVisible()) {
            return bioElement.textContent().trim();
        }
        return null;
    }
    
    public boolean isLocationVisible() {
        // Verifica si el elemento de ubicación está visible
        return page.locator("li:has(svg) span").filter(
            new Locator.FilterOptions().setHasText("Portland")).isVisible() ||
            page.locator("[itemprop='homeLocation']").isVisible();
    }
    
    public String getLocation() {
        Locator loc = page.locator("li[itemprop='homeLocation'] span, li:has-text('Portland') span");
        if (loc.isVisible()) {
            return loc.textContent().trim();
        }
        return null;
    }
    
    public boolean isOrganizationVisible() {
        // Locator real: listitem con "Organization" en el aria-label
        return page.locator("li:has-text('Linux Foundation'), li[itemprop='worksFor']").isVisible();
    }
    
    public String getOrganization() {
        Locator org = page.locator("li[itemprop='worksFor'] span, li:has-text('Linux Foundation') span");
        if (org.isVisible()) {
            return org.textContent().trim();
        }
        return null;
    }
    
    public boolean isFollowersCountVisible() {
        return followersLink.isVisible();
    }
    
    public String getFollowersCount() {
        // Locator real: link con "followers" y contador (ej: "269k followers")
        if (followersLink.isVisible()) {
            return followersLink.textContent().trim();
        }
        return null;
    }
    
    public boolean isFollowingCountVisible() {
        return followingLink.isVisible();
    }
    
    public String getFollowingCount() {
        if (followingLink.isVisible()) {
            return followingLink.textContent().trim();
        }
        return null;
    }
    
    public boolean isRepositoriesCountVisible() {
        return repositoriesLink.isVisible();
    }
    
    public String getRepositoriesCount() {
        // Locator real: link "Repositories 9" en la navegación
        if (repositoriesLink.isVisible()) {
            String text = repositoriesLink.textContent();
            // Extraer solo el número
            return text.replaceAll("[^0-9]", "");
        }
        return null;
    }
    
    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }
    
    public void clickFollowButton() {
        followButton.click();
    }
    
    public boolean isBlogLinkVisible() {
        return blogLink.isVisible();
    }
    
    public String getBlogUrl() {
        if (blogLink.isVisible()) {
            return blogLink.getAttribute("href");
        }
        return null;
    }
}