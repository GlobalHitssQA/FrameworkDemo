package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub Search functionality
 * Locators: REALES (extraídos con Playwright MCP)
 */
public class GitHubSearchPage {

    private Page page;
    
    // Locators reales extraídos de la página de GitHub
    private Locator homepageLink;
    private Locator signInLink;
    private Locator emailInput;
    private Locator signUpButton;

    public GitHubSearchPage(Page page) {
        this.page = page;
        // Locators reales de la homepage de GitHub
        this.homepageLink = page.locator("a[href='/']").first();
        this.signInLink = page.locator("a[href='/login']").first();
        this.emailInput = page.locator("input[placeholder='you@domain.com']").first();
        this.signUpButton = page.locator("button:has-text('Sign up for GitHub')").first();
    }

    public void navigateTo(String url) {
        page.navigate(url);
    }

    public void navigateToUserProfile(String username) {
        page.navigate("https://github.com/" + username);
    }

    public void clickHomepage() {
        homepageLink.click();
    }

    public void clickSignIn() {
        signInLink.click();
    }

    public void enterEmail(String email) {
        emailInput.fill(email);
    }

    public void clickSignUp() {
        signUpButton.click();
    }

    public boolean isSignInLinkVisible() {
        return signInLink.isVisible();
    }
}

---

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub 404 Not Found page
 * Locators: REALES (extraídos con Playwright MCP)
 */
public class GitHubNotFoundPage {

    private Page page;
    
    // Locators reales extraídos de la página 404 de GitHub
    private Locator notFoundImage;
    private Locator searchInput;
    private Locator searchButton;
    private Locator contactSupportLink;
    private Locator githubStatusLink;
    private Locator githubStatusTwitterLink;
    private Locator searchLabel;
    
    // Locators para verificar ausencia de elementos de perfil
    private Locator userAvatar;
    private Locator userProfileName;
    private Locator followersCount;
    private Locator followingCount;
    private Locator repositoriesSection;

    public GitHubNotFoundPage(Page page) {
        this.page = page;
        
        // Locators reales de la página 404 de GitHub
        this.notFoundImage = page.locator("img[alt*='404']");
        this.searchInput = page.locator("main input[type='text']");
        this.searchButton = page.locator("main button:has-text('Search')");
        this.contactSupportLink = page.locator("a[href='https://support.github.com?tags=dotcom-404']");
        this.githubStatusLink = page.locator("a[href='https://githubstatus.com']");
        this.githubStatusTwitterLink = page.locator("a[href='https://twitter.com/githubstatus']");
        this.searchLabel = page.locator("text=Find code, projects, and people on GitHub:");
        
        // Locators para elementos de perfil (que NO deberían estar presentes en 404)
        this.userAvatar = page.locator("img[alt^='@']");
        this.userProfileName = page.locator("h1[class*='vcard-names']");
        this.followersCount = page.locator("a[href*='tab=followers']");
        this.followingCount = page.locator("a[href*='tab=following']");
        this.repositoriesSection = page.locator("h2:has-text('Popular repositories')");
    }

    public String getPageTitle() {
        return page.title();
    }

    public boolean isNotFoundImageVisible() {
        return notFoundImage.isVisible();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public void clickSearch() {
        searchButton.click();
    }

    public boolean isContactSupportLinkVisible() {
        return contactSupportLink.isVisible();
    }

    public boolean isGithubStatusLinkVisible() {
        return githubStatusLink.isVisible();
    }

    public String getSearchLabelText() {
        return searchLabel.textContent();
    }

    // Métodos para verificar ausencia de elementos de perfil
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUserProfileNameVisible() {
        return userProfileName.isVisible();
    }

    public boolean isFollowersCountVisible() {
        return followersCount.isVisible();
    }

    public boolean isFollowingCountVisible() {
        return followingCount.isVisible();
    }

    public boolean isRepositoriesSectionVisible() {
        return repositoriesSection.isVisible();
    }
}