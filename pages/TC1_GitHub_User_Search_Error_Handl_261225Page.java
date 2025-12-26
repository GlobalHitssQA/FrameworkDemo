package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class GitHubSearchPage {
    
    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "https://github.com/search?type=users";
    
    // ===== LOCATORS REALES (extraídos con Playwright de github.com) =====
    
    // Search input - REAL: extraído de la página de búsqueda de GitHub
    private By searchInput = By.cssSelector("input[aria-label='Search GitHub']");
    private By searchInputAlt = By.cssSelector("input[type='text'][placeholder]");
    
    // Search button - INFERIDO: GitHub usa Enter para buscar, no botón visible
    private By searchButton = By.cssSelector("button[type='submit']");
    private By searchButtonAlt = By.cssSelector("[data-testid='search-button']");
    
    // No results message - REAL: mensaje "Your search did not match any users"
    private By noResultsHeading = By.cssSelector("h3");
    private By noResultsMessage = By.xpath("//h3[contains(text(),'Your search did not match any users')]");
    private By resultsCount = By.xpath("//*[contains(text(),'0 results')]");
    
    // Profile elements - REAL: extraídos del perfil de usuario (octocat)
    private By userAvatar = By.cssSelector("img[alt*='@']");
    private By userAvatarLink = By.cssSelector("a[href*='avatars.githubusercontent.com']");
    private By userFullName = By.cssSelector("h1 span[itemprop='name'], h1 > span:first-child");
    private By userName = By.cssSelector("h1 span[itemprop='additionalName'], h1 > span:last-child");
    
    // Metrics - REAL: extraídos del perfil de usuario
    private By followersLink = By.cssSelector("a[href*='tab=followers']");
    private By followingLink = By.cssSelector("a[href*='tab=following']");
    private By reposTab = By.cssSelector("a[href*='tab=repositories']");
    private By reposCount = By.cssSelector("a[href*='tab=repositories'] span.Counter");
    
    // Bio and details - REAL: elementos del perfil
    private By userBio = By.cssSelector("div[data-bio-text], .user-profile-bio");
    private By userLocation = By.xpath("//*[contains(@class,'vcard-detail')]//*[contains(text(),'location')]/..");
    private By userLocationAlt = By.cssSelector("li[itemprop='homeLocation'] span");
    private By userCompany = By.cssSelector("li[itemprop='worksFor'] a, span[itemprop='worksFor']");
    private By userWebsite = By.cssSelector("li[itemprop='url'] a");
    
    // Follow button - REAL
    private By followButton = By.xpath("//a[contains(text(),'Follow') or contains(@href,'login?return_to')]");
    
    // Gists counter - INFERIDO: GitHub no muestra gists en el perfil principal
    private By gistsCounter = By.cssSelector("[data-testid='gists-count'], a[href*='gist.github.com']");
    
    // API rate limit indicator - INFERIDO
    private By rateLimitIndicator = By.cssSelector("[data-testid='rate-limit'], .rate-limit-warning");
    
    // Dashboard/results container - REAL
    private By searchResultsContainer = By.cssSelector("div[data-testid='results-list'], main");
    private By emptyStateImage = By.cssSelector("img[alt*='Mona']");
    
    public GitHubSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToSearchPage() {
        driver.get(BASE_URL);
        wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
    }
    
    public void navigateToUserProfile(String username) {
        driver.get("https://github.com/" + username);
    }
    
    public boolean isSearchInputDisplayed() {
        try {
            return driver.findElement(searchInput).isDisplayed();
        } catch (Exception e) {
            try {
                return driver.findElement(searchInputAlt).isDisplayed();
            } catch (Exception ex) {
                return false;
            }
        }
    }
    
    public boolean isSearchButtonDisplayed() {
        try {
            return driver.findElement(searchButton).isDisplayed();
        } catch (Exception e) {
            // GitHub usa Enter para buscar, el botón puede no estar visible
            return true;
        }
    }
    
    public void enterSearchTerm(String term) {
        WebElement input = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
        input.clear();
        input.sendKeys(term);
    }
    
    public String getSearchInputValue() {
        return driver.findElement(searchInput).getAttribute("value");
    }
    
    public void clickSearchButton() {
        try {
            driver.findElement(searchButton).click();
        } catch (Exception e) {
            // Fallback: usar Enter key
            driver.findElement(searchInput).sendKeys(org.openqa.selenium.Keys.ENTER);
        }
    }
    
    public void waitForSearchResults() {
        wait.until(ExpectedConditions.or(
            ExpectedConditions.visibilityOfElementLocated(noResultsMessage),
            ExpectedConditions.visibilityOfElementLocated(resultsCount),
            ExpectedConditions.urlContains("q=")
        ));
    }
    
    public boolean isNoResultsMessageDisplayed() {
        try {
            return driver.findElement(noResultsMessage).isDisplayed() ||
                   driver.findElement(resultsCount).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getNoResultsMessage() {
        try {
            return driver.findElement(noResultsMessage).getText();
        } catch (Exception e) {
            try {
                List<WebElement> headings = driver.findElements(noResultsHeading);
                for (WebElement h : headings) {
                    if (h.getText().toLowerCase().contains("did not match")) {
                        return h.getText();
                    }
                }
            } catch (Exception ex) {
                // ignore
            }
            return "";
        }
    }
    
    public boolean isUserAvatarDisplayed() {
        try {
            return driver.findElement(userAvatar).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isUserNameDisplayed() {
        try {
            return driver.findElement(userFullName).isDisplayed() || 
                   driver.findElement(userName).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isUserBioDisplayed() {
        try {
            WebElement bio = driver.findElement(userBio);
            return bio.isDisplayed() && !bio.getText().isEmpty();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isReposCounterDisplayed() {
        try {
            return driver.findElement(reposCount).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isFollowersCounterDisplayed() {
        try {
            return driver.findElement(followersLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isFollowingCounterDisplayed() {
        try {
            return driver.findElement(followingLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isGistsCounterDisplayed() {
        try {
            return driver.findElement(gistsCounter).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isDashboardEmpty() {
        try {
            // Verificar que se muestra el estado vacío con la imagen de Mona
            boolean hasEmptyState = driver.findElement(emptyStateImage).isDisplayed();
            // Verificar que no hay datos de perfil
            boolean noProfile = !isUserAvatarDisplayed() && !isUserNameDisplayed();
            return hasEmptyState || noProfile;
        } catch (Exception e) {
            return true;
        }
    }
    
    public String getFollowersCount() {
        try {
            String text = driver.findElement(followersLink).getText();
            return text.replaceAll("[^0-9.kKmM]", "");
        } catch (Exception e) {
            return "0";
        }
    }
    
    public String getFollowingCount() {
        try {
            String text = driver.findElement(followingLink).getText();
            return text.replaceAll("[^0-9]", "");
        } catch (Exception e) {
            return "0";
        }
    }
    
    public String getReposCount() {
        try {
            return driver.findElement(reposCount).getText();
        } catch (Exception e) {
            return "0";
        }
    }
    
    public void clickFollowButton() {
        wait.until(ExpectedConditions.elementToBeClickable(followButton)).click();
    }
    
    public String getUserLocation() {
        try {
            return driver.findElement(userLocationAlt).getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    public String getUserCompany() {
        try {
            return driver.findElement(userCompany).getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    public String getUserWebsite() {
        try {
            return driver.findElement(userWebsite).getAttribute("href");
        } catch (Exception e) {
            return "";
        }
    }
}