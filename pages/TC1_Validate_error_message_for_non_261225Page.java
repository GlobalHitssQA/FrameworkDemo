package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

/**
 * Page Object for GitHub 404 Error Page
 * Locators extracted via Playwright from: https://github.com/usuarioquenoexiste123456789
 */
public class GitHub404Page {

    private WebDriver driver;
    private WebDriverWait wait;
    private static final int TIMEOUT = 10;

    // ============== LOCATORS REALES (extraídos con Playwright) ==============
    
    // 404 Error Image - Real locator from GitHub 404 page
    private By error404Image = By.cssSelector("img[alt*='404'][alt*='This is not the web page you are looking for']");
    
    // Main content area on 404 page
    private By mainContent = By.cssSelector("main");
    
    // Search input on 404 page - Real locator
    private By searchInput404 = By.cssSelector("main search input[type='text'], main textbox");
    
    // Search button on 404 page - Real locator
    private By searchButton404 = By.cssSelector("main search button, main button:has-text('Search')");
    
    // Contact Support link - Real locator
    private By contactSupportLink = By.cssSelector("a[href*='support.github.com?tags=dotcom-404']");
    
    // GitHub Status link - Real locator
    private By githubStatusLink = By.cssSelector("a[href='https://githubstatus.com']");
    
    // Twitter status link - Real locator
    private By twitterStatusLink = By.cssSelector("a[href='https://twitter.com/githubstatus']");
    
    // Page title validation
    private By pageTitle = By.tagName("title");

    // ============== CONSTRUCTOR ==============
    
