package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class GitHubProfilePage {

    private WebDriver driver;
    private WebDriverWait wait;

    // ============================================
    // LOCATORS - Extraídos via Playwright de github.com/torvalds
    // ============================================

    // Avatar - REAL: Extraído de la página de perfil de GitHub
    private By avatarImage = By.cssSelector("img[alt='View torvalds's full-sized avatar']");
    private By avatarLink = By.cssSelector("a[href*='avatars.githubusercontent.com']");
    private By avatarGeneric = By.cssSelector("img[alt*='@']"); // Patrón genérico para cualquier usuario

    // Nombre completo y username - REAL: heading level 1 con estructura específica
    private By profileHeading = By.cssSelector("h1[class*='vcard-names']");
    private By fullNameElement = By.cssSelector("h1 span[itemprop='name'], h1 span.p-name");
    private By usernameElement = By.cssSelector("h1 span[itemprop='additionalName'], h1 span.p-nickname");
    // Alternativa basada en estructura observada en Playwright
    private By fullNameAlt = By.xpath("//h1[contains(@class,'vcard-names')]//span[1]");
    private By usernameAlt = By.xpath("//h1[contains(@class,'vcard-names')]//span[2]");

    // Biografía - REAL: div con clase bio
    private By biographyElement = By.cssSelector("div[data-bio-text], div.p-note, div.user-profile-bio");

    // Ubicación - REAL: listitem con atributo "Home location"
    private By locationListItem = By.cssSelector("li[itemprop='homeLocation'], li[aria-label*='location']");
    private By locationText = By.xpath("//li[contains(@aria-label,'Home location')]//span");
    private By locationAlt = By.cssSelector("span[itemprop='homeLocation']");

    // Organización/Empresa - REAL: listitem con atributo "Organization"
    private By organizationListItem = By.cssSelector("li[itemprop='worksFor'], li[aria-label*='Organization']");
    private By organizationText = By.xpath("//li[contains(@aria-label,'Organization')]//span");
    private By organizationAlt = By.cssSelector("span[itemprop='worksFor']");

    // Enlace web personal - REAL: link con itemprop url
    private By websiteLink = By.cssSelector("a[itemprop='url'], li[itemprop='url'] a");
    private By websiteLinkAlt = By.cssSelector("a[rel='nofollow me'][href*='http']");

    // Botón Follow - REAL: Extraído de la página de perfil
    private By followButton = By.cssSelector("a[href*='login?return_to'][class*='follow'], button[name='commit'][value='Follow']");
    private By followButtonAlt = By.xpath("//a[contains(text(),'Follow') and contains(@href,'login')]");

    // Métricas (followers, following, repos) - REAL
    private By followersLink = By.cssSelector("a[href*='tab=followers']");
    private By followingLink = By.cssSelector("a[href*='tab=following']");
    private By repositoriesTab = By.cssSelector("a[href*='tab=repositories']");

    // ============================================
    // CONSTRUCTOR
    // ============================================

    public GitHubProfilePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // ============================================
    // MÉTODOS DE VERIFICACIÓN
    // ============================================

    public boolean isProfilePageLoaded() {
        try {
            wait.until(ExpectedConditions.or(
                ExpectedConditions.presenceOfElementLocated(profileHeading),
                ExpectedConditions.presenceOfElementLocated(avatarGeneric)
            ));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAvatarDisplayed() {
        try {
            return findElementWithFallback(avatarImage, avatarGeneric).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAvatarLoadedCorrectly() {
        try {
            WebElement avatar = findElementWithFallback(avatarImage, avatarGeneric);
            String src = avatar.getAttribute("src");
            return src != null && !src.isEmpty() && src.contains("avatars");
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isLocationDisplayed() {
        try {
            return findElementWithFallback(locationListItem, locationText, locationAlt).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isOrganizationDisplayed() {
        try {
            return findElementWithFallback(organizationListItem, organizationText, organizationAlt).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowButtonDisplayed() {
        try {
            return findElementWithFallback(followButton, followButtonAlt).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean hasBiography() {
        try {
            WebElement bio = driver.findElement(biographyElement);
            String text = bio.getText();
            return text != null && !text.trim().isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean hasWebsiteLink() {
        try {
            return findElementWithFallback(websiteLink, websiteLinkAlt).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isWebsiteLinkClickable() {
        try {
            WebElement link = findElementWithFallback(websiteLink, websiteLinkAlt);
            String href = link.getAttribute("href");
            return href != null && !href.isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    // ============================================
    // MÉTODOS DE OBTENCIÓN DE DATOS
    // ============================================

    public String getFullName() {
        try {
            return findElementWithFallback(fullNameElement, fullNameAlt).getText().trim();
        } catch (Exception e) {
            return "";
        }
    }

    public String getUsername() {
        try {
            return findElementWithFallback(usernameElement, usernameAlt).getText().trim();
        } catch (Exception e) {
            return "";
        }
    }

    public String getBiography() {
        try {
            return driver.findElement(biographyElement).getText().trim();
        } catch (Exception e) {
            return "";
        }
    }

    public String getBiographyOrPlaceholder() {
        String bio = getBiography();
        return bio.isEmpty() ? "No disponible" : bio;
    }

    public String getLocation() {
        try {
            return findElementWithFallback(locationText, locationAlt, locationListItem).getText().trim();
        } catch (Exception e) {
            return "";
        }
    }

    public String getOrganization() {
        try {
            return findElementWithFallback(organizationText, organizationAlt, organizationListItem).getText().trim();
        } catch (Exception e) {
            return "";
        }
    }

    public String getWebsiteUrl() {
        try {
            WebElement link = findElementWithFallback(websiteLink, websiteLinkAlt);
            return link.getAttribute("href");
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

    // ============================================
    // MÉTODOS DE ACCIÓN
    // ============================================

    public void clickFollowButton() {
        WebElement button = findElementWithFallback(followButton, followButtonAlt);
        wait.until(ExpectedConditions.elementToBeClickable(button));
        button.click();
    }

    public void clickFollowersLink() {
        wait.until(ExpectedConditions.elementToBeClickable(followersLink));
        driver.findElement(followersLink).click();
    }

    public void clickFollowingLink() {
        wait.until(ExpectedConditions.elementToBeClickable(followingLink));
        driver.findElement(followingLink).click();
    }

    // ============================================
    // MÉTODOS AUXILIARES
    // ============================================

    private WebElement findElementWithFallback(By... locators) {
        for (By locator : locators) {
            try {
                WebElement element = driver.findElement(locator);
                if (element.isDisplayed()) {
                    return element;
                }
            } catch (Exception ignored) {
                // Continuar con el siguiente locator
            }
        }
        throw new org.openqa.selenium.NoSuchElementException(
            "No se encontró ningún elemento con los locators proporcionados");
    }
}

// ============================================
// CLASE ADICIONAL: GitHubSearchPage
// ============================================

class GitHubSearchPage {

    private WebDriver driver;
    private WebDriverWait wait;

    private static final String SEARCH_URL = "https://github.com/search?type=users";
    private static final String BASE_URL = "https://github.com";

    // Locators - REAL: Extraídos via Playwright
    private By searchInput = By.cssSelector("input[aria-label='Search GitHub'], input[name='q']");
    private By searchInputAlt = By.cssSelector("input[placeholder*='Search']");
    private By firstUserResult = By.cssSelector("div[data-testid='results-list'] a[href*='/'], a[data-hovercard-type='user']");
    private By userResultLink = By.xpath("(//a[contains(@href,'/') and contains(@class,'Link')])[1]");

    public GitHubSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void navigateToSearchPage() {
        driver.get(BASE_URL);
    }

    public void navigateToUserSearch() {
        driver.get(SEARCH_URL);
    }

    public boolean isSearchInputDisplayed() {
        try {
            return findElementWithFallback(searchInput, searchInputAlt).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isOnUserSearchPage() {
        return driver.getCurrentUrl().contains("search") && 
               driver.getCurrentUrl().contains("type=users");
    }

    public void searchForUser(String username) {
        WebElement input = findElementWithFallback(searchInput, searchInputAlt);
        wait.until(ExpectedConditions.elementToBeClickable(input));
        input.clear();
        input.sendKeys(username);
        input.sendKeys(org.openqa.selenium.Keys.ENTER);
        wait.until(ExpectedConditions.urlContains("q="));
    }

    public void clickOnFirstUserResult() {
        wait.until(ExpectedConditions.presenceOfElementLocated(firstUserResult));
        WebElement result = findElementWithFallback(firstUserResult, userResultLink);
        wait.until(ExpectedConditions.elementToBeClickable(result));
        result.click();
        wait.until(ExpectedConditions.urlContains("github.com/"));
    }

    private WebElement findElementWithFallback(By... locators) {
        for (By locator : locators) {
            try {
                WebElement element = driver.findElement(locator);
                if (element.isDisplayed()) {
                    return element;
                }
            } catch (Exception ignored) {
            }
        }
        throw new org.openqa.selenium.NoSuchElementException(
            "No se encontró ningún elemento con los locators proporcionados");
    }
}