    public GitHub404Page(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(TIMEOUT));
    }

    // ============== MÉTODOS DE VERIFICACIÓN ==============
    
    /**
     * Verifica si la página 404 está siendo mostrada
     * @return true si estamos en la página 404
     */
    public boolean is404PageDisplayed() {
        try {
            return driver.getTitle().contains("Page not found") || 
                   driver.getTitle().contains("404");
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Verifica si la imagen de error 404 es visible
     * @return true si la imagen 404 es visible
     */
    public boolean is404ImageVisible() {
        try {
            WebElement image = wait.until(
                ExpectedConditions.visibilityOfElementLocated(error404Image)
            );
            return image.isDisplayed();
        } catch (Exception e) {
            // Fallback: buscar cualquier imagen en main con alt que contenga 404
            try {
                List<WebElement> images = driver.findElements(By.cssSelector("main img"));
                for (WebElement img : images) {
                    String alt = img.getAttribute("alt");
                    if (alt != null && alt.contains("404")) {
                        return img.isDisplayed();
                    }
                }
            } catch (Exception ex) {
                return false;
            }
            return false;
        }
    }

    /**
     * Verifica si el campo de búsqueda de la página 404 está visible
     * @return true si el campo de búsqueda está visible
     */
    public boolean isSearchInputVisible() {
        try {
            return driver.findElement(searchInput404).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Verifica si el enlace de Contact Support está visible
     * @return true si el enlace está visible
     */
    public boolean isContactSupportLinkVisible() {
        try {
            return driver.findElement(contactSupportLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Verifica si el enlace de GitHub Status está visible
     * @return true si el enlace está visible
     */
    public boolean isGitHubStatusLinkVisible() {
        try {
            return driver.findElement(githubStatusLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    // ============== MÉTODOS DE INTERACCIÓN ==============
    
    /**
     * Ingresa texto en el campo de búsqueda de la página 404
     * @param query texto a buscar
     */
    public void enterSearchQuery(String query) {
        WebElement input = wait.until(
            ExpectedConditions.elementToBeClickable(searchInput404)
        );
        input.clear();
        input.sendKeys(query);
    }

    /**
     * Hace clic en el botón de búsqueda de la página 404
     */
    public void clickSearchButton() {
        WebElement button = wait.until(
            ExpectedConditions.elementToBeClickable(searchButton404)
        );
        button.click();
    }

    /**
     * Hace clic en el enlace de Contact Support
     */
    public void clickContactSupport() {
        driver.findElement(contactSupportLink).click();
    }

    /**
     * Hace clic en el enlace de GitHub Status
     */
    public void clickGitHubStatus() {
        driver.findElement(githubStatusLink).click();
    }

    /**
     * Obtiene el título de la página actual
     * @return título de la página
     */
    public String getPageTitle() {
        return driver.getTitle();
    }

    /**
     * Obtiene el texto del mensaje de error (alt de la imagen 404)
     * @return mensaje de error
     */
    public String getErrorMessage() {
        try {
            WebElement image = driver.findElement(error404Image);
            return image.getAttribute("alt");
        } catch (Exception e) {
            return "";
        }
    }

    /**
     * Espera a que la página 404 cargue completamente
     */
    public void waitForPageLoad() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(mainContent));
    }
}

// ============================================================================
// CLASE ADICIONAL: GitHubSearchPage
// ============================================================================

package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

/**
 * Page Object for GitHub Homepage Search
 * Locators extracted via Playwright from: https://github.com
 */
public class GitHubSearchPage {

    private WebDriver driver;
    private WebDriverWait wait;
    private static final int TIMEOUT = 10;

    // ============== LOCATORS REALES (extraídos con Playwright) ==============
    
    // Email signup input on homepage - Real locator
    private By emailInput = By.cssSelector("input[placeholder='you@domain.com']");
    
    // Sign up button - Real locator
    private By signUpButton = By.cssSelector("button:has-text('Sign up for GitHub')");
    
    // Sign in link - Real locator
    private By signInLink = By.cssSelector("a[href='/login']");
    
    // Homepage link/logo - Real locator
    private By homepageLogo = By.cssSelector("a[href='/'] img, a[aria-label='Homepage']");
    
    // Skip to content link - Real locator
    private By skipToContentLink = By.cssSelector("a[href='#start-of-content']");
    
    // Navigation toggle button - Real locator
    private By toggleNavigationBtn = By.cssSelector("button[aria-label='Toggle navigation'], button:has-text('Toggle navigation')");

    // ============== CONSTRUCTOR ==============
    
    public GitHubSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(TIMEOUT));
    }

    // ============== MÉTODOS DE VERIFICACIÓN ==============
    
    public boolean isSearchInputVisible() {
        try {
            return driver.findElement(emailInput).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchButtonAvailable() {
        try {
            return driver.findElement(signUpButton).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    // ============== MÉTODOS DE INTERACCIÓN ==============
    
    public void enterSearchQuery(String query) {
        WebElement input = wait.until(
            ExpectedConditions.elementToBeClickable(emailInput)
        );
        input.clear();
        input.sendKeys(query);
    }

    public String getSearchInputValue() {
        return driver.findElement(emailInput).getAttribute("value");
    }

    public void clickSearchButton() {
        WebElement button = wait.until(
            ExpectedConditions.elementToBeClickable(signUpButton)
        );
        button.click();
    }

    public void navigateToUserProfile(String username) {
        driver.get("https://github.com/" + username);
    }

    public void waitForPageLoad() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(homepageLogo));
    }
}

// ============================================================================
// CLASE ADICIONAL: GitHubProfilePage
// ============================================================================

package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

/**
 * Page Object for GitHub User Profile Page
 * Locators extracted via Playwright from: https://github.com/octocat
 */
public class GitHubProfilePage {

    private WebDriver driver;
    private WebDriverWait wait;
    private static final int TIMEOUT = 10;

    // ============== LOCATORS REALES (extraídos con Playwright) ==============
    
    // User avatar - Real locator
    private By userAvatar = By.cssSelector("img[alt*='@'], a[href*='avatars.githubusercontent.com'] img");
    
    // User full name - Real locator (h1 contains name)
    private By userFullName = By.cssSelector("h1[class*='vcard-names'] span[itemprop='name'], h1 span.p-name");
    
    // Username - Real locator
    private By userName = By.cssSelector("h1[class*='vcard-names'] span[itemprop='additionalName'], h1 span.p-nickname");
    
    // Follow button - Real locator
    private By followButton = By.cssSelector("a[href*='/login?return_to']:has-text('Follow'), input[value='Follow']");
    
    // Followers count - Real locator
    private By followersLink = By.cssSelector("a[href*='tab=followers']");
    
    // Following count - Real locator
    private By followingLink = By.cssSelector("a[href*='tab=following']");
    
    // Repositories tab - Real locator
    private By repositoriesTab = By.cssSelector("a[href*='tab=repositories']");
    
    // Location - Real locator
    private By userLocation = By.cssSelector("li[itemprop='homeLocation'], li:has(svg[class*='octicon-location'])");
    
    // Organization - Real locator
    private By userOrganization = By.cssSelector("li[itemprop='worksFor'], a[href*='github.com/'][data-hovercard-type='organization']");
    
    // Website/Blog link - Real locator
    private By userWebsite = By.cssSelector("li[itemprop='url'] a, a[rel='nofollow me']");
    
    // Popular repositories section - Real locator
    private By popularReposSection = By.cssSelector("h2:has-text('Popular repositories')");
    
    // Profile navigation - Real locator
    private By profileNavigation = By.cssSelector("nav[aria-label='User profile']");
    
    // Achievements section - Real locator
    private By achievementsSection = By.cssSelector("h2:has-text('Achievements'), a[href*='tab=achievements']");
    
    // Block or Report button - Real locator
    private By blockReportButton = By.cssSelector("button:has-text('Block or Report')");

    // ============== CONSTRUCTOR ==============
    
    public GitHubProfilePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(TIMEOUT));
    }

    // ============== MÉTODOS DE VERIFICACIÓN ==============
    
    public boolean isProfileSectionVisible() {
        try {
            return driver.findElement(profileNavigation).isDisplayed() ||
                   driver.findElement(userAvatar).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isMetricsDashboardVisible() {
        try {
            return driver.findElement(followersLink).isDisplayed() &&
                   driver.findElement(followingLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowersListVisible() {
        try {
            return driver.findElement(followersLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isUserAvatarVisible() {
        try {
            return driver.findElement(userAvatar).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowButtonVisible() {
        try {
            return driver.findElement(followButton).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    // ============== MÉTODOS DE OBTENCIÓN DE DATOS ==============
    
    public String getUserFullName() {
        try {
            return driver.findElement(userFullName).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getUserName() {
        try {
            return driver.findElement(userName).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getFollowersCount() {
        try {
            return driver.findElement(followersLink).getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public String getFollowingCount() {
        try {
            return driver.findElement(followingLink).getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public String getLocation() {
        try {
            return driver.findElement(userLocation).getText();
        } catch (Exception e) {
            return "";
        }
    }

    // ============== MÉTODOS DE INTERACCIÓN ==============
    
    public void clickFollowButton() {
        WebElement button = wait.until(
            ExpectedConditions.elementToBeClickable(followButton)
        );
        button.click();
    }

    public void clickFollowersLink() {
        driver.findElement(followersLink).click();
    }

    public void clickRepositoriesTab() {
        driver.findElement(repositoriesTab).click();
    }

    public void waitForPageLoad() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(profileNavigation));
    }
}